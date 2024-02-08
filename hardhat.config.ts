import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import "dotenv/config";


const RPC_URL = process.env.RPC_URL_HTTP
const PRIVATE_KEY = process.env.WALLET_PRIVATE_KEY;

const SCAN_KEY = process.env.SCAN_API_KEY;

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  defaultNetwork: "hardhat",
  networks: {
   bsc: {
     url: RPC_URL,
     accounts: PRIVATE_KEY ? [PRIVATE_KEY] : [],
     chainId: 56,
   },
 },
 etherscan: {
   apiKey: SCAN_KEY,
 },
};

export default config;
