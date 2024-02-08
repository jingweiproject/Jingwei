import { BigInt } from "@graphprotocol/graph-ts"
import {
  Jingwei,
  JftCreated,
  NftLocked,
  NftReleased
} from "../generated/Jingwei/Jingwei"
import { NonFungibleToken } from "../generated/schema"
import { ONE_BI, ZERO_BI, getPlatform, getWareroom } from "./helpers"
import { JingweiFungibleToken } from "../generated/JingweiFungibleToken/JingweiFungibleToken";

export function handleJftCreated(event: JftCreated): void {
  let platform = getPlatform();
  platform.allJfts = platform.allJfts.plus(ONE_BI);
  platform.save();

  let room = getWareroom(event.params.token);
  room.nft = event.params.token;
  room.jft = event.params.jft;
  room.lockeNft = ZERO_BI;
  room.time = event.block.timestamp;
  room.save();
}

export function handleNftLocked(event: NftLocked): void {
  let nft = new NonFungibleToken(event.params.token.toHexString().concat(':').concat(event.params.tokenId.toString()));
  nft.address = event.params.token;
  nft.tokenId = event.params.tokenId;
  nft.time = event.block.timestamp;
  nft.save();

  let room = getWareroom(event.params.token);
  room.lockeNft = room.lockeNft.plus(ONE_BI);
  let arr = room.nftList;
  arr.push(nft.id);
  room.nftList = arr;
  room.save();
}

export function handleNftReleased(event: NftReleased): void {
  let room = getWareroom(event.params.token);
  room.lockeNft = room.lockeNft.minus(ONE_BI);
  let arr = room.nftList;
  for (let i = ZERO_BI; i.lt(BigInt.fromI64(arr.length)); i = i.plus(ONE_BI)) {
    
  }
  for (let i = 0; i<arr.length; i++) {
    if (arr[i] === event.params.token.toHexString().concat(':').concat(event.params.tokenId.toString())) {
      arr[i] = arr[arr.length - 1];
      arr.pop();
      room.nftList = arr;
      break;
    }
  }
  room.save();
}
