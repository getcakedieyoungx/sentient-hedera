# Sentient AI Agent - Setup Guide

This is the autonomous AI worker that processes jobs from the Sentient marketplace.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd agent
npm install
```

### 2. Configure Environment

Copy the example environment file and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your actual values:

```env
# Hedera Testnet Credentials (Agent Account - ED25519)
HEDERA_ACCOUNT_ID=0.0.7288362
HEDERA_PRIVATE_KEY=302e...your_actual_private_key

# OpenAI API Key
OPENAI_API_KEY=sk-...your_actual_openai_key

# Smart Contract Address (Deployed)
CONTRACT_ADDRESS=0x97335842D8Ea232586aFF56D373152d62A49b4A1
```

> **Important:** The agent account (0.0.7288362) should have HBAR for transaction fees. The private key should be the ED25519 key for this account.

### 3. Run the Agent

**Normal Mode** (continuous polling):
```bash
npm start
```

**Development Mode** (with auto-reload):
```bash
npm run dev
```

**Test Mode** (process a specific job):
```bash
npm start <jobId>
# Example: npm start 1
```

## 📋 How It Works

The agent operates in a continuous loop:

1. **Poll Contract** - Every 5 seconds, checks the smart contract for new jobs
2. **Fetch Job Details** - Retrieves job data using `getJob(jobId)`
3. **Process with AI** - Sends task to OpenAI GPT-3.5-turbo
4. **Submit Result** - Calls `submitWork(jobId, result)` to claim bounty
5. **Repeat** - Continues monitoring for new jobs

## 🔧 Architecture

```
┌─────────────────┐
│  Smart Contract │
│  (Hedera)       │
└────────┬────────┘
         │
         │ Poll every 5s
         │
    ┌────▼────┐
    │  Agent  │
    └────┬────┘
         │
         ├──► OpenAI API (Process task)
         │
         └──► Submit result back to chain
```

## 📝 Agent Functions

### Main Functions

- **`main()`** - Initializes agent and starts polling loop
- **`pollForJobs()`** - Checks for new jobs and processes them
- **`processJob(jobId, taskData)`** - Complete job processing workflow
- **`getJobCounter()`** - Gets current job count from contract
- **`getJob(jobId)`** - Fetches job details from contract
- **`processWithAI(taskData)`** - Sends task to OpenAI
- **`submitWork(jobId, result)`** - Submits result to blockchain

### Test Function

- **`testProcessJob(jobId)`** - Manually process a specific job

## 🧪 Testing

### Test with a Specific Job

```bash
# Process job #1
npm start 1
```

This will:
1. Fetch job #1 from the contract
2. Process it with OpenAI
3. Submit the result
4. Exit

### Monitor Logs

The agent provides detailed logging:

```
🤖 Sentient AI Agent v1.0
============================================================
🆔 Agent Wallet: 0.0.7288362
📡 Contract Address: 0x97335842D8Ea232586aFF56D373152d62A49b4A1
🌐 Network: Hedera Testnet
============================================================

✅ Connected to contract. Current job count: 2

👀 Listening for new jobs... (polling every 5 seconds)

[11:20:15] 🔎 Checking for new jobs... (Last: 2)
[11:20:20] 🔔 Found 1 new job(s)

============================================================
[Agent] ⚡ New Job Detected!
[Agent] 🆔 Job ID: 3
[Agent] 📝 Task: "Explain Hedera Hashgraph in simple terms"
============================================================

[Agent] 🧠 Processing with OpenAI...
[Agent] ✅ AI Result: "Hedera Hashgraph is a distributed ledger technology..."
[Agent] 💸 Submitting result to claim bounty...
[Agent] 🏆 Success! Transaction Status: SUCCESS
[Agent] 📝 Transaction ID: 0.0.7288362@1732094425.123456789

[Agent] 🎉 Job 3 completed successfully!
[Agent] 💰 Bounty claimed!
```

## 🔐 Security Notes

- **Never commit `.env`** - It contains your private keys
- **Keep private keys secure** - Anyone with your key can access your account
- **Use testnet only** - This is for hackathon/demo purposes
- **Monitor HBAR balance** - Agent needs HBAR for transaction fees

## 🐛 Troubleshooting

### "Missing HEDERA_ACCOUNT_ID or HEDERA_PRIVATE_KEY"
- Make sure `.env` file exists in the `agent/` directory
- Check that all required variables are set

### "Failed to connect to contract"
- Verify `CONTRACT_ADDRESS` is correct
- Check that the contract is deployed on Hedera Testnet
- Ensure your agent account has HBAR for queries

### "OpenAI Error"
- Verify `OPENAI_API_KEY` is valid
- Check your OpenAI account has credits
- Ensure API key has access to GPT-3.5-turbo

### "Error submitting work"
- Check agent account has enough HBAR for gas
- Verify the job hasn't already been completed
- Check contract address is correct

## 📊 Performance

- **Polling Interval:** 5 seconds
- **OpenAI Model:** GPT-3.5-turbo
- **Max Response:** 500 tokens (~200 words)
- **Gas Limit:** 1,000,000 per transaction

## 🔄 Workflow Example

1. User posts job via frontend: "Summarize Hedera whitepaper"
2. Agent detects new job (ID: 5)
3. Agent calls OpenAI with the task
4. OpenAI returns: "Hedera is a distributed ledger..."
5. Agent submits result to contract
6. Contract pays agent the bounty (e.g., 10 HBAR)
7. Frontend updates to show completed job

## 📚 Dependencies

- `@hashgraph/sdk` - Hedera SDK for blockchain interaction
- `openai` - OpenAI API client
- `dotenv` - Environment variable management
- `tsx` - TypeScript execution (dev)
- `typescript` - TypeScript compiler (dev)

## 🎯 Next Steps

After the agent is running:

1. **Test End-to-End** - Post a job from the frontend and watch the agent process it
2. **Monitor Transactions** - Check [HashScan](https://hashscan.io/testnet) for transaction history
3. **Optimize** - Adjust polling interval, OpenAI parameters, etc.
4. **Scale** - Run multiple agents for parallel processing

## 📄 License

MIT
