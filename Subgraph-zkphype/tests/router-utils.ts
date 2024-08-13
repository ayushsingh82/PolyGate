import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  InterchainComputationRequested,
  SentResult
} from "../generated/Router/Router"

export function createInterchainComputationRequestedEvent(
  hash: Bytes,
  origin: BigInt,
  dest: BigInt,
  verifier: Address,
  proof: Bytes,
  publicInputs: Array<Bytes>
): InterchainComputationRequested {
  let interchainComputationRequestedEvent = changetype<
    InterchainComputationRequested
  >(newMockEvent())

  interchainComputationRequestedEvent.parameters = new Array()

  interchainComputationRequestedEvent.parameters.push(
    new ethereum.EventParam("hash", ethereum.Value.fromFixedBytes(hash))
  )
  interchainComputationRequestedEvent.parameters.push(
    new ethereum.EventParam("origin", ethereum.Value.fromUnsignedBigInt(origin))
  )
  interchainComputationRequestedEvent.parameters.push(
    new ethereum.EventParam("dest", ethereum.Value.fromUnsignedBigInt(dest))
  )
  interchainComputationRequestedEvent.parameters.push(
    new ethereum.EventParam("verifier", ethereum.Value.fromAddress(verifier))
  )
  interchainComputationRequestedEvent.parameters.push(
    new ethereum.EventParam("proof", ethereum.Value.fromBytes(proof))
  )
  interchainComputationRequestedEvent.parameters.push(
    new ethereum.EventParam(
      "publicInputs",
      ethereum.Value.fromFixedBytesArray(publicInputs)
    )
  )

  return interchainComputationRequestedEvent
}

export function createSentResultEvent(
  receiver: Bytes,
  data: Bytes
): SentResult {
  let sentResultEvent = changetype<SentResult>(newMockEvent())

  sentResultEvent.parameters = new Array()

  sentResultEvent.parameters.push(
    new ethereum.EventParam("receiver", ethereum.Value.fromFixedBytes(receiver))
  )
  sentResultEvent.parameters.push(
    new ethereum.EventParam("data", ethereum.Value.fromBytes(data))
  )

  return sentResultEvent
}
