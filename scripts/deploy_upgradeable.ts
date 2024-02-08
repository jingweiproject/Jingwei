import { ethers, network, upgrades } from "hardhat";

async function main() {
  // 部署关系合约
  const [owner] = await ethers.getSigners();
  console.log("Deploying Jingwei to ", network.name);
  // 0xF1f5e6e22ff4bd5946BcDAf3dD7B327372547a7F
  // 0x79851BCe31C882fe4D5365b107007DD94EC3A2ad
  const Jingwei = await ethers.getContractFactory("contracts/Jingwei.sol:Jingwei")
  const jingwei = await upgrades.deployProxy(
        Jingwei,
        //Since the logic contract has an initialize() function
        // we need to pass in the arguments to the initialize()
        // function here.
        [owner.address],
     
        // We don't need to expressly specify this
        // as the Hardhat runtime will default to the name 'initialize'
        { initializer: "initialize" }
      );
    await jingwei.deployed();
    console.log("Jingwei deployed to:", jingwei.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});