import {
  OwnershipTransferred as OwnershipTransferredEvent,
  TransactionApproved as TransactionApprovedEvent,
  TransactionCompleted as TransactionCompletedEvent,
  TransactionCreated as TransactionCreatedEvent,
  TransactionDisputed as TransactionDisputedEvent,
} from "../generated/Escrow/Escrow";
import { Transaction } from "../generated/schema";
import { log } from "@graphprotocol/graph-ts";

export function handleTransactionApproved(event: TransactionApprovedEvent): void {
  let entity = Transaction.load(event.params.itemId.toString());
  if (!entity) {
    log.error("Transaction with id {} doesn't exist. Error during handleTransactionApproved.", [event.params.itemId.toString()]);
    return;
  }

  if (event.params.approver == entity.seller) {
    entity.transactionStatus = "SHIPPED";
    entity.sellerApproved = true;
  } else if (event.params.approver == entity.buyer) {
    entity.transactionStatus = "RECEIVED";
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
  entity.price = event.params.price;
  entity.transactionStatus = "FUNDED";
  entity.buyerApproved = false;
  entity.sellerApproved = false;
  entity.moderatorApproved = false;
  entity.disputed = false;
  entity.isCompleted = false;
  entity.creationTime = event.block.timestamp;

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

  entity.save();

  log.info("Transaction with id {} disputed", [entity.id]);
}
