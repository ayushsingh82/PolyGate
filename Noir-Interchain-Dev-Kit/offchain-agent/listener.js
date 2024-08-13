const ethers = require("ethers");
const routerABI = require("./abis/router.json");
const zkISMABI = require("./abis/zkISM.json");
const { exec } = require('child_process');
const fs = require('fs');

async function main(){
    const routerAddress = "0xD1Ee888dA073386761bD1fbE96DE1CE385FF117f"
    const zkISMAddress = "0x26BA7ecF2568dB27C66D4E1b22bB16686f22044c"
    const provider = new ethers.AlchemyProvider("goerli", "Alchemy key")
    let signer = new ethers.Wallet("Private key", provider)
    const routerContract = new ethers.Contract(routerAddress, routerABI, signer)
    const zkISMContract = new ethers.Contract(zkISMAddress, zkISMABI, signer)
    console.log("Now I will read logs !!!!")
    routerContract.on("InterchainComputationRequested", async (hash, origin, dest, verifier, proof, inputs, event)=>{
        console.log("Hash is :- ", hash)
        console.log("Proof is :- ", proof.slice(2))
        console.log("Inputs :- ", inputs[0])
        let isCached = await zkISMContract.isCached(hash)
        console.log(isCached)
        if(isCached == 0){
            fs.writeFile(`./offchain-agent/caches/${hash}.txt`, `${proof} [${inputs}]`, (err)=>{
                console.log(err)
            })
            exec(`forge create ./script/CheckProof.sol:CheckProof --constructor-args-path ./offchain-agent/caches/${hash}.txt --rpc-url http://localhost:8545 --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`, (err, out, stderr) => {
                if(err != null){
                    zkISMContract.updateResult(hash, false)
                }else{
                    zkISMContract.updateResult(hash, true)
                }
            })
        }
    })
}

main()