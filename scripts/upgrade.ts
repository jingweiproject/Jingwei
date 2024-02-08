import { ethers, upgrades } from "hardhat";

async function main() {
    // TODO Check this address is right before deploying.
    const deployedProxyAddress = "0xF1f5e6e22ff4bd5946BcDAf3dD7B327372547a7F";
  
    const Jingwei = await ethers.getContractFactory(
      "contracts/Jingwei.sol:Jingwei"
    );
    console.log("Upgrading Jingwei...");
  
    await upgrades.upgradeProxy(deployedProxyAddress, Jingwei);
    console.log("Jingwei upgraded");
  }

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });