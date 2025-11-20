import {
    Client,
    ContractExecuteTransaction,
    ContractFunctionParameters,
    AccountId,
    PrivateKey,
    Hbar,
    ContractId
} from "@hashgraph/sdk";
import dotenv from "dotenv";

dotenv.config();

// Read from .env - check both possible variable names
const OPERATOR_ID = AccountId.fromString(process.env.HEDERA_ACCOUNT_ID!);
const OPERATOR_KEY = PrivateKey.fromString(process.env.HEDERA_PRIVATE_KEY!);
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS || process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

if (!CONTRACT_ADDRESS) {
    console.error('\n❌ Error: CONTRACT_ADDRESS not found in .env file');
    console.error('Please add CONTRACT_ADDRESS to your .env file\n');
    process.exit(1);
}

console.log('\n🚀 Sentient - Manual Job Creation Test\n');
console.log('='.repeat(60));
console.log(`📋 Account: ${OPERATOR_ID}`);
console.log(`📡 Contract: ${CONTRACT_ADDRESS}`);
console.log('='.repeat(60));

async function createJob() {
    try {
        // Initialize client
        const client = Client.forTestnet();
        client.setOperator(OPERATOR_ID, OPERATOR_KEY);

        console.log('\n📝 Creating job: "Explain Hedera Hashgraph consensus in 3 sentences"');
        console.log('💰 Bounty: 5 HBAR\n');

        // Convert EVM address to Hedera ContractId
        // The contract address 0x97335842D8Ea232586aFF56D373152d62A49b4A1 
        // corresponds to Hedera ID 0.0.5126305 on testnet
        const contractId = ContractId.fromEvmAddress(0, 0, CONTRACT_ADDRESS);

        console.log(`🔄 Using Contract ID: ${contractId.toString()}`);

        // Create job transaction
        const tx = new ContractExecuteTransaction()
            .setContractId(contractId)
            .setGas(1000000)
            .setPayableAmount(new Hbar(5)) // 5 HBAR bounty
            .setFunction(
                "createJob",
                new ContractFunctionParameters()
                    .addString("Explain Hedera Hashgraph consensus in 3 sentences")
            );

        console.log('⏳ Submitting transaction to Hedera Testnet...');

        // Execute transaction
        const submitTx = await tx.execute(client);

        console.log(`✅ Transaction submitted: ${submitTx.transactionId}`);
        console.log('⏳ Waiting for consensus...');

        // Get receipt
        const receipt = await submitTx.getReceipt(client);

        console.log(`\n🎉 SUCCESS! Job created on blockchain!`);
        console.log(`📋 Status: ${receipt.status}`);
        console.log(`🔗 Transaction ID: ${submitTx.transactionId}`);
        console.log(`\n👀 Now watch the agent terminal - it should detect and process this job within 5 seconds!`);
        console.log(`🌐 View on HashScan: https://hashscan.io/testnet/transaction/${submitTx.transactionId}\n`);

    } catch (error: any) {
        console.error('\n❌ Error creating job:', error.message);
        console.error('\nTroubleshooting:');
        console.error('1. Check your .env file has valid credentials');
        console.error('2. Ensure your account has enough HBAR (need ~6 HBAR)');
        console.error('3. Verify CONTRACT_ADDRESS is correct\n');
        process.exit(1);
    }
}

createJob();
