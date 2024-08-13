// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

interface IRouter{

    function interchainProof(uint32 _dest, address _receipient, bytes calldata _proof, bytes32[] calldata _publicInputs) external payable;

    function addRemote(uint32 _dest, address _router) external;

}
interface IZKBridge {
    function send(
        uint16 dstChainId,
        address dstAddress,
        bytes memory payload
    ) external payable returns (uint64 nonce);

    function estimateFee(uint16 dstChainId) external view returns (uint256 fee);
}

interface IZKBridgeReceiver {
    function zkReceive(
        uint16 srcChainId,
        address srcAddress,
        uint64 nonce,
        bytes calldata payload
    ) external;
}

contract TestSender{

    address router;

    event InterchainResult(bool res);

    constructor(address _router, address _zkBridgeAddress){
        router = _router;
        zkBridgeAddress = _zkBridgeAddress;
        zkBridge = IZKBridge(_zkBridgeAddress);
        owner = msg.sender;
    }

    function sendProof(uint32 _dest, address _receipient, bytes calldata _proof, bytes32[] calldata _publicInputs) external payable{
        bytes memory = abi.encode(_proof, _publicInputs);
        zkBridge.send{value:msg.value}(
            _dest,
            _receipient,
            payload
        );
    }

    function handleInterchainRes(bool res) external{
        emit InterchainResult(res);
    }

    receive() payable external{}

    function destroy() external{
        selfdestruct(payable(msg.sender));
    }

}