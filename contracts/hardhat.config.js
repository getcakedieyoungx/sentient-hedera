require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.19",
  networks: {
    hedera: {
      url: "https://testnet.hashio.io/api",
      accounts: [process.env.HEDERA_PRIVATE_KEY],
      chainId: 296
    }
  }
};
