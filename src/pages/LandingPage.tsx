
import React from "react";
import { ArrowLeft, FileText, Database, Shield, Target, Layers, GitBranch, Zap, Eye, TrendingUp, Coins } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-launchlayer-background text-launchlayer-text-primary">
      {/* Header */}
      <header className="bg-launchlayer-surface border-b border-launchlayer-surface-light p-3 md:p-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 md:space-x-4">
            <div className="flex items-center space-x-2 md:space-x-3">
              <img 
                src="/lovable-uploads/c054fc20-c0d7-4c0c-9d55-8dc40e350c79.png" 
                alt="Launch Lab Logo" 
                className="h-6 md:h-8 w-auto" 
              />
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet bg-clip-text text-transparent">
                Propulsion Finance
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate("/beta-ux")}
              variant="accent"
              size="sm"
              className="flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>Beta UX</span>
            </Button>
            <div className="flex items-center space-x-2 text-xs md:text-sm text-launchlayer-text-secondary">
              <FileText className="w-4 h-4" />
              <span className="hidden md:inline">Version 1.0 - June 2025</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-6 max-w-5xl">
        <div className="bg-launchlayer-surface rounded-xl border border-launchlayer-surface-light p-6 md:p-10 space-y-8">
          
          {/* Title Section */}
          <div className="text-center space-y-4 border-b border-launchlayer-surface-light pb-8">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet bg-clip-text text-transparent">
                Propulsion Finance
              </h1>
              <Button
                onClick={() => navigate("/beta-ux")}
                variant="mint"
                size="sm"
                className="flex items-center space-x-2 shrink-0"
              >
                <Eye className="w-4 h-4" />
                <span>View Beta UX</span>
              </Button>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-launchlayer-text-primary">Advanced Multi-Chain AMM & Native Liquidity Engine</h2>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-launchlayer-text-secondary">
              <span><strong>Version:</strong> 1.0</span>
              <span><strong>Date:</strong> June 16, 2025</span>
              <span><strong>Status:</strong> <span className="text-launchlayer-accent">MVP Ready</span></span>
            </div>
          </div>

          {/* Abstract */}
          <section className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-launchlayer-accent/20 rounded-full flex items-center justify-center">
                <Coins className="w-4 h-4 text-launchlayer-accent" />
              </div>
              <h3 className="text-xl font-bold text-launchlayer-text-primary">The Day-One Liquidity Solution</h3>
            </div>
            <p className="text-launchlayer-text-secondary leading-relaxed">
              Propulsion Finance is an advanced, multi-chain Automated Market Maker (AMM) and the native liquidity engine of the Launch Layer ecosystem. Built on Algebra v4, it provides automated liquidity seeding, concentrated liquidity, and dynamic fees to solve the critical "day-one" liquidity challenge for new token launches.
            </p>
          </section>

          {/* Key Features */}
          <section className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-launchlayer-mint/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-launchlayer-mint" />
              </div>
              <h3 className="text-xl font-bold text-launchlayer-text-primary">Core Features</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-launchlayer-background p-4 rounded-lg border-l-4 border-l-launchlayer-violet">
                <h4 className="font-bold text-launchlayer-violet mb-2 flex items-center space-x-2">
                  <Database className="w-5 h-5" />
                  <span>Automated Liquidity Seeding</span>
                </h4>
                <p className="text-sm text-launchlayer-text-secondary">
                  Instant, automated deployment of trading liquidity the moment a TGE concludes. No manual processes, no delays.
                </p>
              </div>

              <div className="bg-launchlayer-background p-4 rounded-lg border-l-4 border-l-launchlayer-accent">
                <h4 className="font-bold text-launchlayer-accent mb-2 flex items-center space-x-2">
                  <Layers className="w-5 h-5" />
                  <span>Concentrated Liquidity</span>
                </h4>
                <p className="text-sm text-launchlayer-text-secondary">
                  Built on Algebra v4 for maximum capital efficiency with concentrated liquidity positions and dynamic fee structures.
                </p>
              </div>

              <div className="bg-launchlayer-background p-4 rounded-lg border-l-4 border-l-launchlayer-mint">
                <h4 className="font-bold text-launchlayer-mint mb-2 flex items-center space-x-2">
                  <GitBranch className="w-5 h-5" />
                  <span>Multi-Chain Deployment</span>
                </h4>
                <p className="text-sm text-launchlayer-text-secondary">
                  Deployed across Base, HyperEVM, MegaETH, and Sonic with tailored optimizations for each ecosystem.
                </p>
              </div>

              <div className="bg-launchlayer-background p-4 rounded-lg border-l-4 border-l-green-500">
                <h4 className="font-bold text-green-500 mb-2 flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Flexible LP Deployment</span>
                </h4>
                <p className="text-sm text-launchlayer-text-secondary">
                  Option to split initial liquidity between Propulsion Finance and external "hero DEXs" for maximum reach.
                </p>
              </div>
            </div>
          </section>

          {/* Technical Roadmap */}
          <section className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-launchlayer-violet/20 rounded-full flex items-center justify-center">
                <Zap className="w-4 h-4 text-launchlayer-violet" />
              </div>
              <h3 className="text-xl font-bold text-launchlayer-text-primary">Advanced Roadmap</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-launchlayer-violet/10 p-4 rounded-lg border border-launchlayer-violet/30">
                <h4 className="font-bold text-launchlayer-violet mb-2">Phase 2: Custom AMM with Advanced Hooks</h4>
                <p className="text-sm text-launchlayer-text-secondary mb-2">
                  Transition to a custom AMM implementation inspired by Uniswap v4's "hooks" architecture.
                </p>
                <ul className="text-xs text-launchlayer-text-secondary space-y-1">
                  <li>• Auto-Ranging Liquidity Management</li>
                  <li>• Native Limit Orders</li>
                  <li>• TWAMM (Time-Weighted Average Market Maker)</li>
                </ul>
              </div>

              <div className="bg-launchlayer-accent/10 p-4 rounded-lg border border-launchlayer-accent/30">
                <h4 className="font-bold text-launchlayer-accent mb-2">Phase 3: MEV Capture via Order Flow Auctions</h4>
                <p className="text-sm text-launchlayer-text-secondary">
                  Intent-based trading system with competitive solver networks to capture MEV and return value to users through better prices and reduced slippage.
                </p>
              </div>

              <div className="bg-launchlayer-mint/10 p-4 rounded-lg border border-launchlayer-mint/30">
                <h4 className="font-bold text-launchlayer-mint mb-2">Phase 4: Alternative AMM Research</h4>
                <p className="text-sm text-launchlayer-text-secondary">
                  Ongoing research into emerging models like Ambient Finance's "singleton" architecture and oracle-driven Proactive Market Makers.
                </p>
              </div>
            </div>
          </section>

          {/* Revenue Model */}
          <section className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-launchlayer-accent/20 rounded-full flex items-center justify-center">
                <Target className="w-4 h-4 text-launchlayer-accent" />
              </div>
              <h3 className="text-xl font-bold text-launchlayer-text-primary">Protocol Revenue Model</h3>
            </div>
            <div className="bg-launchlayer-background p-4 rounded-lg border-l-4 border-l-launchlayer-accent">
              <p className="text-launchlayer-text-secondary">
                <strong className="text-launchlayer-text-primary">Protocol Fee Structure:</strong> A portion of dynamic trading fees flows directly to the Launch Layer protocol treasury. For example, in a 0.3% fee pool: 0.25% to Liquidity Providers, 0.05% to protocol treasury. All fees are configurable per pool.
              </p>
            </div>
          </section>

          {/* Footer */}
          <section className="border-t border-launchlayer-surface-light pt-6">
            <div className="text-center bg-launchlayer-surface p-6 rounded-lg">
              <h3 className="text-xl font-bold text-launchlayer-accent mb-4 flex items-center justify-center space-x-2">
                <Coins className="w-5 h-5" />
                <span>Propulsion Finance</span>
              </h3>
              <p className="text-launchlayer-text-secondary mb-4">
                The native liquidity engine of Launch Layer - solving day-one liquidity challenges through automated, capital-efficient AMM solutions.
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

export default LandingPage;
