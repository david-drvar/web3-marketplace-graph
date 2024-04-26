import {
  ItemBought as ItemBoughtEvent,
  ItemDeleted as ItemDeletedEvent,
  ItemListed as ItemListedEvent
} from "../generated/Marketplace/Marketplace"
import { ItemBought, ItemDeleted, ItemListed } from "../generated/schema"

export function handleItemBought(event: ItemBoughtEvent): void {
  let entity = new ItemBought(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Marketplace_id = event.params.id
  entity.seller = event.params.seller
  entity.buyer = event.params.buyer

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleItemDeleted(event: ItemDeletedEvent): void {
  let entity = new ItemDeleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Marketplace_id = event.params.id
  entity.seller = event.params.seller

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleItemListed(event: ItemListedEvent): void {
  let entity = new ItemListed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.Marketplace_id = event.params.id
  entity.seller = event.params.seller
  entity.title = event.params.title
  entity.description = event.params.description
  entity.price = event.params.price

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
