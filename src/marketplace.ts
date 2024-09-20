import { Address } from "@graphprotocol/graph-ts";
import { ItemBought as ItemBoughtEvent, ItemDeleted as ItemDeletedEvent, ItemListed as ItemListedEvent, ItemUpdated as ItemUpdatedEvent } from "../generated/Marketplace/Marketplace";
import { Item } from "../generated/schema";
import { log } from "@graphprotocol/graph-ts";

export function handleItemBought(event: ItemBoughtEvent): void {
  let entity = Item.load(event.params.id.toString());
  if (!entity) {
    log.error("Item with id {} doesn't exist. Error during handleItemBought.", [event.params.id.toString()]);
    return;
  }

  entity.buyer = event.params.buyer;
  entity.itemStatus = "Bought";

  entity.save();

  log.info("Item with id {} bought", [entity.id]);
}

export function handleItemDeleted(event: ItemDeletedEvent): void {
  let entity = Item.load(event.params.id.toString());
  if (!entity) {
    log.error("Item with id {} doesn't exist. Error during handleItemDeleted.", [event.params.id.toString()]);
    return;
  }

  entity.itemStatus = "Deleted";

  entity.save();

  log.info("Item with id {} deleted", [entity.id]);
}

export function handleItemListed(event: ItemListedEvent): void {
  let entity = Item.load(event.params.id.toString());
  if (entity) {
    log.error("Item with id {} already exists.", [event.params.id.toString()]);
    return;
  }

  entity = new Item(event.params.id.toString());

  entity.buyer = Address.fromString("0x000000000000000000000000000000000000dEaD"); // dead address, nobody bought it yet
  entity.seller = entity.seller = event.params.seller;
  entity.title = event.params.title;
  entity.description = event.params.description;
  entity.price = event.params.price;
  entity.photosIPFSHashes = event.params.photosIPFSHashes;
  entity.itemStatus = "Listed";

  if (event.params.condition == 0) entity.condition = "NEW";
  if (event.params.condition == 1) entity.condition = "LIKE_NEW";
  if (event.params.condition == 2) entity.condition = "EXCELLENT";
  if (event.params.condition == 3) entity.condition = "GOOD";
  if (event.params.condition == 4) entity.condition = "DAMAGED";

  entity.category = event.params.category;
  entity.subcategory = event.params.subcategory;
  entity.country = event.params.country;
  entity.isGift = event.params.isGift;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  entity.save();

  log.info("Item with id {} listed", [entity.id]);
}

export function handleItemUpdated(event: ItemUpdatedEvent): void {
  let entity = Item.load(event.params.id.toString());
  if (!entity) {
    log.error("Item with id {} doesn't exist. Error during handleItemUpdated.", [event.params.id.toString()]);
    return;
  }

  entity.title = event.params.title;
  entity.description = event.params.description;
  entity.price = event.params.price;
  entity.photosIPFSHashes = event.params.photosIPFSHashes;

  if (event.params.condition == 0) entity.condition = "NEW";
  if (event.params.condition == 1) entity.condition = "LIKE_NEW";
  if (event.params.condition == 2) entity.condition = "EXCELLENT";
  if (event.params.condition == 3) entity.condition = "GOOD";
  if (event.params.condition == 4) entity.condition = "DAMAGED";

  entity.category = event.params.category;
  entity.subcategory = event.params.subcategory;
  entity.country = event.params.country;
  entity.isGift = event.params.isGift;

  entity.save();

  log.info("Item with id {} updated", [entity.id]);
}
