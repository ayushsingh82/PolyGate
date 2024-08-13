// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/TestSender.sol";

contract DeployTest is Script {
    function run() external{
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        TestSender mySender = new TestSender(0xd4d7E3EA10174766Ed7EAd205f6AAbc285530dDE);
        console.log("Test sender address for the given chain is :- ", address(mySender));
        vm.stopBroadcast();
    }
}