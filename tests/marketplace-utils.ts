import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  ItemBought,
  ItemDeleted,
  ItemListed,
  ItemUpdated,
  OwnershipTransferred
} from "../generated/Marketplace/Marketplace"

export function createItemBoughtEvent(
  id: BigInt,
  seller: Address,
  buyer: Address
): ItemBought {
  let itemBoughtEvent = changetype<ItemBought>(newMockEvent())

  itemBoughtEvent.parameters = new Array()

  itemBoughtEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  itemBoughtEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  itemBoughtEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )

  return itemBoughtEvent
}

export function createItemDeletedEvent(
  id: BigInt,
  seller: Address
): ItemDeleted {
  let itemDeletedEvent = changetype<ItemDeleted>(newMockEvent())

  itemDeletedEvent.parameters = new Array()

  itemDeletedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  itemDeletedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )

  return itemDeletedEvent
}

export function createItemListedEvent(
  id: BigInt,
  seller: Address,
  title: string,
  description: string,
  price: BigInt,
  currency: string,
  photosIPFSHashes: Array<string>,
  condition: i32,
  category: string,
  subcategory: string,
  country: string,
  isGift: boolean
): ItemListed {
  let itemListedEvent = changetype<ItemListed>(newMockEvent())

  itemListedEvent.parameters = new Array()

  itemListedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam("currency", ethereum.Value.fromString(currency))
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "photosIPFSHashes",
      ethereum.Value.fromStringArray(photosIPFSHashes)
    )
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "condition",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(condition))
    )
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam("category", ethereum.Value.fromString(category))
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam(
      "subcategory",
      ethereum.Value.fromString(subcategory)
    )
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam("country", ethereum.Value.fromString(country))
  )
  itemListedEvent.parameters.push(
    new ethereum.EventParam("isGift", ethereum.Value.fromBoolean(isGift))
  )

  return itemListedEvent
}

export function createItemUpdatedEvent(
  id: BigInt,
  seller: Address,
  title: string,
  description: string,
  price: BigInt,
  currency: string,
  photosIPFSHashes: Array<string>,
  condition: i32,
  category: string,
  subcategory: string,
  country: string,
  isGift: boolean
): ItemUpdated {
  let itemUpdatedEvent = changetype<ItemUpdated>(newMockEvent())

  itemUpdatedEvent.parameters = new Array()

  itemUpdatedEvent.parameters.push(
    new ethereum.EventParam("id", ethereum.Value.fromUnsignedBigInt(id))
  )
  itemUpdatedEvent.parameters.push(
    new ethereum.EventParam("seller", ethereum.Value.fromAddress(seller))
  )
  itemUpdatedEvent.parameters.push(
    new ethereum.EventParam("title", ethereum.Value.fromString(title))
  )
  itemUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  itemUpdatedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  itemUpdatedEvent.parameters.push(
    new ethereum.EventParam("currency", ethereum.Value.fromString(currency))
  )
  itemUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "photosIPFSHashes",
      ethereum.Value.fromStringArray(photosIPFSHashes)
    )
  )
  itemUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "condition",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(condition))
    )
  )
  itemUpdatedEvent.parameters.push(
    new ethereum.EventParam("category", ethereum.Value.fromString(category))
  )
  itemUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "subcategory",
      ethereum.Value.fromString(subcategory)
    )
  )
  itemUpdatedEvent.parameters.push(
    new ethereum.EventParam("country", ethereum.Value.fromString(country))
  )
  itemUpdatedEvent.parameters.push(
    new ethereum.EventParam("isGift", ethereum.Value.fromBoolean(isGift))
  )

  return itemUpdatedEvent
}

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
