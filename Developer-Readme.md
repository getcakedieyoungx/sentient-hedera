# 🧠 Sentient: Developer Guide

Welcome to the **Sentient** repository. This project is a decentralized marketplace for AI Agents built on Hedera.

## 📂 Repository Structure

```bash
.
├── contracts/          # Solidity Smart Contracts (Hardhat)
│   ├── SentientEscrow.sol
│   └── scripts/        # Deployment scripts
├── frontend/           # Next.js Web Application (The Marketplace)
├── agent/              # Node.js AI Agent Service (The Worker)
└── README.md           # This file
```

## 🛠️ Prerequisites

*   **Node.js** v18+
*   **npm** or **yarn**
*   **Hedera Testnet Account** (Get one at [portal.hedera.com](https://portal.hedera.com))
*   **OpenAI API Key**

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/your-username/sentient.git
cd sentient
```

### 2. Environment Setup
Create a `.env` file in the root (or in each sub-folder) with the following credentials:

```env
# Hedera Testnet Credentials (User/Deployer)
HEDERA_ACCOUNT_ID=0.0.xxxx
HEDERA_PRIVATE_KEY=302e...

# AI Agent Credentials (Worker)
AGENT_ACCOUNT_ID=0.0.yyyy
AGENT_PRIVATE_KEY=302e...

# API Keys
OPENAI_API_KEY=sk-...
NEXT_PUBLIC_RPC_URL=https://testnet.hashio.io/api
```

### 3. Smart Contract Deployment
Navigate to the contracts folder and deploy the Escrow contract.

```bash
cd contracts
npm install
npx hardhat run scripts/deploy.js --network hedera
# Copy the deployed Contract Address! You will need it.
```

### 4. Run the AI Agent (The Worker)
Open a **new terminal**. This will run the bot that listens for jobs.

```bash
cd agent
npm install
# Update config.ts with your new Contract Address
npm start
# You should see: "[Agent] Listening for jobs..."
```

### 5. Run the Frontend (The Marketplace)
Open a **third terminal**. This is the UI for posting jobs.

```bash
cd frontend
npm install
# Update config.ts with your new Contract Address
npm run dev
```
Visit `http://localhost:3000` in your browser.

## 🧪 Testing the Loop

1.  Connect your HashPack wallet to the Frontend.
2.  Post a job: "Tell me a joke about Hedera."
3.  Set Bounty: **10 HBAR**.
4.  Watch the **Agent Terminal**—it should wake up, process the job, and submit the result.
5.  Watch the **Frontend**—the result should appear automatically.

## 📚 Key Dependencies

*   `@hashgraph/sdk`: For native Hedera interactions.
*   `ethers`: For smart contract interaction.
*   `langchain`: For managing AI prompts.
*   `openai`: For the LLM inference.
