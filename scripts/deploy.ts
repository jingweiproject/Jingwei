import { ethers } from "hardhat";

async function main() {
  // 0x81Ec6E444148b2c562f37FE52b155bC29Fd9b878
  const Jingwei = await ethers.getContractFactory('contracts/Jingwei.sol:Jingwei');
  const jingwei = await Jingwei.deploy();
  console.log("Jingwei deployed to:", jingwei.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});