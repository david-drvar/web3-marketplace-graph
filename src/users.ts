import {
  OwnershipTransferred as OwnershipTransferredEvent,
  UserDeleted as UserDeletedEvent,
  UserRegistered as UserRegisteredEvent,
  UserUpdated as UserUpdatedEvent,
  ReviewCreated as ReviewCreatedEvent,
} from "../generated/Users/Users";
import { User, Review } from "../generated/schema";
import { log, store } from "@graphprotocol/graph-ts";

export function handleUserDeleted(event: UserDeletedEvent): void {
  let entity = User.load(event.params.userAddress);
  if (!entity) {
    log.error("User with address {} doesn't exist. Error during handleUserDeleted.", [event.params.userAddress.toHexString()]);
    return;
  }

  entity.isActive = false;

  entity.save();

  log.info("User with address {} deleted", [entity.userAddress.toHexString()]);
}

export function handleUserRegistered(event: UserRegisteredEvent): void {
  let entity = User.load(event.params.userAddress);
  if (entity && entity.isActive) {
    log.error("User with address {} already exists. Error during handleUserRegistered.", [event.params.userAddress.toHexString()]);
    return;
  }

  entity = new User(event.params.userAddress);
  entity.userAddress = event.params.userAddress;
  entity.username = event.params.username;
  entity.firstName = event.params.firstName;
  entity.lastName = event.params.lastName;
  entity.country = event.params.country;
  entity.description = event.params.description;
  entity.email = event.params.email;
  entity.avatarHash = event.params.avatarHash;
  entity.isModerator = event.params.isModerator;
  entity.moderatorFee = event.params.moderatorFee;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.isActive = true;

  entity.save();

  log.info("User with address {} saved", [entity.userAddress.toHexString()]);
}

export function handleUserUpdated(event: UserUpdatedEvent): void {
  let entity = User.load(event.params.userAddress);
  if (!entity) {
    log.error("User with address {} doesn't exist. Error during handleUserUpdated.", [event.params.userAddress.toHexString()]);
    return;
  }

  entity.userAddress = event.params.userAddress;
  entity.username = event.params.username;
  entity.firstName = event.params.firstName;
  entity.lastName = event.params.lastName;
  entity.country = event.params.country;
  entity.description = event.params.description;
  entity.email = event.params.email;
  entity.avatarHash = event.params.avatarHash;
  entity.isModerator = event.params.isModerator;
  entity.moderatorFee = event.params.moderatorFee;

  entity.isActive = true;

  entity.save();

  log.info("User with address {} updated", [entity.userAddress.toHexString()]);
}

export function handleReviewCreated(event: ReviewCreatedEvent): void {
  let entity = new Review(event.transaction.hash.concatI32(event.logIndex.toI32()));

  let toUserAddress = event.params.to;
  let toUser = User.load(toUserAddress);

  if (toUser == null) {
    log.error("User with address {} does not exist", [toUserAddress.toHexString()]);
  } else {
    entity.user = toUserAddress;
    log.error("Review linked successfully with user {}", [toUserAddress.toHexString()]);
  }

  entity.from = event.params.from;
  entity.content = event.params.content;
  entity.rating = event.params.rating;
  entity.itemId = event.params.itemId;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();
  if (toUser != null) toUser.save();
}
