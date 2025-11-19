import { ethers } from "ethers";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    // Connect to Hedera Testnet
    const provider = new ethers.JsonRpcProvider("https://testnet.hashio.io/api");
    const wallet = new ethers.Wallet("0x8a17aba23d6439581afab11df80da658eec8bfb1fad8d5daec210417c28110eb", provider);

    console.log("Deploying contract with account:", wallet.address);

    // Load contract ABI and bytecode
    const artifactPath = path.join(__dirname, "../artifacts/contracts/SentientEscrow.sol/SentientEscrow.json");
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

    // Deploy contract
    const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
    const contract = await factory.deploy();

    await contract.waitForDeployment();

    const address = await contract.getAddress();
    console.log("✅ SentientEscrow deployed at:", address);
    console.log("\n📋 Save this address to your .env files!");
}

main().catch(console.error);
