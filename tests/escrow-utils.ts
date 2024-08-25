import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  TransactionApproved,
  TransactionCompleted,
  TransactionCreated,
  TransactionDisputed
} from "../generated/Escrow/Escrow"

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createTransactionApprovedEvent(
  itemId: BigInt,
  approver: Address
): TransactionApproved {
  let transactionApprovedEvent = changetype<TransactionApproved>(newMockEvent())

  transactionApprovedEvent.parameters = new Array()

  transactionApprovedEvent.parameters.push(
    new ethereum.EventParam("itemId", ethereum.Value.fromUnsignedBigInt(itemId))
  )
  transactionApprovedEvent.parameters.push(
    new ethereum.EventParam("approver", ethereum.Value.fromAddress(approver))
  )

  return transactionApprovedEvent
}

export function createTransactionCompletedEvent(
  itemId: BigInt
): TransactionCompleted {
  let transactionCompletedEvent = changetype<TransactionCompleted>(
    newMockEvent()
  )

  transactionCompletedEvent.parameters = new Array()

  transactionCompletedEvent.parameters.push(
    new ethereum.EventParam("itemId", ethereum.Value.fromUnsignedBigInt(itemId))
  )

  return transactionCompletedEvent
}

export function createTransactionCreatedEvent(
  itemId: BigInt,
  buyer: Address,
  seller: Address,
  price: BigInt
): TransactionCreated {
  let transactionCreatedEvent = changetype<TransactionCreated>(newMockEvent())

  transactionCreatedEvent.parameters = new Array()

  transactionCreatedEvent.parameters.push(
    new ethereum.EventParam("itemId", ethereum.Value.fromUnsignedBigInt(itemId))
  )
  transactionCreatedEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  transactionCreatedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  transactionCreatedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return transactionCreatedEvent
}

export function createTransactionDisputedEvent(
  itemId: BigInt
): TransactionDisputed {
  let transactionDisputedEvent = changetype<TransactionDisputed>(newMockEvent())

  transactionDisputedEvent.parameters = new Array()

  transactionDisputedEvent.parameters.push(
    new ethereum.EventParam("itemId", ethereum.Value.fromUnsignedBigInt(itemId))
  )

  return transactionDisputedEvent
}
