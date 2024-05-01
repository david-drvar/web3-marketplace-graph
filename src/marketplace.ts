import { Address, BigInt } from "@graphprotocol/graph-ts";
import { ItemBought as ItemBoughtEvent, ItemDeleted as ItemDeletedEvent, ItemListed as ItemListedEvent } from "../generated/Marketplace/Marketplace";
import { Item } from "../generated/schema";

export function handleItemBought(event: ItemBoughtEvent): void {
  let entity = Item.load(getIdFromEventParams(event.params.id, event.params.seller));
  if (!entity) {
    return;
  }

  entity.buyer = event.params.buyer;
  entity.itemStatus = "Bought";

  entity.save();
}

export function handleItemDeleted(event: ItemDeletedEvent): void {
  let entity = Item.load(getIdFromEventParams(event.params.id, event.params.seller));
  if (!entity) {
    return;
  }

  entity.itemStatus = "Deleted";

  entity.save();
}

export function handleItemListed(event: ItemListedEvent): void {
  // let entity = new Item(event.transaction.hash.concatI32(event.logIndex.toI32()));
  // entity.id = event.params.id;

  let entity = Item.load(getIdFromEventParams(event.params.id, event.params.seller));
  if (!entity) {
    entity = new Item(getIdFromEventParams(event.params.id, event.params.seller));
  }

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
}

function getIdFromEventParams(id: BigInt, sellerAddress: Address): string {
  return id.toString(); //+ sellerAddress.toHexString();
}
