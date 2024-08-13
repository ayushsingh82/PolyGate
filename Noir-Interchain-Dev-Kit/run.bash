echo "--------------Noir Interchain Dev Kit-------------"
set -o allexport
source .env set
while [ 1 -gt 0 ];
do
echo "Enter the command you want to execute :- "
echo "1.Compile circuit 2.Prove and verify(Make sure you filled up prover.toml)"
echo "3.Deploy verifier contract 4.Run the offchain agent"
read n
if [ $n == 1 ]; then
cd ./circuit
:
nargo check
cd -
elif [ $n == 2 ]; then
cd ./circuit
nargo prove
nargo verify
cd -
elif [ $n == 3 ]; then
forge script script/VerifierDeploy.s.sol:VerifierDeploy --rpc-url ${L2_RPC_URL} --private-key ${PRIVATE_KEY} --legacy --broadcast
elif [ $n == 4 ]; then
anvil --port 8545 --chain-id 31338 --block-time 2 & 
node ./offchain-agent/listener.js
fi
done