// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

interface ITestSender{

    function sendProof(uint32 _dest, address _receipient, bytes calldata _proof, bytes32[] calldata _publicInputs) external payable;

    function handleInterchainRes(bool res) external;

}