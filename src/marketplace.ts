import { Address, BigInt } from "@graphprotocol/graph-ts";
import { ItemBought as ItemBoughtEvent, ItemDeleted as ItemDeletedEvent, ItemListed as ItemListedEvent, ItemUpdated, ItemUpdated as ItemUpdatedEvent } from "../generated/Marketplace/Marketplace";
import { Item } from "../generated/schema";
import { log } from "@graphprotocol/graph-ts";

export function handleItemBought(event: ItemBoughtEvent): void {
  let entity = Item.load(getIdFromEventParams(event.params.id, event.params.seller));
  if (!entity) {
    return;
  }

  entity.buyer = event.params.buyer;
  entity.itemStatus = "Bought";

  entity.save();

  log.info("Item with id {} bought", [entity.id]);
}

export function handleItemDeleted(event: ItemDeletedEvent): void {
  let entity = Item.load(getIdFromEventParams(event.params.id, event.params.seller));
  if (!entity) {
    return;
  }

  entity.itemStatus = "Deleted";

  entity.save();

  log.info("Item with id {} deleted", [entity.id]);
}

export function handleItemListed(event: ItemListedEvent): void {
  // let entity = new Item(event.transaction.hash.concatI32(event.logIndex.toI32()));
  // entity.id = event.params.id;

  let entity = Item.load(getIdFromEventParams(event.params.id, event.params.seller));
  if (!entity) {
    log.error("Item with id {} already exists.", [getIdFromEventParams(event.params.id, event.params.seller)]);
    return;
  }

  entity = new Item(getIdFromEventParams(event.params.id, event.params.seller));

  entity.buyer = Address.fromString("0x000000000000000000000000000000000000dEaD"); // dead address, nobody bought it yet
  entity.seller = entity.seller = event.params.seller;
  entity.title = event.params.title;
  entity.description = event.params.description;
  entity.price = event.params.price;
  entity.photosIPFSHashes = event.params.photosIPFSHashes;
  entity.itemStatus = "Listed";

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  log.info("Item with id {} listed", [entity.id]);
}

function getIdFromEventParams(id: BigInt, sellerAddress: Address): string {
  return id.toString(); //+ sellerAddress.toHexString();
}

export function handleItemUpdated(event: ItemUpdatedEvent): void {
  let entity = Item.load(getIdFromEventParams(event.params.id, event.params.seller));
  if (!entity) {
    log.error("Item with id {} doesn't exist. Error during handleItemUpdated.", [getIdFromEventParams(event.params.id, event.params.seller)]);
    return;
  }

  entity.title = event.params.title;
  entity.description = event.params.description;
  entity.price = event.params.price;
  entity.photosIPFSHashes = event.params.photosIPFSHashes;

  // entity.blockNumber = event.block.number;
  // entity.blockTimestamp = event.block.timestamp;
  // entity.transactionHash = event.transaction.hash;

  entity.save();

  log.info("Item with id {} updated", [entity.id]);
}
