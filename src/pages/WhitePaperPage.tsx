import React from "react";
import { ArrowLeft, FileText, Rocket, Database, TrendingUp, Shield, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const WhitePaperPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-launchlayer-background text-launchlayer-text-primary">
      {/* Header */}
      <header className="bg-launchlayer-surface border-b border-launchlayer-surface-light p-3 md:p-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3 md:space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-sm"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">Back to Pitch</span>
              <span className="sm:hidden">Back</span>
            </Button>
            <div className="flex items-center space-x-2 md:space-x-3">
              <img 
                src="/lovable-uploads/c054fc20-c0d7-4c0c-9d55-8dc40e350c79.png" 
                alt="Launch Layer Logo" 
                className="h-6 md:h-8 w-auto" 
              />
              <h1 className="text-lg md:text-xl font-bold bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet bg-clip-text text-transparent">
                Technical White Paper
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-xs md:text-sm text-launchlayer-text-secondary">
            <FileText className="w-4 h-4" />
            <span className="hidden md:inline">Chain-agnostic infrastructure</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-4 md:p-6 max-w-4xl">
        <div className="bg-launchlayer-surface rounded-xl border border-launchlayer-surface-light p-4 md:p-8 space-y-6 md:space-y-8">
          
          {/* Title Section */}
          <div className="text-center space-y-3 md:space-y-4 border-b border-launchlayer-surface-light pb-6 md:pb-8">
            <div className="flex items-center justify-center space-x-3 mb-3 md:mb-4">
              <Rocket className="w-8 md:w-10 h-8 md:h-10 text-launchlayer-accent" />
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet bg-clip-text text-transparent">
                Launch Layer
              </h1>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-launchlayer-text-primary">Technical White Paper</h2>
            <p className="text-base md:text-lg text-launchlayer-accent font-medium">
              Chain-agnostic yield, launch, and liquidity infrastructure.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-6 md:space-y-8">
            
            {/* Introduction */}
            <section className="space-y-3 md:space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 bg-launchlayer-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-launchlayer-accent">1</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-launchlayer-text-primary">Introduction</h3>
              </div>
              <p className="text-sm md:text-base text-launchlayer-text-secondary leading-relaxed">
                Launch Layer addresses persistent inefficiencies and risks in Web3 token launches by creating an integrated infrastructure platform that combines automated yield generation, curated token presales, and deep, sustainable liquidity. This white paper outlines the core mechanisms, technical details, and economic model underpinning the Launch Layer ecosystem.
              </p>
              <div className="bg-launchlayer-background p-3 md:p-4 rounded-lg border-l-4 border-l-launchlayer-accent">
                <h4 className="font-bold text-launchlayer-accent mb-2 flex items-center space-x-2 text-sm md:text-base">
                  <Database className="w-4 h-4" />
                  <span>Core Components:</span>
                </h4>
                <ul className="space-y-1 text-xs md:text-sm text-launchlayer-text-secondary">
                  <li><strong>Airlocks:</strong> Yield-driven automated presale allocations</li>
                  <li><strong>Launch Layer (Launchpad):</strong> Institutional-grade token launch infrastructure</li>
                  <li><strong>Propulsion Finance (DEX):</strong> Advanced AMM providing sustainable liquidity and MEV rebates</li>
                </ul>
              </div>
            </section>

            {/* Market Opportunity */}
            <section className="space-y-3 md:space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 bg-launchlayer-violet/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-launchlayer-violet">2</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-launchlayer-text-primary">Market Opportunity & Rationale</h3>
              </div>
              <p className="text-sm md:text-base text-launchlayer-text-secondary leading-relaxed">
                Web3 token launches represent a fragmented $10B+ market characterized by:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                <div className="bg-launchlayer-background p-3 md:p-4 rounded-lg border-l-4 border-l-red-400">
                  <h4 className="font-bold text-red-400 mb-2 flex items-center space-x-2 text-sm">
                    <Users className="w-4 h-4" />
                    <span>User-side:</span>
                  </h4>
                  <p className="text-xs md:text-sm text-launchlayer-text-secondary">Risky presales, whitelist inefficiency, locked capital without yield.</p>
                </div>
                <div className="bg-launchlayer-background p-3 md:p-4 rounded-lg border-l-4 border-l-launchlayer-accent">
                  <h4 className="font-bold text-launchlayer-accent mb-2 flex items-center space-x-2 text-sm">
                    <Rocket className="w-4 h-4" />
                    <span>Project-side:</span>
                  </h4>
                  <p className="text-xs md:text-sm text-launchlayer-text-secondary">Complex fundraising mechanics, difficult liquidity provisioning.</p>
                </div>
                <div className="bg-launchlayer-background p-3 md:p-4 rounded-lg border-l-4 border-l-launchlayer-mint">
                  <h4 className="font-bold text-launchlayer-mint mb-2 flex items-center space-x-2 text-sm">
                    <Shield className="w-4 h-4" />
                    <span>Chain-side:</span>
                  </h4>
                  <p className="text-xs md:text-sm text-launchlayer-text-secondary">No standardized turnkey infrastructure for retaining sustainable TVL and liquidity.</p>
                </div>
              </div>
              <p className="text-sm md:text-base text-launchlayer-text-secondary">
                Launch Layer solves these inefficiencies through integrated automation, capturing a significant share of transaction fees and staking yields, creating a self-sustaining revenue loop.
              </p>
            </section>

            {/* Technical Architecture */}
            <section className="space-y-3 md:space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 bg-launchlayer-mint/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-launchlayer-mint">3</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-launchlayer-text-primary">Technical Architecture & Key Mechanisms</h3>
              </div>

              {/* Airlocks */}
              <div className="space-y-2 md:space-y-3">
                <h4 className="text-base md:text-lg font-bold text-launchlayer-violet flex items-center space-x-2">
                  <Database className="w-4 md:w-5 h-4 md:h-5" />
                  <span>A. Airlocks (Yield-to-Allocation Engine)</span>
                </h4>
                <div className="bg-launchlayer-background p-3 md:p-4 rounded-lg">
                  <h5 className="font-bold text-launchlayer-text-primary mb-2 text-sm md:text-base">Mechanism Overview:</h5>
                  <ul className="space-y-1 text-xs md:text-sm text-launchlayer-text-secondary list-disc list-inside">
                    <li>Users stake chain-native tokens into dedicated staking vaults ("Airlocks").</li>
                    <li>Principal remains always liquid and withdrawable anytime.</li>
                  </ul>
                  <h5 className="font-bold text-launchlayer-text-primary mb-2 mt-3 md:mt-4 text-sm md:text-base">Yield Generation and Allocation Automation:</h5>
                  <ul className="space-y-1 text-xs md:text-sm text-launchlayer-text-secondary list-disc list-inside">
                    <li>Validator & early-ops yield generation (~10–15% APY baseline) supplemented by project-specific bonus streams.</li>
                    <li>Fully automated smart contract-driven yield compounding.</li>
                    <li>Yield auto-allocated into presale allocations via integrated vault logic—no additional capital lock or whitelist required.</li>
                  </ul>
                  <h5 className="font-bold text-launchlayer-text-primary mb-2 mt-3 md:mt-4 text-sm md:text-base">Technical Details:</h5>
                  <ul className="space-y-1 text-xs md:text-sm text-launchlayer-text-secondary list-disc list-inside">
                    <li>Solidity smart contracts deployed cross-chain (target chains: Base, Hype, MegaETH, Sonic).</li>
                    <li>Chainlink oracles for price & APY feeds, mitigating price manipulation and market volatility.</li>
                    <li>Internal yield compounding & allocation logic audited, fully autonomous after deployment.</li>
                  </ul>
                </div>
              </div>

              {/* Launch Layer */}
              <div className="space-y-2 md:space-y-3">
                <h4 className="text-base md:text-lg font-bold text-launchlayer-accent flex items-center space-x-2">
                  <Rocket className="w-4 md:w-5 h-4 md:h-5" />
                  <span>B. Launch Layer (Institutional-grade Launchpad)</span>
                </h4>
                <div className="bg-launchlayer-background p-3 md:p-4 rounded-lg">
                  <h5 className="font-bold text-launchlayer-text-primary mb-2 text-sm md:text-base">Curated & Permissionless Launch Paths:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <h6 className="font-bold text-launchlayer-accent mb-1 text-sm">Curated Launches:</h6>
                      <ul className="space-y-1 text-xs md:text-sm text-launchlayer-text-secondary list-disc list-inside">
                        <li>Rigorous project vetting (tech, team, tokenomics).</li>
                        <li>Guaranteed yield-based presale allocation for Airlock stakers.</li>
                        <li>Institutional-grade token vesting managed via Magna (trusted platform, $3.5B+ distributed).</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-bold text-launchlayer-mint mb-1 text-sm">Permissionless Launches:</h6>
                      <ul className="space-y-1 text-xs md:text-sm text-launchlayer-text-secondary list-disc list-inside">
                        <li>Open-market path for experimental projects.</li>
                        <li>100% AMM liquidity at launch for instant market validation.</li>
                        <li>Automatic price discovery and liquidity pool deployment.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Propulsion Finance */}
              <div className="space-y-2 md:space-y-3">
                <h4 className="text-base md:text-lg font-bold text-launchlayer-mint flex items-center space-x-2">
                  <TrendingUp className="w-4 md:w-5 h-4 md:h-5" />
                  <span>C. Propulsion Finance (Advanced DEX & Liquidity Engine)</span>
                </h4>
                <div className="bg-launchlayer-background p-3 md:p-4 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <h6 className="font-bold text-launchlayer-mint mb-2 text-sm">Initial Deployment: Algebra v4 AMM:</h6>
                      <ul className="space-y-1 text-xs md:text-sm text-launchlayer-text-secondary list-disc list-inside">
                        <li>Concentrated liquidity management.</li>
                        <li>Dynamic fee model to optimize capital efficiency and incentivize LPs.</li>
                      </ul>
                    </div>
                    <div>
                      <h6 className="font-bold text-launchlayer-accent mb-2 text-sm">Future Roadmap Upgrades:</h6>
                      <ul className="space-y-1 text-xs md:text-sm text-launchlayer-text-secondary list-disc list-inside">
                        <li>Uniswap v4 custom hooks: Automated liquidity management, TWAMM, native limit orders.</li>
                        <li>Order-flow auction (OFA): MEV-capture mechanism via solver-based intent matching.</li>
                        <li>Advanced AMM Logic: Potential transition towards Ambient or PMM pools.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Economic Model */}
            <section className="space-y-3 md:space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 bg-launchlayer-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-launchlayer-accent">4</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-launchlayer-text-primary">Economic Model & Revenue Streams</h3>
              </div>
              <p className="text-sm md:text-base text-launchlayer-text-secondary">
                Launch Layer captures significant, recurring protocol revenue via three distinct but integrated streams:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                <div className="bg-launchlayer-background p-3 md:p-4 rounded-lg border-l-4 border-l-launchlayer-violet">
                  <h4 className="font-bold text-launchlayer-violet mb-2 text-sm">Staking Yield:</h4>
                  <p className="text-xs md:text-sm text-launchlayer-text-secondary">~10% protocol share from yield generated within Airlock vaults.</p>
                </div>
                <div className="bg-launchlayer-background p-3 md:p-4 rounded-lg border-l-4 border-l-launchlayer-accent">
                  <h4 className="font-bold text-launchlayer-accent mb-2 text-sm">Launchpad Fees:</h4>
                  <p className="text-xs md:text-sm text-launchlayer-text-secondary">5% standard platform fee from project token raises.</p>
                </div>
                <div className="bg-launchlayer-background p-3 md:p-4 rounded-lg border-l-4 border-l-launchlayer-mint">
                  <h4 className="font-bold text-launchlayer-mint mb-2 text-sm">DEX Trading Revenue:</h4>
                  <p className="text-xs md:text-sm text-launchlayer-text-secondary">Fixed protocol share from Propulsion Finance AMM trading volume (~0.05–0.15% per transaction).</p>
                </div>
              </div>
              <div className="bg-launchlayer-surface p-3 md:p-4 rounded-lg border border-launchlayer-accent/30">
                <h4 className="font-bold text-launchlayer-accent mb-2 text-sm md:text-base">Example Revenue Calculation (Single Cycle):</h4>
                <ul className="space-y-1 text-xs md:text-sm text-launchlayer-text-secondary">
                  <li><strong>Airlock TVL:</strong> $5,000,000</li>
                  <li><strong>Yield Generation:</strong> 15% annualized (~$750,000 per year)</li>
                  <li><strong>Four TGEs:</strong> each raising $2,000,000, total raise $8,000,000 (5% fee = $400,000)</li>
                  <li><strong>AMM trading volume:</strong> $50M per cycle (~$25,000–$75,000 revenue)</li>
                  <li><strong className="text-launchlayer-accent">Total revenue per cycle:</strong> Easily exceeding ~$500K protocol revenue with scalable TVL and launch activity.</li>
                </ul>
              </div>
            </section>

            {/* Roadmap */}
            <section className="space-y-3 md:space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 bg-launchlayer-violet/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-launchlayer-violet">5</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-launchlayer-text-primary">Roadmap & Deployment Plan</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                <div className="bg-launchlayer-background p-3 md:p-4 rounded-lg border-l-4 border-l-green-500">
                  <h4 className="font-bold text-green-500 mb-2 text-sm">Current Status:</h4>
                  <ul className="space-y-1 text-xs md:text-sm text-launchlayer-text-secondary list-disc list-inside">
                    <li>Smart contracts deployed and tested on Ethereum (Sepolia testnet).</li>
                    <li>Dashboard UI complete, automation API integration in progress.</li>
                  </ul>
                </div>
                <div className="bg-launchlayer-background p-3 md:p-4 rounded-lg border-l-4 border-l-launchlayer-accent">
                  <h4 className="font-bold text-launchlayer-accent mb-2 text-sm">Q3-Q4 2025:</h4>
                  <ul className="space-y-1 text-xs md:text-sm text-launchlayer-text-secondary list-disc list-inside">
                    <li>Mainnet deployment on target chains</li>
                    <li>Curated launch partnerships</li>
                    <li>Propulsion Finance AMM MVP</li>
                  </ul>
                </div>
                <div className="bg-launchlayer-background p-3 md:p-4 rounded-lg border-l-4 border-l-launchlayer-mint">
                  <h4 className="font-bold text-launchlayer-mint mb-2 text-sm">Q1-Q2 2026:</h4>
                  <ul className="space-y-1 text-xs md:text-sm text-launchlayer-text-secondary list-disc list-inside">
                    <li>Advanced DEX upgrades (OFA, custom hooks)</li>
                    <li>Cross-chain expansion</li>
                    <li>Full revenue stream activation</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Team */}
            <section className="space-y-3 md:space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 bg-launchlayer-mint/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-launchlayer-mint">6</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-launchlayer-text-primary">Team & Strategic Partnerships</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-launchlayer-background p-3 md:p-4 rounded-lg">
                  <h4 className="font-bold text-launchlayer-accent mb-3 flex items-center space-x-2 text-sm md:text-base">
                    <Users className="w-4 md:w-5 h-4 md:h-5" />
                    <span>Core Team:</span>
                  </h4>
                  <ul className="space-y-2 text-xs md:text-sm text-launchlayer-text-secondary">
                    <li><strong className="text-launchlayer-text-primary">Andy:</strong> Co-Founder (Product & Strategy Lead)</li>
                    <li><strong className="text-launchlayer-text-primary">Stable:</strong> Co-Founder (Technical Architecture & Operations)</li>
                    <li><strong className="text-launchlayer-text-primary">Jitin (via Infrasingularity):</strong> Tech Lead, Validator & Yield Generation Specialist</li>
                  </ul>
                </div>
                <div className="bg-launchlayer-background p-3 md:p-4 rounded-lg">
                  <h4 className="font-bold text-launchlayer-mint mb-3 flex items-center space-x-2 text-sm md:text-base">
                    <Shield className="w-4 md:w-5 h-4 md:h-5" />
                    <span>Key Strategic Partners:</span>
                  </h4>
                  <ul className="space-y-2 text-xs md:text-sm text-launchlayer-text-secondary">
                    <li><strong className="text-launchlayer-text-primary">Hype Marketing:</strong> GTM & Community Engagement</li>
                    <li><strong className="text-launchlayer-text-primary">Nakamoto Labs/Eli Bernstein:</strong> Legal and Compliance Counsel</li>
                    <li><strong className="text-launchlayer-text-primary">Airfoil Studios:</strong> Front-end UX/UI and Design Cohesion</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Conclusion */}
            <section className="space-y-3 md:space-y-4">
              <div className="flex items-center space-x-2 mb-3">
                <div className="w-8 h-8 bg-launchlayer-accent/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold text-launchlayer-accent">7</span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-launchlayer-text-primary">Conclusion & Investment Thesis</h3>
              </div>
              <div className="bg-launchlayer-surface p-4 md:p-6 rounded-lg border border-launchlayer-accent/30">
                <p className="text-sm md:text-base text-launchlayer-text-secondary leading-relaxed mb-3 md:mb-4">
                  Launch Layer provides an essential, defensible infrastructure solution for a large and growing Web3 launch market. Through automated yield generation, curated token allocation, and integrated liquidity solutions, Launch Layer delivers clear, recurring protocol revenue streams. Its modular, upgradeable infrastructure is scalable across multiple chains, positioning it to become the de facto standard for Web3 launches.
                </p>
                <div className="bg-launchlayer-background p-3 md:p-4 rounded-lg border-l-4 border-l-launchlayer-accent">
                  <h4 className="font-bold text-launchlayer-accent mb-2 flex items-center space-x-2 text-sm md:text-base">
                    <Target className="w-4 h-4" />
                    <span>Investment Opportunity:</span>
                  </h4>
                  <p className="text-xs md:text-sm text-launchlayer-text-secondary">
                    Investing at this stage captures significant long-term upside from sustainable protocol revenues, capital-efficient scaling, and defensible ecosystem integration.
                  </p>
                </div>
              </div>
            </section>

            {/* Contact */}
            <section className="space-y-3 md:space-y-4 border-t border-launchlayer-surface-light pt-6 md:pt-8">
              <div className="text-center bg-launchlayer-surface p-4 md:p-6 rounded-lg">
                <h3 className="text-xl font-bold text-launchlayer-accent mb-3 md:mb-4 flex items-center justify-center space-x-2">
                  <Users className="w-4 md:w-5 h-4 md:h-5" />
                  <span>Contact for Deeper Technical Review</span>
                </h3>
                <div className="space-y-2 text-sm md:text-base text-launchlayer-text-secondary">
                  {/* Removed contact info as requested */}
                </div>
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-launchlayer-surface-light">
                  <p className="text-launchlayer-accent font-bold text-sm md:text-base">
                    <strong>Live MVP Demo:</strong> launchlayer.io/landing
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
    </div>
  );
};

export default WhitePaperPage;
