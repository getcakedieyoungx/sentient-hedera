#!/usr/bin/env node

/**
 * Quick Start Script for Sentient AI Agent
 * 
 * This script helps you get started with the agent by:
 * 1. Checking environment configuration
 * 2. Verifying contract connection
 * 3. Starting the agent
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\n🚀 Sentient AI Agent - Quick Start\n');
console.log('='.repeat(60));

// Check if .env exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
    console.error('\n❌ Error: .env file not found!');
    console.log('\n📝 Please create a .env file with your credentials:');
    console.log('   1. Copy .env.example to .env');
    console.log('   2. Fill in your HEDERA_ACCOUNT_ID and HEDERA_PRIVATE_KEY');
    console.log('   3. Add your OPENAI_API_KEY');
    console.log('\nExample:');
    console.log('   cp .env.example .env\n');
    process.exit(1);
}

// Load environment variables
import dotenv from 'dotenv';
dotenv.config();

// Check required variables
const required = [
    'HEDERA_ACCOUNT_ID',
    'HEDERA_PRIVATE_KEY',
    'OPENAI_API_KEY',
    'CONTRACT_ADDRESS'
];

let missingVars = [];
for (const varName of required) {
    if (!process.env[varName]) {
        missingVars.push(varName);
    }
}

if (missingVars.length > 0) {
    console.error('\n❌ Error: Missing required environment variables:');
    missingVars.forEach(v => console.log(`   - ${v}`));
    console.log('\n📝 Please update your .env file with these values.\n');
    process.exit(1);
}

console.log('\n✅ Environment configuration OK');
console.log(`   Account: ${process.env.HEDERA_ACCOUNT_ID}`);
console.log(`   Contract: ${process.env.CONTRACT_ADDRESS}`);
console.log(`   OpenAI: ${process.env.OPENAI_API_KEY?.substring(0, 10)}...`);

console.log('\n🔄 Starting agent...\n');
console.log('='.repeat(60));

// Import and start the main agent
import('./index.js').catch((error) => {
    console.error('\n❌ Failed to start agent:', error.message);
    process.exit(1);
});
