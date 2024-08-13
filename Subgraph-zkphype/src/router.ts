import { BigInt } from "@graphprotocol/graph-ts"
import {
  InterchainComputationRequested as InterchainComputationRequestedEvent,
  SentResult as SentResultEvent
} from "../generated/Router/Router"
import { InterchainComputationRequested, SentResult, Counter, ChainList } from "../generated/schema"

export function handleInterchainComputationRequested(
  event: InterchainComputationRequestedEvent
): void {
  let entity = new InterchainComputationRequested(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.hash = event.params.hash
  entity.origin = event.params.origin
  entity.dest = event.params.dest
  entity.verifier = event.params.verifier
  entity.proof = event.params.proof
  entity.publicInputs = event.params.publicInputs

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  let counter = Counter.load("root")
  if(counter == null){
    counter = new Counter("root")
    counter.dispatchCounter = BigInt.fromI32(0)
  }else{
    counter.dispatchCounter = counter.dispatchCounter.plus(BigInt.fromI32(1))
  }
  counter.save()

  let remote = ChainList.load(event.params.dest.toString())
  if(remote == null){
    remote = new ChainList(event.params.dest.toString())
    remote.dispatchCounter = BigInt.fromI32(0)
  }else{
    remote.dispatchCounter = remote.dispatchCounter.plus(BigInt.fromI32(1))
  }
  remote.save()
}

export function handleSentResult(event: SentResultEvent): void {
  let entity = new SentResult(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.receiver = event.params.receiver
  entity.data = event.params.data

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
