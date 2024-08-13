// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "forge-std/console.sol";
import "../src/L2Verifier.sol";

contract L2VerifierTest is Test {
    
    L2Verifier myVerifier;
    
    function setUp() public {
        myVerifier = new L2Verifier();
    }

    function testVerify() public {
        string memory proof = vm.readLine("./circuit/proofs/circuit.proof");
        bytes memory proofBytes = vm.parseBytes(proof);
        console.log("Length of proof is :- ",proofBytes.length);
        bytes32[] memory publicInputs = new bytes32[](1);
        publicInputs[0] = bytes32(0x0000000000000000000000000000000000000000000000000000000000000001);
        assert(myVerifier.verifyInputs(proofBytes, publicInputs));
    }
}
