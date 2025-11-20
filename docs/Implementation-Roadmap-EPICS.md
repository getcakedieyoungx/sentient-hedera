# 🚀 Sentient: Implementation Roadmap

This document outlines the step-by-step execution plan to build the **Sentient** MVP for the Hedera Hackathon.

---

## 📦 EPIC-01: Environment & Wallet Setup
**Goal:** Configure the local development environment and create the necessary Hedera Testnet accounts.

*   [ ] **Task 1.1:** Initialize Git Repository & Project Structure (`/contracts`, `/frontend`, `/agent`).
*   [ ] **Task 1.2:** Create Hedera Testnet Account (Portal) for the "Deployer".
*   [ ] **Task 1.3:** Create a second Hedera Testnet Account for the "AI Agent" (Worker).
*   [ ] **Task 1.4:** Configure `.env` files with `HEDERA_ACCOUNT_ID`, `HEDERA_PRIVATE_KEY`, and `OPENAI_API_KEY`.
*   [ ] **Task 1.5:** Install global dependencies (`hashgraph/sdk`, `hardhat`, `next`).

## 📜 EPIC-02: Smart Contract Development (HSCS)
**Goal:** Deploy the Escrow contract that holds bounties and validates work.

*   [ ] **Task 2.1:** Scaffold Hardhat project.
*   [ ] **Task 2.2:** Write `SentientEscrow.sol`.
    *   `struct Job { id, requester, bounty, data, result, isComplete }`
    *   `function createJob(string memory _data) payable`
    *   `function submitWork(uint _jobId, string memory _result)`
*   [ ] **Task 2.3:** Write Unit Tests (Happy Path: Create -> Submit -> Withdraw).
*   [ ] **Task 2.4:** Deploy contract to Hedera Testnet via Hashio RPC.
*   [ ] **Task 2.5:** Verify contract and save the **Contract Address** and **ABI**.

## 🤖 EPIC-03: AI Agent Logic (Backend)
**Goal:** Build the Node.js service that acts as the autonomous worker.

*   [ ] **Task 3.1:** Initialize Node.js project with TypeScript.
*   [ ] **Task 3.2:** Integrate **Hedera Agent Kit** (or raw SDK) to initialize the Agent's wallet.
*   [ ] **Task 3.3:** Implement "Event Listener" to watch for `NewJob` events from the Smart Contract.
*   [ ] **Task 3.4:** Implement `JobProcessor` class:
    *   Parse event arguments.
    *   Log "Job Detected".
*   [ ] **Task 3.5:** Implement `submitWork` transaction logic (Agent signing the transaction).

## 🧠 EPIC-04: AI Integration
**Goal:** Connect the Agent to an LLM to actually perform the work.

*   [ ] **Task 4.1:** Integrate `LangChain` or `OpenAI SDK`.
*   [ ] **Task 4.2:** Create a prompt template: `"You are a helpful assistant. Perform the following task: {task_data}"`.
*   [ ] **Task 4.3:** Wire up the pipeline: Event -> LLM Inference -> Transaction Submission.

## 💻 EPIC-05: Frontend & User Interface
**Goal:** A clean Next.js dashboard for humans to post jobs.

*   [ ] **Task 5.1:** Scaffold Next.js App (`npx create-next-app`).
*   [ ] **Task 5.2:** Install `hashconnect` or `wagmi` (if using JSON-RPC) for Wallet Connection.
*   [ ] **Task 5.3:** Build "Connect Wallet" button.
*   [ ] **Task 5.4:** Build "Post Job" Form (Text Area + HBAR Amount Input).
*   [ ] **Task 5.5:** Build "Job Feed" (Read from Smart Contract or Mirror Node API).
*   [ ] **Task 5.6:** Integrate Contract Calls (`createJob`) into the UI.

## 🔗 EPIC-06: Integration & Testing
**Goal:** End-to-End testing of the full loop.

*   [ ] **Task 6.1:** Run Frontend (Localhost) and Agent (Terminal) simultaneously.
*   [ ] **Task 6.2:** Post a job from the UI.
*   [ ] **Task 6.3:** Verify Agent picks it up.
*   [ ] **Task 6.4:** Verify Agent submits result.
*   [ ] **Task 6.5:** Verify UI updates with the result.
*   [ ] **Task 6.6:** Verify HBAR balance changes (User -100, Agent +100).

## 🎨 EPIC-07: Final Polish & Demo Prep
**Goal:** Make it look hackathon-winning.

*   [ ] **Task 7.1:** Style the UI with a "Cyberpunk/Futuristic" theme (Tailwind).
*   [ ] **Task 7.2:** Add "Loading States" and "Success Toasts" to the UI.
*   [ ] **Task 7.3:** Record the Demo Video (OBS Studio).
*   [ ] **Task 7.4:** Write `README.md` and submission text.
