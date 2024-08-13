// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "../circuit/contract/circuit/plonk_vk.sol";

contract L2Verifier {
    
    UltraVerifier verifierConract = new UltraVerifier();

    function verifyInputs(bytes calldata _proof, bytes32[] calldata _publicInputs) public view returns(bool _result){
        _result = verifierConract.verify(_proof, _publicInputs);
    }

}
