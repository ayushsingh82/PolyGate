// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "forge-std/console.sol";
import "../src/ISM/ZKPISM.sol";
import "../src/Router.sol";
import "../src/interfaces/IRouter.sol";

contract RouterDeploy is Script {
    function run() external{
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        //Use the below two lines to deploy the router on L1
        Router myRouter = new Router(0xCC737a94FecaeC165AbCf12dED095BB13F037685, 0xF90cB82a76492614D07B82a7658917f3aC811Ac1);
        myRouter.addRemote(80001, 0x028cabf248fed1f5FaD2f3Eb18359dC2952f692d);
        // Comment the above two lines and uncomment the below line to deploy the router onto L2
        //Router myRouter = new Router(0xCC737a94FecaeC165AbCf12dED095BB13F037685, 0xF90cB82a76492614D07B82a7658917f3aC811Ac1);
        console.log("Router address for the given chain is :- ", address(myRouter));
        ZKPISM myISM = new ZKPISM(0x32B34F0D86b275b92e9289d9054Db5Ec32d2CC6C);
        myRouter.setInterchainSecurityModule(address(myISM));
        console.log("ZKISM address for the given chain is :- ", address(myISM));
        vm.stopBroadcast();
    }
}
