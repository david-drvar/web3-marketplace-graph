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
  moderator: Address,
  price: BigInt,
  transactionStatus: i32,
  buyerApproved: boolean,
  sellerApproved: boolean,
  moderatorApproved: boolean,
  disputed: boolean,
  disputedBy: Address,
  isCompleted: boolean,
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
      "transactionStatus",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(transactionStatus))
    )
  )
  transactionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "buyerApproved",
      ethereum.Value.fromBoolean(buyerApproved)
    )
  )
  transactionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "sellerApproved",
      ethereum.Value.fromBoolean(sellerApproved)
    )
  )
  transactionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "moderatorApproved",
      ethereum.Value.fromBoolean(moderatorApproved)
    )
  )
  transactionCreatedEvent.parameters.push(
    new ethereum.EventParam("disputed", ethereum.Value.fromBoolean(disputed))
  )
  transactionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "disputedBy",
      ethereum.Value.fromAddress(disputedBy)
    )
  )
  transactionCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "isCompleted",
      ethereum.Value.fromBoolean(isCompleted)
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
