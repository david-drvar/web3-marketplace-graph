import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  OwnershipTransferred,
  TransactionApproved,
  TransactionCompleted,
  TransactionCompletedByModerator,
  TransactionCreated,
  TransactionCreatedWithoutModerator,
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

export function createTransactionCompletedByModeratorEvent(
  itemId: BigInt,
  buyerPercentage: i32,
  sellerPercentage: i32
): TransactionCompletedByModerator {
  let transactionCompletedByModeratorEvent =
    changetype<TransactionCompletedByModerator>(newMockEvent())

  transactionCompletedByModeratorEvent.parameters = new Array()

  transactionCompletedByModeratorEvent.parameters.push(
    new ethereum.EventParam("itemId", ethereum.Value.fromUnsignedBigInt(itemId))
  )
  transactionCompletedByModeratorEvent.parameters.push(
    new ethereum.EventParam(
      "buyerPercentage",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(buyerPercentage))
    )
  )
  transactionCompletedByModeratorEvent.parameters.push(
    new ethereum.EventParam(
      "sellerPercentage",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(sellerPercentage))
    )
  )

  return transactionCompletedByModeratorEvent
}

export function createTransactionCreatedEvent(
  itemId: BigInt,
  buyer: Address,
  seller: Address,
  moderator: Address,
  price: BigInt,
  moderatorFee: i32,
  creationTime: BigInt
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
    new ethereum.EventParam("moderator", ethereum.Value.fromAddress(moderator))
  )
  transactionCreatedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  transactionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "moderatorFee",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(moderatorFee))
    )
  )
  transactionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "creationTime",
      ethereum.Value.fromUnsignedBigInt(creationTime)
    )
  )

  return transactionCreatedEvent
}

export function createTransactionCreatedWithoutModeratorEvent(
  itemId: BigInt,
  buyer: Address,
  seller: Address,
  price: BigInt,
  creationTime: BigInt
): TransactionCreatedWithoutModerator {
  let transactionCreatedWithoutModeratorEvent =
    changetype<TransactionCreatedWithoutModerator>(newMockEvent())

  transactionCreatedWithoutModeratorEvent.parameters = new Array()

  transactionCreatedWithoutModeratorEvent.parameters.push(
    new ethereum.EventParam("itemId", ethereum.Value.fromUnsignedBigInt(itemId))
  )
  transactionCreatedWithoutModeratorEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  transactionCreatedWithoutModeratorEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  transactionCreatedWithoutModeratorEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  transactionCreatedWithoutModeratorEvent.parameters.push(
    new ethereum.EventParam(
      "creationTime",
      ethereum.Value.fromUnsignedBigInt(creationTime)
    )
  )

  return transactionCreatedWithoutModeratorEvent
}

export function createTransactionDisputedEvent(
  itemId: BigInt,
  disputer: Address
): TransactionDisputed {
  let transactionDisputedEvent = changetype<TransactionDisputed>(newMockEvent())

  transactionDisputedEvent.parameters = new Array()

  transactionDisputedEvent.parameters.push(
    new ethereum.EventParam("itemId", ethereum.Value.fromUnsignedBigInt(itemId))
  )
  transactionDisputedEvent.parameters.push(
    new ethereum.EventParam("disputer", ethereum.Value.fromAddress(disputer))
  )

  return transactionDisputedEvent
}
