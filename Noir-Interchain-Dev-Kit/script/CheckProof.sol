// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;
import "../src/L2Verifier.sol";

contract CheckProof{

        constructor(bytes memory _proof, bytes32[] memory _publicInputs){
            L2Verifier myVerifier = new L2Verifier();
            require(myVerifier.verifyInputs(_proof, _publicInputs), "Failed !!!");
        }
}