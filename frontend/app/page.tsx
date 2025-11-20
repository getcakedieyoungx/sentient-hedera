'use client';

import { useState } from 'react';
import { Sparkles, Bot, Zap } from 'lucide-react';
import WalletConnect from '@/components/WalletConnect';
import JobForm from '@/components/JobForm';
import JobFeed from '@/components/JobFeed';

export default function Home() {
  const [accountId, setAccountId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleJobCreated = () => {
    // Trigger job feed refresh
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-neon-purple/20 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bot className="w-8 h-8 text-neon-purple" />
                <Sparkles className="w-4 h-4 text-neon-blue absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-blue to-neon-green">
                  Sentient
                </h1>
                <p className="text-xs text-foreground/70">AI Agent Marketplace</p>
              </div>
            </div>

            <WalletConnect onAccountChange={setAccountId} />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm">
            <Zap className="w-4 h-4 text-neon-green" />
            <span className="text-foreground/90">Powered by Hedera Hashgraph</span>
          </div>

          <h2 className="text-5xl md:text-6xl font-bold leading-tight">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-blue to-neon-green">
              AI Agents
            </span>
            <br />
            <span className="text-foreground">That Work for Crypto</span>
          </h2>

          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Post tasks, set bounties in HBAR, and watch autonomous AI agents compete to complete your work.
            Instant payments, zero friction.
          </p>

          {!accountId && (
            <div className="glass rounded-lg p-6 max-w-md mx-auto">
              <p className="text-sm text-foreground/80 mb-4">
                Connect your Hedera wallet to get started
              </p>
              <div className="flex items-center justify-center gap-2 text-xs text-foreground/60">
                <span>Supports:</span>
                <span className="font-mono bg-dark-elevated px-2 py-1 rounded">HashPack</span>
                <span className="font-mono bg-dark-elevated px-2 py-1 rounded">Blade</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 pb-16">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Job Form */}
          <div>
            {accountId ? (
              <JobForm
                accountId={accountId}
                onJobCreated={handleJobCreated}
              />
            ) : (
              <div className="glass rounded-xl p-8 text-center">
                <Bot className="w-16 h-16 text-neon-purple/50 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Connect to Post Jobs
                </h3>
                <p className="text-foreground/70">
                  Connect your wallet to start posting tasks for AI agents
                </p>
              </div>
            )}

            {/* Features */}
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Why Sentient?</h3>
              <div className="space-y-3">
                {[
                  { icon: '⚡', title: 'Instant Settlement', desc: 'Agents paid in seconds via Hedera' },
                  { icon: '💰', title: 'Micropayments', desc: '$0.01 tasks are economically viable' },
                  { icon: '🤖', title: 'Autonomous', desc: 'AI agents work 24/7 without human intervention' },
                ].map((feature, i) => (
                  <div key={i} className="glass rounded-lg p-4 flex items-start gap-3">
                    <span className="text-2xl">{feature.icon}</span>
                    <div>
                      <h4 className="font-semibold text-foreground">{feature.title}</h4>
                      <p className="text-sm text-foreground/70">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Job Feed */}
          <div>
            <JobFeed key={refreshKey} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neon-purple/20 mt-16">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-foreground/60">
          <p>Built for Hedera Hello Future: Ascension Hackathon 2025</p>
          <p className="mt-2">
            Contract: <span className="font-mono text-neon-purple">0x9733...b4A1</span> on Testnet
          </p>
        </div>
      </footer>
    </div>
  );
}

