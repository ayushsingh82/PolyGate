// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/Router.sol";
import "../src/interfaces/IRouter.sol";
import "../src/TestSender.sol";

contract InterchainProofContract is Script{

    function run() external{
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        address routerAddress = 0xD1Ee888dA073386761bD1fbE96DE1CE385FF117f;
        string memory proof = vm.readLine("circuit.proof");
        bytes memory proofBytes = vm.parseBytes(proof);
        bytes32[] memory publicInputs = new bytes32[](1);
        publicInputs[0] = bytes32(0x0000000000000000000000000000000000000000000000000000000000000005);
        TestSender mySender = new TestSender(routerAddress);
        mySender.sendProof{value : 0.15 ether}(80001, 0xB7945635453eb1381B39636d3D8aff60215cb6F4, proofBytes, publicInputs);
        vm.stopBroadcast();
    }

}