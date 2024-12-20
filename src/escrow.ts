import {
  OwnershipTransferred as OwnershipTransferredEvent,
  TransactionApproved as TransactionApprovedEvent,
  TransactionCompleted as TransactionCompletedEvent,
  TransactionCompletedByModerator as TransactionCompletedByModeratorEvent,
  TransactionCreated as TransactionCreatedEvent,
  TransactionDisputed as TransactionDisputedEvent,
  TransactionCreatedWithoutModerator as TransactionCreatedWithoutModeratorEvent,
} from "../generated/Escrow/Escrow";
import { Transaction } from "../generated/schema";
import { Bytes, log } from "@graphprotocol/graph-ts";

export function handleTransactionApproved(event: TransactionApprovedEvent): void {
  let entity = Transaction.load(event.params.itemId.toString());
  if (!entity) {
    log.error("Transaction with id {} doesn't exist. Error during handleTransactionApproved.", [event.params.itemId.toString()]);
    return;
  }

  if (event.params.approver == entity.seller) {
    entity.sellerApproved = true;
  } else if (event.params.approver == entity.buyer) {
    entity.buyerApproved = true;
  }

  entity.save();

  log.info("Transaction with id {} approved", [entity.id]);
}

export function handleTransactionCompleted(event: TransactionCompletedEvent): void {
  let entity = Transaction.load(event.params.itemId.toString());
  if (!entity) {
    log.error("Transaction with id {} doesn't exist. Error during handleTransactionCompleted.", [event.params.itemId.toString()]);
    return;
  }
  entity.isCompleted = true;

  entity.save();

  log.info("Transaction with id {} completed", [entity.id]);
}

export function handleTransactionCompletedByModerator(event: TransactionCompletedByModeratorEvent): void {
  let entity = Transaction.load(event.params.itemId.toString());
  if (!entity) {
    log.error("Transaction with id {} doesn't exist. Error during handleTransactionCompletedByModerator.", [event.params.itemId.toString()]);
    return;
  }
  entity.isCompleted = true;
  entity.buyerPercentage = event.params.buyerPercentage;
  entity.sellerPercentage = event.params.sellerPercentage;

  entity.save();

  log.info("Transaction with id {} completed by moderator", [entity.id]);
}

export function handleTransactionCreated(event: TransactionCreatedEvent): void {
  let entity = Transaction.load(event.params.itemId.toString());
  if (entity) {
    log.error("Transaction with id {} already exists.", [event.params.itemId.toString()]);
    return;
  }

  entity = new Transaction(event.params.itemId.toString());
  entity.itemId = event.params.itemId;
  entity.buyer = event.params.buyer;
  entity.seller = event.params.seller;
  entity.moderator = event.params.moderator;
  entity.price = event.params.price;
  entity.currency = event.params.currency;
  entity.moderatorFee = event.params.moderatorFee;
  entity.creationTime = event.params.creationTime;

  entity.buyerApproved = false;
  entity.sellerApproved = false;
  entity.disputed = false;
  entity.disputedByBuyer = false;
  entity.disputedBySeller = false;
  entity.isCompleted = false;
  entity.buyerPercentage = 0;
  entity.sellerPercentage = 0;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  log.info("Transaction with id {} listed", [entity.id]);
}

export function handleTransactionDisputed(event: TransactionDisputedEvent): void {
  let entity = Transaction.load(event.params.itemId.toString());
  if (!entity) {
    log.error("Transaction with id {} doesn't exist. Error during handleTransactionDisputed.", [event.params.itemId.toString()]);
    return;
  }

  entity.disputed = true;

  if (event.params.disputer == entity.seller) {
    entity.disputedBySeller = true;
  } else if (event.params.disputer == entity.buyer) {
    entity.disputedByBuyer = true;
  }

  entity.save();

  log.info("Transaction with id {} disputed", [entity.id]);
}

export function handleTransactionCreatedWithoutModerator(event: TransactionCreatedWithoutModeratorEvent): void {
  let entity = Transaction.load(event.params.itemId.toString());
  if (entity) {
    log.error("Transaction with id {} already exists.", [event.params.itemId.toString()]);
    return;
  }

  entity = new Transaction(event.params.itemId.toString());
  entity.itemId = event.params.itemId;
  entity.buyer = event.params.buyer;
  entity.seller = event.params.seller;
  entity.moderator = Bytes.empty();
  entity.price = event.params.price; // should be 0 from the contract
  entity.currency = event.params.currency;
  entity.moderatorFee = 0;
  entity.creationTime = event.params.creationTime;

  entity.buyerApproved = true;
  entity.sellerApproved = true;
  entity.disputed = false;
  entity.disputedByBuyer = false;
  entity.disputedBySeller = false;
  entity.isCompleted = true;
  entity.buyerPercentage = 0;
  entity.sellerPercentage = 0;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  log.info("Transaction with id {} listed", [entity.id]);
}
