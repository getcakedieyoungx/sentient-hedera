// Contract configuration and utilities
export const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x97335842D8Ea232586aFF56D373152d62A49b4A1';
export const HEDERA_NETWORK = process.env.NEXT_PUBLIC_HEDERA_NETWORK || 'testnet';

// Simplified ABI - only the functions we need
export const CONTRACT_ABI = [
    {
        "inputs": [{ "internalType": "string", "name": "_data", "type": "string" }],
        "name": "createJob",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
            { "internalType": "uint256", "name": "_jobId", "type": "uint256" },
            { "internalType": "string", "name": "_result", "type": "string" }
        ],
        "name": "submitWork",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{ "internalType": "uint256", "name": "_jobId", "type": "uint256" }],
        "name": "getJob",
        "outputs": [
            {
                "components": [
                    { "internalType": "uint256", "name": "id", "type": "uint256" },
                    { "internalType": "address", "name": "requester", "type": "address" },
                    { "internalType": "uint256", "name": "bounty", "type": "uint256" },
                    { "internalType": "string", "name": "data", "type": "string" },
                    { "internalType": "address", "name": "worker", "type": "address" },
                    { "internalType": "string", "name": "result", "type": "string" },
                    { "internalType": "bool", "name": "isComplete", "type": "bool" }
                ],
                "internalType": "struct SentientEscrow.Job",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "jobCounter",
        "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "uint256", "name": "jobId", "type": "uint256" },
            { "indexed": true, "internalType": "address", "name": "requester", "type": "address" },
            { "indexed": false, "internalType": "uint256", "name": "bounty", "type": "uint256" },
            { "indexed": false, "internalType": "string", "name": "data", "type": "string" }
        ],
        "name": "NewJob",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            { "indexed": true, "internalType": "uint256", "name": "jobId", "type": "uint256" },
            { "indexed": true, "internalType": "address", "name": "worker", "type": "address" },
            { "indexed": false, "internalType": "string", "name": "result", "type": "string" }
        ],
        "name": "JobCompleted",
        "type": "event"
    }
];

// Job type definition
export interface Job {
    id: bigint;
    requester: string;
    bounty: bigint;
    data: string;
    worker: string;
    result: string;
    isComplete: boolean;
}

// Helper to convert Wei to HBAR (1 HBAR = 10^8 tinybars, but in Wei it's 10^18)
export function weiToHbar(wei: bigint): string {
    return (Number(wei) / 1e18).toFixed(2);
}

// Helper to convert HBAR to Wei
export function hbarToWei(hbar: string): bigint {
    return BigInt(Math.floor(parseFloat(hbar) * 1e18));
}
