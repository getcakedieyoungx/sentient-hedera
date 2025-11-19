import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import "@nomicfoundation/hardhat-ethers";

const config: HardhatUserConfig = {
    solidity: {
        profiles: {
            default: {
                version: "0.8.19",
            },
        },
    },
    networks: {
        testnet: {
            type: "http",
            url: "https://testnet.hashio.io/api",
            accounts: ["0x8a17aba23d6439581afab11df80da658eec8bfb1fad8d5daec210417c28110eb"],
        },
    },
};

export default config;
