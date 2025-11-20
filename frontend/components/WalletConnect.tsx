'use client';

import { useState } from 'react';
import { Wallet, LogOut } from 'lucide-react';

interface WalletConnectProps {
    onAccountChange: (accountId: string | null) => void;
}

export default function WalletConnect({ onAccountChange }: WalletConnectProps) {
    const [accountId, setAccountId] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);

    const connectWallet = async () => {
        setIsConnecting(true);

        // Simulate wallet connection delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // For MVP demo, use a mock account ID
        // In production, this would use HashConnect to pair with HashPack/Blade wallet
        const mockAccountId = '0.0.7218644';
        setAccountId(mockAccountId);
        onAccountChange(mockAccountId);

        setIsConnecting(false);
    };

    const disconnectWallet = () => {
        setAccountId(null);
        onAccountChange(null);
    };

    if (accountId) {
        return (
            <div className="glass rounded-lg px-6 py-3 flex items-center gap-3">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                <span className="text-sm font-mono text-foreground">{accountId}</span>
                <button
                    onClick={disconnectWallet}
                    className="ml-2 p-2 hover:bg-dark-elevated rounded-lg transition-colors"
                    title="Disconnect"
                >
                    <LogOut className="w-4 h-4 text-neon-pink" />
                </button>
            </div>
        );
    }

    return (
        <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="neon-glow bg-gradient-to-r from-neon-purple to-neon-blue text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <Wallet className="w-5 h-5" />
            {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
    );
}
