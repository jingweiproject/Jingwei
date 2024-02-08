import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  JftCreated,
  NftLocked,
  NftReleased
} from "../generated/Jingwei/Jingwei"

export function createJftCreatedEvent(
  token: Address,
  jft: Address,
  jftLength: BigInt
): JftCreated {
  let jftCreatedEvent = changetype<JftCreated>(newMockEvent())

  jftCreatedEvent.parameters = new Array()

  jftCreatedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  jftCreatedEvent.parameters.push(
    new ethereum.EventParam("jft", ethereum.Value.fromAddress(jft))
  )
  jftCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "jftLength",
      ethereum.Value.fromUnsignedBigInt(jftLength)
    )
  )

  return jftCreatedEvent
}

export function createNftLockedEvent(
  token: Address,
  tokenId: BigInt
): NftLocked {
  let nftLockedEvent = changetype<NftLocked>(newMockEvent())

  nftLockedEvent.parameters = new Array()

  nftLockedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  nftLockedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return nftLockedEvent
}

export function createNftReleasedEvent(
  token: Address,
  tokenId: BigInt
): NftReleased {
  let nftReleasedEvent = changetype<NftReleased>(newMockEvent())

  nftReleasedEvent.parameters = new Array()

  nftReleasedEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  nftReleasedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return nftReleasedEvent
}
