import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  UserDeleted,
  UserRegistered,
  UserUpdated
} from "../generated/Users/Users"

export function createUserDeletedEvent(
  userAddress: Address,
  username: string
): UserDeleted {
  let userDeletedEvent = changetype<UserDeleted>(newMockEvent())

  userDeletedEvent.parameters = new Array()

  userDeletedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  userDeletedEvent.parameters.push(
    new ethereum.EventParam("username", ethereum.Value.fromString(username))
  )

  return userDeletedEvent
}

export function createUserRegisteredEvent(
  userAddress: Address,
  username: string,
  firstName: string,
  lastName: string,
  country: string,
  description: string,
  email: string,
  avatarHash: string,
  isModerator: boolean
): UserRegistered {
  let userRegisteredEvent = changetype<UserRegistered>(newMockEvent())

  userRegisteredEvent.parameters = new Array()

  userRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  userRegisteredEvent.parameters.push(
    new ethereum.EventParam("username", ethereum.Value.fromString(username))
  )
  userRegisteredEvent.parameters.push(
    new ethereum.EventParam("firstName", ethereum.Value.fromString(firstName))
  )
  userRegisteredEvent.parameters.push(
    new ethereum.EventParam("lastName", ethereum.Value.fromString(lastName))
  )
  userRegisteredEvent.parameters.push(
    new ethereum.EventParam("country", ethereum.Value.fromString(country))
  )
  userRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  userRegisteredEvent.parameters.push(
    new ethereum.EventParam("email", ethereum.Value.fromString(email))
  )
  userRegisteredEvent.parameters.push(
    new ethereum.EventParam("avatarHash", ethereum.Value.fromString(avatarHash))
  )
  userRegisteredEvent.parameters.push(
    new ethereum.EventParam(
      "isModerator",
      ethereum.Value.fromBoolean(isModerator)
    )
  )

  return userRegisteredEvent
}

export function createUserUpdatedEvent(
  userAddress: Address,
  username: string,
  firstName: string,
  lastName: string,
  country: string,
  description: string,
  email: string,
  avatarHash: string,
  isModerator: boolean
): UserUpdated {
  let userUpdatedEvent = changetype<UserUpdated>(newMockEvent())

  userUpdatedEvent.parameters = new Array()

  userUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "userAddress",
      ethereum.Value.fromAddress(userAddress)
    )
  )
  userUpdatedEvent.parameters.push(
    new ethereum.EventParam("username", ethereum.Value.fromString(username))
  )
  userUpdatedEvent.parameters.push(
    new ethereum.EventParam("firstName", ethereum.Value.fromString(firstName))
  )
  userUpdatedEvent.parameters.push(
    new ethereum.EventParam("lastName", ethereum.Value.fromString(lastName))
  )
  userUpdatedEvent.parameters.push(
    new ethereum.EventParam("country", ethereum.Value.fromString(country))
  )
  userUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  userUpdatedEvent.parameters.push(
    new ethereum.EventParam("email", ethereum.Value.fromString(email))
  )
  userUpdatedEvent.parameters.push(
    new ethereum.EventParam("avatarHash", ethereum.Value.fromString(avatarHash))
  )
  userUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "isModerator",
      ethereum.Value.fromBoolean(isModerator)
    )
  )

  return userUpdatedEvent
}