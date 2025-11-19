const hre = require("hardhat");

async function main() {
    const SentientEscrow = await hre.ethers.getContractFactory("SentientEscrow");
    const escrow = await SentientEscrow.deploy();

    await escrow.waitForDeployment();

    console.log("SentientEscrow deployed to:", escrow.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
