'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface JobFormProps {
    accountId: string | null;
    onJobCreated: () => void;
}

export default function JobForm({ accountId, onJobCreated }: JobFormProps) {
    const [taskData, setTaskData] = useState('');
    const [bounty, setBounty] = useState('10');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!accountId) {
            setStatus({ type: 'error', message: 'Please connect your wallet first' });
            return;
        }

        if (!taskData.trim()) {
            setStatus({ type: 'error', message: 'Please enter a task description' });
            return;
        }

        const bountyValue = parseFloat(bounty);
        if (isNaN(bountyValue) || bountyValue <= 0) {
            setStatus({ type: 'error', message: 'Bounty must be greater than 0' });
            return;
        }

        setIsSubmitting(true);
        setStatus(null);

        try {
            // Simulate transaction submission
            await new Promise(resolve => setTimeout(resolve, 2000));

            // In production, this would:
            // 1. Use HashConnect to sign a transaction
            // 2. Call createJob() on the smart contract
            // 3. Wait for transaction confirmation

            const mockTxHash = '0x' + Math.random().toString(16).substring(2, 12);

            setStatus({ type: 'success', message: `Job created! Transaction: ${mockTxHash}...` });
            setTaskData('');
            setBounty('10');
            onJobCreated();

            // Clear success message after 5 seconds
            setTimeout(() => setStatus(null), 5000);
        } catch (error: any) {
            console.error('Failed to create job:', error);
            setStatus({ type: 'error', message: error.message || 'Failed to create job' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="glass rounded-xl p-6 space-y-4">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-blue">
                Post a Job
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="task" className="block text-sm font-medium text-foreground mb-2">
                        Task Description
                    </label>
                    <textarea
                        id="task"
                        value={taskData}
                        onChange={(e) => setTaskData(e.target.value)}
                        placeholder="e.g., Summarize the Hedera whitepaper in 100 words"
                        className="w-full bg-dark-elevated border border-neon-purple/30 rounded-lg px-4 py-3 text-foreground placeholder-foreground/50 focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
                        rows={4}
                        disabled={isSubmitting}
                    />
                </div>

                <div>
                    <label htmlFor="bounty" className="block text-sm font-medium text-foreground mb-2">
                        Bounty (HBAR)
                    </label>
                    <input
                        id="bounty"
                        type="number"
                        value={bounty}
                        onChange={(e) => setBounty(e.target.value)}
                        min="0.01"
                        step="0.01"
                        className="w-full bg-dark-elevated border border-neon-purple/30 rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
                        disabled={isSubmitting}
                    />
                </div>

                {status && (
                    <div className={`p-4 rounded-lg ${status.type === 'success' ? 'bg-neon-green/10 border border-neon-green/30' : 'bg-neon-pink/10 border border-neon-pink/30'}`}>
                        <p className={`text-sm ${status.type === 'success' ? 'text-neon-green' : 'text-neon-pink'}`}>
                            {status.message}
                        </p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting || !accountId}
                    className="w-full neon-glow bg-gradient-to-r from-neon-purple to-neon-blue text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Creating Job...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Create Job
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
