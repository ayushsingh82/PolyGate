import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, BigInt, Address } from "@graphprotocol/graph-ts"
import { InterchainComputationRequested } from "../generated/schema"
import { InterchainComputationRequested as InterchainComputationRequestedEvent } from "../generated/Router/Router"
import { handleInterchainComputationRequested } from "../src/router"
import { createInterchainComputationRequestedEvent } from "./router-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let hash = Bytes.fromI32(1234567890)
    let origin = BigInt.fromI32(234)
    let dest = BigInt.fromI32(234)
    let verifier = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let proof = Bytes.fromI32(1234567890)
    let publicInputs = [Bytes.fromI32(1234567890)]
    let newInterchainComputationRequestedEvent = createInterchainComputationRequestedEvent(
      hash,
      origin,
      dest,
      verifier,
      proof,
      publicInputs
    )
    handleInterchainComputationRequested(newInterchainComputationRequestedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("InterchainComputationRequested created and stored", () => {
    assert.entityCount("InterchainComputationRequested", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "InterchainComputationRequested",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "hash",
      "1234567890"
    )
    assert.fieldEquals(
      "InterchainComputationRequested",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "origin",
      "234"
    )
    assert.fieldEquals(
      "InterchainComputationRequested",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "dest",
      "234"
    )
    assert.fieldEquals(
      "InterchainComputationRequested",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "verifier",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "InterchainComputationRequested",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "proof",
      "1234567890"
    )
    assert.fieldEquals(
      "InterchainComputationRequested",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "publicInputs",
      "[1234567890]"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
