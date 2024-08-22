import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { UserDeleted } from "../generated/schema"
import { UserDeleted as UserDeletedEvent } from "../generated/Users/Users"
import { handleUserDeleted } from "../src/users"
import { createUserDeletedEvent } from "./users-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let userAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let username = "Example string value"
    let newUserDeletedEvent = createUserDeletedEvent(userAddress, username)
    handleUserDeleted(newUserDeletedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("UserDeleted created and stored", () => {
    assert.entityCount("UserDeleted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "UserDeleted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "userAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "UserDeleted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "username",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
