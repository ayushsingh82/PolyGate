// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/L2Verifier.sol";

contract VerifierDeploy is Script{

    function run() external{
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        L2Verifier myVerifier = new L2Verifier();
        console.log("Address of the L2 Verifier contract is :- ", address(myVerifier));
        vm.stopBroadcast();
    }

}