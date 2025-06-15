import React from "react";
import { FileText, Database, Shield, Target, Layers, GitBranch, Zap } from "lucide-react";
import Header from "@/components/layout/Header";

const WhitePaperPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-launchlayer-background text-launchlayer-text-primary">
      <Header />

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-6 max-w-5xl">
        <div className="bg-launchlayer-surface rounded-xl border border-launchlayer-surface-light p-6 md:p-10 space-y-8">
          
          {/* Title Section */}
          <div className="text-center space-y-4 border-b border-launchlayer-surface-light pb-8">
            <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet bg-clip-text text-transparent">
              Launch Layer Airlock
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-launchlayer-text-primary">Technical White Paper (MVP v1.1)</h2>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-launchlayer-text-secondary">
              <span><strong>Version:</strong> 1.1</span>
              <span><strong>Date:</strong> June 14, 2025</span>
              <span><strong>Status:</strong> <span className="text-launchlayer-accent">Draft</span></span>
            </div>
          </div>

          {/* Abstract */}
          <section className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-launchlayer-accent/20 rounded-full flex items-center justify-center">
                <FileText className="w-4 h-4 text-launchlayer-accent" />
              </div>
              <h3 className="text-xl font-bold text-launchlayer-text-primary">Abstract</h3>
            </div>
            <p className="text-launchlayer-text-secondary leading-relaxed">
              The Launch Layer Airlock is a modular, multi-chain yield-to-access protocol. This document outlines the technical architecture for the Minimum Viable Product (MVP), which enables users to stake assets into strategy-specific vaults, earn sustainable real yield, and automatically convert that yield into guaranteed allocations for curated Token Generation Events (TGEs). The MVP architecture prioritizes security, user choice, and capital efficiency by offering two distinct, transparent yield strategies at launch: a proprietary "Core Yield" strategy and a "Blue-Chip" strategy powered by established third-party protocols. The system is designed for initial deployment on Base, MegaETH, HyperEVM, and Monad.
            </p>
          </section>

          {/* Introduction */}
          <section className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-launchlayer-violet/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-launchlayer-violet">1</span>
              </div>
              <h3 className="text-xl font-bold text-launchlayer-text-primary">Introduction</h3>
            </div>
            <p className="text-launchlayer-text-secondary leading-relaxed">
              The primary goal of the Airlock MVP is to validate the core user journey: transforming passively generated yield into early-stage project exposure without locking up principal capital. To achieve this while maximizing user trust and mitigating regulatory risk, the MVP will separate distinct yield strategies into discrete, user-selected vaults, rather than operating as a single, discretionary "managed fund." This empowers users to consciously select their preferred risk-to-reward profile.
            </p>
          </section>

          {/* Core Architecture */}
          <section className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-launchlayer-mint/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-launchlayer-mint">2</span>
              </div>
              <h3 className="text-xl font-bold text-launchlayer-text-primary">Core Architecture (Hybrid Model)</h3>
            </div>
            <p className="text-launchlayer-text-secondary leading-relaxed">
              The Airlock MVP architecture is composed of a primary user-facing contract (AirlockRouter) that directs user funds to one of several underlying Strategy Vaults based on the user's explicit choice.
            </p>

            {/* Airlock Router */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-launchlayer-accent flex items-center space-x-2">
                <GitBranch className="w-5 h-5" />
                <span>2.1. Airlock Router (AirlockRouter.sol)</span>
              </h4>
              <div className="bg-launchlayer-background p-4 rounded-lg border-l-4 border-l-launchlayer-accent">
                <p className="text-launchlayer-text-secondary mb-3">This is the central smart contract that users interact with.</p>
                <ul className="space-y-2 text-sm text-launchlayer-text-secondary">
                  <li><strong className="text-launchlayer-text-primary">Function:</strong> Acts as a trusted router or "factory" for deposits and withdrawals. It does not hold user funds directly for extended periods but routes them to the appropriate Strategy Vault.</li>
                  <li><strong className="text-launchlayer-text-primary">User Interaction:</strong> A user calls the <code className="bg-launchlayer-surface px-2 py-1 rounded">deposit(strategyId, amount)</code> function, specifying which strategy they want to use.</li>
                  <li><strong className="text-launchlayer-text-primary">Registry:</strong> The router maintains a registry of whitelisted, audited Strategy Vault contracts to ensure user funds can only be sent to secure, approved destinations.</li>
                </ul>
              </div>
            </div>

            {/* Strategy Vaults */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-launchlayer-violet flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>2.2. Strategy Vaults (StrategyVault.sol - Interface)</span>
              </h4>
              <p className="text-launchlayer-text-secondary">
                Each Strategy Vault is a standalone contract that holds user funds and executes a specific yield-generation strategy. For the MVP, two initial types will be deployed on each target chain:
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-launchlayer-background p-4 rounded-lg border-l-4 border-l-launchlayer-violet">
                  <h5 className="font-bold text-launchlayer-violet mb-2">CoreYieldVault.sol (Proprietary Strategy)</h5>
                  <ul className="space-y-1 text-sm text-launchlayer-text-secondary">
                    <li><strong>Yield Source:</strong> Interfaces with a secure, permissioned oracle managed by Infrasingularity</li>
                    <li><strong>Mechanism:</strong> The vault's asset value is updated based on data reported by the Infrasingularity oracle</li>
                  </ul>
                </div>
                <div className="bg-launchlayer-background p-4 rounded-lg border-l-4 border-l-launchlayer-mint">
                  <h5 className="font-bold text-launchlayer-mint mb-2">BlueChipVault.sol (External Strategy)</h5>
                  <ul className="space-y-1 text-sm text-launchlayer-text-secondary">
                    <li><strong>Yield Source:</strong> Interfaces with established, audited vaults from leading multi-chain yield aggregators like Beefy Finance</li>
                    <li><strong>Mechanism:</strong> Acts as a "vault-of-a-vault," programmatically depositing user funds into whitelisted Beefy vaults</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Share Token Model */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-launchlayer-accent flex items-center space-x-2">
                <Layers className="w-5 h-5" />
                <span>2.3. Share Token (sToken) Model</span>
              </h4>
              <div className="bg-launchlayer-background p-4 rounded-lg">
                <p className="text-launchlayer-text-secondary mb-3">Each Strategy Vault will issue its own distinct ERC-20 share token.</p>
                <ul className="space-y-2 text-sm text-launchlayer-text-secondary">
                  <li><strong className="text-launchlayer-text-primary">Example:</strong> A user depositing ETH into the CoreYieldVault on Base will receive <code className="bg-launchlayer-surface px-2 py-1 rounded">sCoreETH</code>. A user depositing into the BlueChipVault will receive <code className="bg-launchlayer-surface px-2 py-1 rounded">sBlueChipETH</code>.</li>
                  <li><strong className="text-launchlayer-text-primary">Value Accrual:</strong> The value of each sToken appreciates as yield is generated within its specific vault, ensuring complete isolation of risks and rewards.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Detailed Mechanisms */}
          <section className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-launchlayer-accent/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-launchlayer-accent">3</span>
              </div>
              <h3 className="text-xl font-bold text-launchlayer-text-primary">Detailed Mechanisms</h3>
            </div>

            {/* User Flow */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-launchlayer-violet">3.1. User Flow & Choice</h4>
              <p className="text-launchlayer-text-secondary">
                The front-end will present a simple UI for each chain (e.g., "The HyperEVM ETH Airlock"). Upon clicking "Stake," the user will be presented with a clear choice:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-launchlayer-violet/10 p-4 rounded-lg border border-launchlayer-violet/30">
                  <h5 className="font-bold text-launchlayer-violet mb-2">Core Yield (Recommended)</h5>
                  <p className="text-sm text-launchlayer-text-secondary">Our proprietary strategy powered by Infrasingularity's validator operations.</p>
                </div>
                <div className="bg-launchlayer-mint/10 p-4 rounded-lg border border-launchlayer-mint/30">
                  <h5 className="font-bold text-launchlayer-mint mb-2">Blue-Chip Stable</h5>
                  <p className="text-sm text-launchlayer-text-secondary">A trusted strategy powered by Beefy Finance, earning yield from blue-chip DeFi protocols.</p>
                </div>
              </div>
            </div>

            {/* Instant Withdrawal */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-launchlayer-mint">3.2. Instant Withdrawal & Liquidity Buffers</h4>
              <div className="bg-launchlayer-background p-4 rounded-lg">
                <p className="text-launchlayer-text-secondary mb-3">To enable instant withdrawals, each Strategy Vault will maintain its own Liquidity Buffer.</p>
                <ul className="space-y-2 text-sm text-launchlayer-text-secondary">
                  <li><strong className="text-launchlayer-text-primary">Mechanism:</strong> A dynamically managed percentage of each vault's TVL will be held in a liquid state within the contract itself.</li>
                  <li><strong className="text-launchlayer-text-primary">Queueing:</strong> In rare bank run scenarios, withdrawal requests enter a short, transparent queue to be fulfilled as capital returns from the underlying strategy.</li>
                </ul>
              </div>
            </div>

            {/* TGE Allocation */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-launchlayer-accent">3.3. TGE Allocation & Vesting</h4>
              <div className="bg-launchlayer-background p-4 rounded-lg">
                <ul className="space-y-2 text-sm text-launchlayer-text-secondary">
                  <li><strong className="text-launchlayer-text-primary">Yield Snapshot:</strong> For a given TGE, a snapshot calculates accrued yield as (current value of user's sTokens) - (initial principal deposited).</li>
                  <li><strong className="text-launchlayer-text-primary">Whitelist Generation:</strong> This data populates a merkle tree, where each user's allocation is proportional to their yield contribution.</li>
                  <li><strong className="text-launchlayer-text-primary">Automated Claim:</strong> The Launch Layer TGE contract allows whitelisted users to claim tokens, automatically sent to Magna-powered vesting contracts.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Security */}
          <section className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-launchlayer-violet/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-launchlayer-violet">4</span>
              </div>
              <h3 className="text-xl font-bold text-launchlayer-text-primary">Security & Multi-Chain Deployment</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-launchlayer-background p-4 rounded-lg border-l-4 border-l-green-500">
                <h4 className="font-bold text-green-500 mb-2 flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Audits</span>
                </h4>
                <p className="text-sm text-launchlayer-text-secondary">All contracts undergo rigorous, multi-firm audits before mainnet deployment.</p>
              </div>
              <div className="bg-launchlayer-background p-4 rounded-lg border-l-4 border-l-launchlayer-accent">
                <h4 className="font-bold text-launchlayer-accent mb-2 flex items-center space-x-2">
                  <Target className="w-4 h-4" />
                  <span>Initial Chains</span>
                </h4>
                <p className="text-sm text-launchlayer-text-secondary">Deployment across Base, MegaETH, HyperEVM, and Monad with tailored asset support.</p>
              </div>
              <div className="bg-launchlayer-background p-4 rounded-lg border-l-4 border-l-launchlayer-mint">
                <h4 className="font-bold text-launchlayer-mint mb-2 flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Risk Isolation</span>
                </h4>
                <p className="text-sm text-launchlayer-text-secondary">Strategy separation prevents cross-contamination of vault risks.</p>
              </div>
            </div>
          </section>

          {/* Future Work */}
          <section className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-launchlayer-mint/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-launchlayer-mint">5</span>
              </div>
              <h3 className="text-xl font-bold text-launchlayer-text-primary">Future Work</h3>
            </div>
            <p className="text-launchlayer-text-secondary mb-4">This MVP architecture provides a secure and scalable foundation. Future iterations will focus on:</p>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-launchlayer-surface p-4 rounded-lg border border-launchlayer-violet/30">
                <h4 className="font-bold text-launchlayer-violet mb-2">Managed Airlock</h4>
                <p className="text-sm text-launchlayer-text-secondary">A V2 product that abstracts user choice into a single, blended-yield vault.</p>
              </div>
              <div className="bg-launchlayer-surface p-4 rounded-lg border border-launchlayer-accent/30">
                <h4 className="font-bold text-launchlayer-accent mb-2">Expanding Strategies</h4>
                <p className="text-sm text-launchlayer-text-secondary">New vaults including "Degen Airlocks" utilizing leveraged yield protocols.</p>
              </div>
              <div className="bg-launchlayer-surface p-4 rounded-lg border border-launchlayer-mint/30">
                <h4 className="font-bold text-launchlayer-mint mb-2">Decentralized Governance</h4>
                <p className="text-sm text-launchlayer-text-secondary">Transitioning management to DAO governance structures.</p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <section className="border-t border-launchlayer-surface-light pt-6">
            <div className="text-center bg-launchlayer-surface p-6 rounded-lg">
              <h3 className="text-xl font-bold text-launchlayer-accent mb-4 flex items-center justify-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Launch Layer Airlock MVP</span>
              </h3>
              <p className="text-launchlayer-text-secondary mb-4">
                A modular, secure, and user-centric approach to yield-to-access protocols across multiple chains.
              </p>
              <div className="pt-4 border-t border-launchlayer-surface-light">
                <p className="text-launchlayer-accent font-bold">
                  <strong>Live Demo:</strong> launchlayer.io
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>
    </div>
  );
};

export default WhitePaperPage;
