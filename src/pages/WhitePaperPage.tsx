
import React from "react";
import { FileText, Database, Shield, Target, Layers, GitBranch, Zap, TrendingUp, Coins } from "lucide-react";
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
              Propulsion Finance
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-launchlayer-text-primary">Technical White Paper (MVP v1.0)</h2>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-launchlayer-text-secondary">
              <span><strong>Version:</strong> 1.0</span>
              <span><strong>Date:</strong> June 16, 2025</span>
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
              Propulsion Finance is an advanced, multi-chain Automated Market Maker (AMM) and the native liquidity engine of the Launch Layer ecosystem. It is designed to solve the critical "day-one" liquidity challenge for new projects by providing an integrated, capital-efficient, and automated solution for secondary market creation. The Minimum Viable Product (MVP) will launch on an Algebra v4 backend, leveraging concentrated liquidity and dynamic fees. This paper outlines the MVP architecture, its core mechanisms—including automated liquidity seeding—and its sophisticated, multi-phase technical roadmap towards a custom AMM with advanced features like MEV-capture and intent-based order flow.
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
              For new token launches, achieving deep, reliable, and immediate liquidity is one of the greatest hurdles. Traditional approaches are manual, capital-intensive, and fragmented, often forcing projects to cede control to external market makers or launch on DEXs with no direct link to their primary fundraising platform.
            </p>
            <p className="text-launchlayer-text-secondary leading-relaxed">
              Propulsion Finance is engineered to solve this. As the native AMM of Launch Layer, it provides a seamless, automated pathway from TGE to a liquid, tradable market, creating a self-sustaining ecosystem that benefits projects, users, and liquidity providers.
            </p>
          </section>

          {/* Core Architecture */}
          <section className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-launchlayer-mint/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-launchlayer-mint">2</span>
              </div>
              <h3 className="text-xl font-bold text-launchlayer-text-primary">Core Architecture (MVP - Phase 1)</h3>
            </div>
            <p className="text-launchlayer-text-secondary leading-relaxed">
              The MVP of Propulsion Finance prioritizes speed-to-market, security, and capital efficiency by building on a proven, audited foundation.
            </p>

            {/* Algebra v4 Engine */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-launchlayer-accent flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>2.1. The Algebra v4 Engine</span>
              </h4>
              <div className="bg-launchlayer-background p-4 rounded-lg border-l-4 border-l-launchlayer-accent">
                <p className="text-launchlayer-text-secondary mb-3">The initial deployment of Propulsion Finance will utilize the Algebra v4 AMM engine. This choice is strategic:</p>
                <ul className="space-y-2 text-sm text-launchlayer-text-secondary">
                  <li><strong className="text-launchlayer-text-primary">Concentrated Liquidity:</strong> Allows LPs to allocate capital within specific price ranges, dramatically increasing capital efficiency compared to traditional xy=k models.</li>
                  <li><strong className="text-launchlayer-text-primary">Dynamic Fees:</strong> Automatically adjusts trading fees based on volatility and other pool-specific factors, optimizing returns for LPs and providing fairer prices for traders.</li>
                  <li><strong className="text-launchlayer-text-primary">Modularity & Security:</strong> Built on an audited, battle-tested codebase that provides a secure foundation and allows for future extensibility with custom features.</li>
                </ul>
              </div>
            </div>

            {/* Multi-Chain Deployment */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-launchlayer-violet flex items-center space-x-2">
                <GitBranch className="w-5 h-5" />
                <span>2.2. Multi-Chain Deployment</span>
              </h4>
              <div className="bg-launchlayer-background p-4 rounded-lg">
                <p className="text-launchlayer-text-secondary">
                  Propulsion Finance will be deployed in lockstep with Launch Layer's target chains, including Base, HyperEVM, MegaETH, and Sonic. Each deployment will be a standalone instance of the AMM, tailored to its host ecosystem.
                </p>
              </div>
            </div>
          </section>

          {/* Key Mechanisms */}
          <section className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-launchlayer-accent/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-launchlayer-accent">3</span>
              </div>
              <h3 className="text-xl font-bold text-launchlayer-text-primary">Key Mechanisms & Features</h3>
            </div>

            {/* Automated Liquidity Seeding */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-launchlayer-violet flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>3.1. Automated Liquidity Seeding</span>
              </h4>
              <div className="bg-launchlayer-violet/10 p-4 rounded-lg border border-launchlayer-violet/30">
                <p className="text-launchlayer-text-secondary mb-3">This is the core integration with the Launch Layer platform.</p>
                <div className="space-y-2 text-sm text-launchlayer-text-secondary">
                  <div><strong className="text-launchlayer-text-primary">Mechanism:</strong> When a project conducts its TGE via Launch Layer, a pre-determined portion of the raised funds (e.g., ETH, USDC) and the project's own tokens are automatically transferred to a contract. This contract then programmatically creates a new concentrated liquidity pool on Propulsion Finance and deploys the assets as the pool's initial liquidity.</div>
                  <div><strong className="text-launchlayer-text-primary">Benefit:</strong> This provides projects with an instant, functional trading market for their token the moment their TGE concludes, eliminating manual processes and delays.</div>
                </div>
              </div>
            </div>

            {/* Flexible LP Deployment */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-launchlayer-mint flex items-center space-x-2">
                <Layers className="w-5 h-5" />
                <span>3.2. Flexible LP Deployment Model</span>
              </h4>
              <div className="bg-launchlayer-background p-4 rounded-lg">
                <p className="text-launchlayer-text-secondary mb-3">To foster ecosystem collaboration and maximize reach for curated projects, Propulsion Finance supports a flexible deployment model.</p>
                <ul className="space-y-2 text-sm text-launchlayer-text-secondary">
                  <li><strong className="text-launchlayer-text-primary">Functionality:</strong> Curated projects launching on Launch Layer will have the option to automatically split their initial liquidity deployment. For example, deploying 50% to a new pool on Propulsion Finance and the other 50% to a whitelisted "hero DEX" on the same chain.</li>
                  <li><strong className="text-launchlayer-text-primary">Technical Implementation:</strong> This requires an "Adapter" contract layer capable of interacting with the specific router contracts of different external DEXs (e.g., Uniswap V3 forks, other Algebra-based DEXs).</li>
                </ul>
              </div>
            </div>

            {/* DEX Aggregator Integration */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-launchlayer-accent flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span>3.3. DEX Aggregator Integration</span>
              </h4>
              <div className="bg-launchlayer-background p-4 rounded-lg">
                <p className="text-launchlayer-text-secondary">
                  The AMM's smart contracts adhere to common standards, ensuring that Propulsion Finance pools are immediately discoverable by major DEX aggregators. This drives external trading volume to our pools from day one, enhancing fee generation and liquidity depth.
                </p>
              </div>
            </div>
          </section>

          {/* Protocol Revenue Model */}
          <section className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-launchlayer-violet/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-launchlayer-violet">4</span>
              </div>
              <h3 className="text-xl font-bold text-launchlayer-text-primary">Protocol Revenue Model</h3>
            </div>
            <div className="bg-launchlayer-background p-4 rounded-lg border-l-4 border-l-launchlayer-mint">
              <p className="text-launchlayer-text-secondary mb-3">Propulsion Finance contributes directly to the Launch Layer protocol treasury.</p>
              <p className="text-sm text-launchlayer-text-secondary">
                <strong className="text-launchlayer-text-primary">Protocol Fee:</strong> A portion of the dynamic trading fees generated from every swap is automatically allocated to the protocol. For a typical 0.3% fee pool, the split might be 0.25% to Liquidity Providers and 0.05% to the Launch Layer treasury. This fee is configurable per pool.
              </p>
            </div>
          </section>

          {/* Technical Roadmap */}
          <section className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-launchlayer-mint/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-launchlayer-mint">5</span>
              </div>
              <h3 className="text-xl font-bold text-launchlayer-text-primary">Technical Roadmap & Future Vision</h3>
            </div>
            <p className="text-launchlayer-text-secondary mb-4">The Algebra v4 MVP is the foundation for a highly ambitious roadmap.</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-launchlayer-surface p-4 rounded-lg border border-launchlayer-violet/30">
                <h4 className="font-bold text-launchlayer-violet mb-2">Phase 2: Custom AMM with Advanced Hooks</h4>
                <p className="text-sm text-launchlayer-text-secondary mb-2">Transition to a custom AMM implementation inspired by Uniswap v4's "hooks" architecture.</p>
                <ul className="text-xs text-launchlayer-text-secondary space-y-1">
                  <li>• Auto-Ranging Liquidity Management</li>
                  <li>• Native Limit Orders</li>
                  <li>• TWAMM (Time-Weighted Average Market Maker)</li>
                </ul>
              </div>
              <div className="bg-launchlayer-surface p-4 rounded-lg border border-launchlayer-accent/30">
                <h4 className="font-bold text-launchlayer-accent mb-2">Phase 3: MEV Capture via OFA</h4>
                <p className="text-sm text-launchlayer-text-secondary">Integrate an intent-based trading system similar to CoW Protocol with competitive solver networks for MEV capture.</p>
              </div>
            </div>
            <div className="bg-launchlayer-surface p-4 rounded-lg border border-launchlayer-mint/30">
              <h4 className="font-bold text-launchlayer-mint mb-2">Phase 4 (Research): Alternative AMM Models</h4>
              <p className="text-sm text-launchlayer-text-secondary">Ongoing research into emerging models like Ambient Finance's "singleton" architecture or oracle-driven Proactive Market Makers (PMMs).</p>
            </div>
          </section>

          {/* Security */}
          <section className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-launchlayer-accent/20 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-launchlayer-accent">6</span>
              </div>
              <h3 className="text-xl font-bold text-launchlayer-text-primary">Security</h3>
            </div>
            <div className="bg-launchlayer-background p-4 rounded-lg border-l-4 border-l-green-500">
              <p className="text-launchlayer-text-secondary">
                For the MVP, we rely on the extensive audits and battle-tested nature of the Algebra codebase. All custom integration layers, such as the Automated Liquidity Seeding contract and external DEX adapters, will undergo rigorous, independent audits. All future upgrades, especially the custom AMM hooks and OFA layer, will require multi-firm audits before deployment.
              </p>
            </div>
          </section>

          {/* Footer */}
          <section className="border-t border-launchlayer-surface-light pt-6">
            <div className="text-center bg-launchlayer-surface p-6 rounded-lg">
              <h3 className="text-xl font-bold text-launchlayer-accent mb-4 flex items-center justify-center space-x-2">
                <Coins className="w-5 h-5" />
                <span>Propulsion Finance MVP</span>
              </h3>
              <p className="text-launchlayer-text-secondary mb-4">
                The native liquidity engine of Launch Layer, solving day-one liquidity challenges through automated, capital-efficient solutions.
              </p>
              <div className="pt-4 border-t border-launchlayer-surface-light">
                <p className="text-launchlayer-accent font-bold">
                  <strong>Part of Launch Lab:</strong> launchlayer.io
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
