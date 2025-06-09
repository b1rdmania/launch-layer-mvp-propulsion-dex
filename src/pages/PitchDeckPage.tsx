
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Rocket, TrendingUp, Shield, Database, Repeat, Users, DollarSign, Target, Zap, Star, ArrowRight, BarChart3, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { Link } from "react-router-dom";

const PitchDeckPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Chart data
  const revenueProjection = [
    { month: 'Q1', revenue: 100, tvl: 5 },
    { month: 'Q2', revenue: 300, tvl: 15 },
    { month: 'Q3', revenue: 500, tvl: 25 },
    { month: 'Q4', revenue: 800, tvl: 40 },
    { month: 'Q1+1', revenue: 1200, tvl: 60 },
    { month: 'Q2+1', revenue: 1800, tvl: 85 }
  ];

  const marketData = [
    { name: 'Traditional Launchpads', value: 40, color: '#ef4444' },
    { name: 'Launch Layer Opportunity', value: 60, color: '#3277f5' }
  ];

  const slides = [
    {
      id: 1,
      title: "Cover Slide",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-8 md:space-y-12 relative px-4">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-20 w-24 h-24 md:w-32 md:h-32 bg-launchlayer-accent/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-32 h-32 md:w-40 md:h-40 bg-launchlayer-violet/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 right-1/3 w-20 h-20 md:w-24 md:h-24 bg-launchlayer-mint/10 rounded-full blur-2xl animate-pulse delay-2000"></div>
          </div>
          
          <div className="space-y-6 md:space-y-8 relative z-10">
            <div className="flex items-center justify-center space-x-2 md:space-x-4 mb-4">
              <Rocket className="w-8 h-8 md:w-12 md:h-12 text-launchlayer-accent" />
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet bg-clip-text text-transparent">
                Launch Layer
              </h1>
              <Rocket className="w-8 h-8 md:w-12 md:h-12 text-launchlayer-violet" />
            </div>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-launchlayer-text-primary flex items-center justify-center space-x-2 md:space-x-3">
              <Zap className="w-6 h-6 md:w-8 md:h-8 text-launchlayer-accent" />
              <span>Built for What's Next.</span>
              <Zap className="w-6 h-6 md:w-8 md:h-8 text-launchlayer-violet" />
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-launchlayer-text-secondary max-w-3xl mx-auto">
              Chain-agnostic yield, launch, and liquidity infrastructure.
            </p>
          </div>
          
          <div className="text-sm md:text-base text-launchlayer-text-secondary bg-launchlayer-surface/50 backdrop-blur-sm rounded-xl p-3 md:p-4 border border-launchlayer-surface-light">
            <p className="flex items-center justify-center space-x-2">
              <Users className="w-4 h-4" />
              <span>[Andy / andy@launchlayer.io / @birdman1a]</span>
            </p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "The Opportunity",
      content: (
        <div className="space-y-4 md:space-y-6 px-4">
          <div className="text-center">
            <span className="px-4 md:px-6 py-2 md:py-3 rounded-full bg-launchlayer-violet/10 text-launchlayer-violet text-base md:text-lg font-medium flex items-center justify-center space-x-2 w-fit mx-auto">
              <Target className="w-4 h-4 md:w-5 md:h-5" />
              <span>THE OPPORTUNITY</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Problem Section */}
            <div className="bg-launchlayer-surface rounded-xl border-2 border-red-400/30 p-4 md:p-6 space-y-3 md:space-y-4">
              <h3 className="text-lg md:text-2xl font-bold text-red-400 border-b border-launchlayer-surface-light pb-2 md:pb-3 flex items-center space-x-2">
                <Shield className="w-5 h-5 md:w-6 md:h-6" />
                <span>The Problem</span>
              </h3>
              <ul className="space-y-2 md:space-y-3 text-xs md:text-sm text-launchlayer-text-secondary">
                <li className="flex items-start space-x-2 md:space-x-3">
                  <span className="text-red-400 mt-1 text-base md:text-lg">🚫</span>
                  <div><strong className="text-launchlayer-text-primary">Users:</strong> Whitelist grind, capital risk, timing stress</div>
                </li>
                <li className="flex items-start space-x-2 md:space-x-3">
                  <span className="text-red-400 mt-1 text-base md:text-lg">⚠️</span>
                  <div><strong className="text-launchlayer-text-primary">Projects:</strong> Complex fundraising, vesting challenges</div>
                </li>
                <li className="flex items-start space-x-2 md:space-x-3">
                  <span className="text-red-400 mt-1 text-base md:text-lg">🔗</span>
                  <div><strong className="text-launchlayer-text-primary">Chains:</strong> Lack integrated solutions for sticky TVL</div>
                </li>
              </ul>
            </div>

            {/* Solution Section */}
            <div className="bg-launchlayer-surface rounded-xl border-2 border-launchlayer-mint/30 p-4 md:p-6 space-y-3 md:space-y-4">
              <h3 className="text-lg md:text-2xl font-bold text-launchlayer-mint border-b border-launchlayer-surface-light pb-2 md:pb-3 flex items-center space-x-2">
                <Rocket className="w-5 h-5 md:w-6 md:h-6" />
                <span>Our Solution</span>
              </h3>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start space-x-2 md:space-x-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-launchlayer-violet/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Database className="w-2.5 h-2.5 md:w-3 md:h-3 text-launchlayer-violet" />
                  </div>
                  <div>
                    <h4 className="font-bold text-launchlayer-violet text-xs md:text-sm">Airlocks (Yield Automation)</h4>
                    <p className="text-launchlayer-text-secondary text-xs">Automated yield-driven presale allocations</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2 md:space-x-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-launchlayer-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Rocket className="w-2.5 h-2.5 md:w-3 md:h-3 text-launchlayer-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-launchlayer-accent text-xs md:text-sm">Launch Layer (Premium Launchpad)</h4>
                    <p className="text-launchlayer-text-secondary text-xs">Institutional-grade launches via Magna</p>
                  </div>
                </div>
                <div className="flex items-start space-x-2 md:space-x-3">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-launchlayer-mint/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Repeat className="w-2.5 h-2.5 md:w-3 md:h-3 text-launchlayer-mint" />
                  </div>
                  <div>
                    <h4 className="font-bold text-launchlayer-mint text-xs md:text-sm">Propulsion Finance (Advanced DEX)</h4>
                    <p className="text-launchlayer-text-secondary text-xs">Deep liquidity via Algebra v4 AMM</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Chart */}
            <div className="bg-launchlayer-surface rounded-xl border border-launchlayer-surface-light p-4 md:p-6 space-y-3 md:space-y-4">
              <h3 className="text-lg md:text-xl font-bold text-launchlayer-accent border-b border-launchlayer-surface-light pb-2 md:pb-3 flex items-center space-x-2">
                <BarChart3 className="w-4 h-4 md:w-5 md:h-5" />
                <span>Market Opportunity</span>
              </h3>
              <div className="h-32 md:h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={marketData}
                      cx="50%"
                      cy="50%"
                      innerRadius={20}
                      outerRadius={50}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {marketData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center">
                <p className="text-xs text-launchlayer-text-secondary">
                  <span className="inline-block w-3 h-3 bg-launchlayer-accent rounded-full mr-2"></span>
                  Our addressable market
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "How it Works: The Airlock Mechanism",
      content: (
        <div className="space-y-4 md:space-y-6 px-4">
          <div className="text-center space-y-2 md:space-y-3">
            <span className="px-4 md:px-6 py-2 md:py-3 rounded-full bg-launchlayer-accent/10 text-launchlayer-accent text-base md:text-lg font-medium flex items-center justify-center space-x-2 w-fit mx-auto">
              <Zap className="w-4 h-4 md:w-5 md:h-5" />
              <span>THE AIRLOCK MECHANISM</span>
            </span>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Seamless automation—from staking to allocation</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="text-center space-y-3 md:space-y-4 p-4 md:p-6 bg-launchlayer-surface rounded-xl border-2 border-launchlayer-violet/30 relative">
              <div className="absolute top-2 md:top-3 left-2 md:left-3 w-6 h-6 md:w-8 md:h-8 bg-launchlayer-violet rounded-full flex items-center justify-center">
                <span className="text-sm md:text-lg font-bold text-white">1</span>
              </div>
              <div className="pt-2 md:pt-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-launchlayer-violet/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Database className="w-6 h-6 md:w-8 md:h-8 text-launchlayer-violet" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-launchlayer-violet mb-2 md:mb-3">Stake</h3>
                <p className="text-xs md:text-sm text-launchlayer-text-secondary leading-relaxed">
                  Users deposit assets into Airlocks. Principal always liquid (withdraw anytime).
                </p>
              </div>
              {/* Arrow to next step - hidden on mobile */}
              <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-launchlayer-accent" />
              </div>
            </div>

            <div className="text-center space-y-3 md:space-y-4 p-4 md:p-6 bg-launchlayer-surface rounded-xl border-2 border-launchlayer-mint/30 relative">
              <div className="absolute top-2 md:top-3 left-2 md:left-3 w-6 h-6 md:w-8 md:h-8 bg-launchlayer-mint rounded-full flex items-center justify-center">
                <span className="text-sm md:text-lg font-bold text-white">2</span>
              </div>
              <div className="pt-2 md:pt-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-launchlayer-mint/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-launchlayer-mint" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-launchlayer-mint mb-2 md:mb-3">Earn Yield + Boost</h3>
                <p className="text-xs md:text-sm text-launchlayer-text-secondary leading-relaxed">
                  Generate validator yield (10-15% APY) plus project-funded bonus rewards.
                </p>
              </div>
              {/* Arrow to next step - hidden on mobile */}
              <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-launchlayer-mint" />
              </div>
            </div>

            <div className="text-center space-y-3 md:space-y-4 p-4 md:p-6 bg-launchlayer-surface rounded-xl border-2 border-launchlayer-accent/30 relative">
              <div className="absolute top-2 md:top-3 left-2 md:left-3 w-6 h-6 md:w-8 md:h-8 bg-launchlayer-accent rounded-full flex items-center justify-center">
                <span className="text-sm md:text-lg font-bold text-white">3</span>
              </div>
              <div className="pt-2 md:pt-4">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-launchlayer-accent/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Rocket className="w-6 h-6 md:w-8 md:h-8 text-launchlayer-accent" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-launchlayer-accent mb-2 md:mb-3">Automated Allocation</h3>
                <p className="text-xs md:text-sm text-launchlayer-text-secondary leading-relaxed">
                  Yield auto-mints guaranteed presale allocations. Zero whitelist grind.
                </p>
              </div>
            </div>
          </div>

          {/* Visual flow indicator */}
          <div className="flex justify-center items-center space-x-3 md:space-x-4 pt-3 md:pt-4">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-launchlayer-violet rounded-full animate-pulse"></div>
            <div className="w-6 h-0.5 md:w-8 md:h-0.5 bg-gradient-to-r from-launchlayer-violet to-launchlayer-mint"></div>
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-launchlayer-mint rounded-full animate-pulse delay-500"></div>
            <div className="w-6 h-0.5 md:w-8 md:h-0.5 bg-gradient-to-r from-launchlayer-mint to-launchlayer-accent"></div>
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-launchlayer-accent rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "The Integrated Flywheel",
      content: (
        <div className="space-y-3 md:space-y-4 px-4">
          <div className="text-center space-y-2 md:space-y-3">
            <span className="px-4 md:px-6 py-2 md:py-3 rounded-full bg-launchlayer-mint/10 text-launchlayer-mint text-base md:text-lg font-medium flex items-center justify-center space-x-2 w-fit mx-auto">
              <Repeat className="w-4 h-4 md:w-5 md:h-5" />
              <span>THE INTEGRATED FLYWHEEL</span>
            </span>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">Three standalone pillars forming a continuous loop</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
            <div className="bg-launchlayer-surface p-3 md:p-4 rounded-xl border-t-4 border-t-launchlayer-violet space-y-2 relative overflow-hidden">
              <div className="absolute top-2 right-2">
                <Database className="w-6 h-6 md:w-8 md:h-8 text-launchlayer-violet/30" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-launchlayer-violet border-b border-launchlayer-surface-light pb-2 flex items-center space-x-2">
                <Database className="w-4 h-4 md:w-5 md:h-5" />
                <span>Airlocks (Yield Engine)</span>
              </h3>
              <ul className="space-y-1 text-xs md:text-sm text-launchlayer-text-secondary">
                <li className="flex items-start space-x-2">
                  <span className="text-launchlayer-violet mt-1 text-xs">💧</span>
                  <span>Liquid staking (principal unlocked)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-launchlayer-violet mt-1 text-xs">📈</span>
                  <span>High-yield validator APY</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-launchlayer-violet mt-1 text-xs">🎯</span>
                  <span>Project-funded "Degen Pools"</span>
                </li>
              </ul>
            </div>

            <div className="bg-launchlayer-surface p-3 md:p-4 rounded-xl border-t-4 border-t-launchlayer-accent space-y-2 relative overflow-hidden">
              <div className="absolute top-2 right-2">
                <Rocket className="w-6 h-6 md:w-8 md:h-8 text-launchlayer-accent/30" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-launchlayer-accent border-b border-launchlayer-surface-light pb-2 flex items-center space-x-2">
                <Rocket className="w-4 h-4 md:w-5 md:h-5" />
                <span>Launch Layer (Premium Launchpad)</span>
              </h3>
              <ul className="space-y-1 text-xs md:text-sm text-launchlayer-text-secondary">
                <li className="flex items-start space-x-2">
                  <span className="text-launchlayer-accent mt-1 text-xs">🏛️</span>
                  <span>Magna-powered TGE rails ($3.5B+ distributed)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-launchlayer-accent mt-1 text-xs">🛤️</span>
                  <span>Curated and permissionless launch lanes</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-launchlayer-accent mt-1 text-xs">🌐</span>
                  <span>Cross-chain token delivery</span>
                </li>
              </ul>
            </div>

            <div className="bg-launchlayer-surface p-3 md:p-4 rounded-xl border-t-4 border-t-launchlayer-mint space-y-2 relative overflow-hidden">
              <div className="absolute top-2 right-2">
                <Repeat className="w-6 h-6 md:w-8 md:h-8 text-launchlayer-mint/30" />
              </div>
              <h3 className="text-base md:text-lg font-bold text-launchlayer-mint border-b border-launchlayer-surface-light pb-2 flex items-center space-x-2">
                <Repeat className="w-4 h-4 md:w-5 md:h-5" />
                <span>Propulsion Finance (DEX)</span>
              </h3>
              <ul className="space-y-1 text-xs md:text-sm text-launchlayer-text-secondary">
                <li className="flex items-start space-x-2">
                  <span className="text-launchlayer-mint mt-1 text-xs">🔬</span>
                  <span>Algebra v4 concentrated liquidity AMM</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-launchlayer-mint mt-1 text-xs">⬆️</span>
                  <span>Upgrade path: Uniswap v4 hooks</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-launchlayer-mint mt-1 text-xs">⚡</span>
                  <span>MEV capture via order-flow auctions</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center bg-launchlayer-surface p-2 md:p-3 rounded-xl border border-launchlayer-accent/30">
            <p className="text-sm md:text-base font-bold text-launchlayer-accent flex items-center justify-center space-x-2">
              <Shield className="w-4 h-4 md:w-5 md:h-5" />
              <span><strong>Moat:</strong> Our integrated flywheel compounds users, liquidity, and TVL—generating defensible, recurring protocol revenue.</span>
            </p>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Traction, GTM, Revenue",
      content: (
        <div className="space-y-3 md:space-y-4 px-4">
          <div className="text-center">
            <span className="px-4 md:px-6 py-2 md:py-3 rounded-full bg-launchlayer-accent/10 text-launchlayer-accent text-base md:text-lg font-medium flex items-center justify-center space-x-2 w-fit mx-auto">
              <TrendingUp className="w-4 h-4 md:w-5 md:h-5" />
              <span>TRACTION & REVENUE</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-launchlayer-surface rounded-xl border border-launchlayer-surface-light p-3 md:p-4 space-y-2 md:space-y-3">
              <h3 className="text-lg md:text-xl font-bold text-launchlayer-accent border-b border-launchlayer-surface-light pb-2 flex items-center space-x-2">
                <Rocket className="w-4 h-4 md:w-5 md:h-5" />
                <span>Traction Today</span>
              </h3>
              <div className="space-y-2">
                <div className="flex items-start space-x-2 md:space-x-3 p-2 bg-launchlayer-background rounded-lg">
                  <Shield className="text-green-400 mt-1 flex-shrink-0" size={12} />
                  <div className="text-xs">
                    <strong className="text-launchlayer-text-primary">MVP Deployed:</strong>
                    <span className="text-launchlayer-text-secondary ml-1">Core contracts on Sepolia testnet, dashboard testing complete</span>
                  </div>
                </div>
                <div className="flex items-start space-x-2 md:space-x-3 p-2 bg-launchlayer-background rounded-lg">
                  <Shield className="text-green-400 mt-1 flex-shrink-0" size={12} />
                  <div className="text-xs">
                    <strong className="text-launchlayer-text-primary">Team Proven:</strong>
                    <span className="text-launchlayer-text-secondary ml-1">Experienced yield-generation & validator ops</span>
                  </div>
                </div>
                <div className="flex items-start space-x-2 md:space-x-3 p-2 bg-launchlayer-background rounded-lg">
                  <Shield className="text-green-400 mt-1 flex-shrink-0" size={12} />
                  <div className="text-xs">
                    <strong className="text-launchlayer-text-primary">Ecosystem Partnerships:</strong>
                    <span className="text-launchlayer-text-secondary ml-1">Strategic integrations and GTM discussions</span>
                  </div>
                </div>
              </div>

              <div className="p-2 bg-launchlayer-violet/10 rounded-lg border border-launchlayer-violet/30">
                <h4 className="font-bold text-launchlayer-violet mb-1 text-xs flex items-center space-x-1">
                  <Target className="w-3 h-3" />
                  <span>Initial Target Chains:</span>
                </h4>
                <p className="text-launchlayer-text-secondary text-xs">Base, Hype, MegaETH, Sonic</p>
              </div>
            </div>

            <div className="space-y-2 md:space-y-3">
              <div className="bg-launchlayer-surface rounded-xl border border-launchlayer-surface-light p-3 md:p-4 space-y-2 md:space-y-3">
                <h3 className="text-lg md:text-xl font-bold text-launchlayer-mint border-b border-launchlayer-surface-light pb-2 flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 md:w-5 md:h-5" />
                  <span>Revenue Model</span>
                </h3>
                <p className="text-xs text-launchlayer-text-secondary mb-2">Protocol captures fees from:</p>
                <ul className="space-y-1 text-xs text-launchlayer-text-secondary">
                  <li className="flex items-start space-x-2">
                    <span className="text-launchlayer-mint mt-1 text-xs">💼</span>
                    <span>Project Raises (~5% platform fee)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-launchlayer-mint mt-1 text-xs">⚡</span>
                    <span>User Yield (~10% of generated yield)</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-launchlayer-mint mt-1 text-xs">🔄</span>
                    <span>AMM Trading Fees (protocol share)</span>
                  </li>
                </ul>

                <div className="bg-launchlayer-accent/10 p-2 md:p-3 rounded-xl border border-launchlayer-accent/30">
                  <h4 className="font-bold text-launchlayer-accent mb-1 text-xs flex items-center space-x-1">
                    <Star className="w-3 h-3" />
                    <span>Example:</span>
                  </h4>
                  <p className="text-launchlayer-text-secondary text-xs">
                    A single $5M Airlock fueling four $2M TGEs = ~$500K protocol revenue per cycle.
                  </p>
                </div>
              </div>

              {/* Revenue Chart */}
              <div className="bg-launchlayer-surface rounded-xl border border-launchlayer-surface-light p-3 md:p-4">
                <h4 className="font-bold text-launchlayer-accent mb-2 text-sm flex items-center space-x-2">
                  <BarChart3 className="w-3 h-3 md:w-4 md:h-4" />
                  <span>Revenue Projection (K)</span>
                </h4>
                <div className="h-24 md:h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueProjection}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis dataKey="month" fontSize={8} />
                      <YAxis fontSize={8} />
                      <Tooltip />
                      <Bar dataKey="revenue" fill="#3277f5" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Battle-Tested Team & Strategic Partners",
      content: (
        <div className="space-y-4 md:space-y-6 px-4">
          <div className="text-center">
            <span className="px-4 md:px-6 py-2 md:py-3 rounded-full bg-launchlayer-violet/10 text-launchlayer-violet text-base md:text-lg font-medium flex items-center justify-center space-x-2 w-fit mx-auto">
              <Users className="w-4 h-4 md:w-5 md:h-5" />
              <span>TEAM & PARTNERS</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-launchlayer-surface rounded-xl border border-launchlayer-surface-light p-4 md:p-6 space-y-4 md:space-y-5">
              <h3 className="text-xl md:text-2xl font-bold text-launchlayer-accent border-b border-launchlayer-surface-light pb-2 md:pb-3 flex items-center space-x-2">
                <Users className="w-5 h-5 md:w-6 md:h-6" />
                <span>Core Team</span>
              </h3>
              <div className="space-y-2 md:space-y-3">
                <div className="bg-launchlayer-background p-3 md:p-4 rounded-xl border-l-4 border-l-launchlayer-violet relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <Star className="w-5 h-5 md:w-6 md:h-6 text-launchlayer-violet/20" />
                  </div>
                  <h4 className="font-bold text-launchlayer-violet text-base md:text-lg flex items-center space-x-2">
                    <span>🚀</span>
                    <span>Andy (Co-Founder)</span>
                  </h4>
                  <p className="text-launchlayer-text-secondary text-sm">Product & Strategy</p>
                </div>
                <div className="bg-launchlayer-background p-3 md:p-4 rounded-xl border-l-4 border-l-launchlayer-accent relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <Star className="w-5 h-5 md:w-6 md:h-6 text-launchlayer-accent/20" />
                  </div>
                  <h4 className="font-bold text-launchlayer-accent text-base md:text-lg flex items-center space-x-2">
                    <span>🤝</span>
                    <span>Stable (Co-Founder)</span>
                  </h4>
                  <p className="text-launchlayer-text-secondary text-sm">Business Development & Partnerships</p>
                </div>
                <div className="bg-launchlayer-background p-3 md:p-4 rounded-xl border-l-4 border-l-launchlayer-mint relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <Star className="w-5 h-5 md:w-6 md:h-6 text-launchlayer-mint/20" />
                  </div>
                  <h4 className="font-bold text-launchlayer-mint text-base md:text-lg flex items-center space-x-2">
                    <span>⚡</span>
                    <span>Jitin (Tech Lead)</span>
                  </h4>
                  <p className="text-launchlayer-text-secondary text-sm">Yield-generation & validator ops (via Infrasingularity)</p>
                </div>
              </div>
            </div>

            <div className="bg-launchlayer-surface rounded-xl border border-launchlayer-surface-light p-4 md:p-6 space-y-4 md:space-y-5">
              <h3 className="text-xl md:text-2xl font-bold text-launchlayer-mint border-b border-launchlayer-surface-light pb-2 md:pb-3 flex items-center space-x-2">
                <Shield className="w-5 h-5 md:w-6 md:h-6" />
                <span>Strategic Partners</span>
              </h3>
              <div className="space-y-2 md:space-y-3">
                <div className="bg-launchlayer-background p-3 md:p-4 rounded-xl border-l-4 border-l-launchlayer-violet relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-launchlayer-violet/20" />
                  </div>
                  <h4 className="font-bold text-launchlayer-violet text-base md:text-lg flex items-center space-x-2">
                    <span>📈</span>
                    <span>Hype Marketing Agency</span>
                  </h4>
                  <p className="text-launchlayer-text-secondary text-sm">GTM & community</p>
                </div>
                <div className="bg-launchlayer-background p-3 md:p-4 rounded-xl border-l-4 border-l-launchlayer-accent relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <Shield className="w-5 h-5 md:w-6 md:h-6 text-launchlayer-accent/20" />
                  </div>
                  <h4 className="font-bold text-launchlayer-accent text-base md:text-lg flex items-center space-x-2">
                    <span>⚖️</span>
                    <span>Nakamoto Labs / Eli Bernstein</span>
                  </h4>
                  <p className="text-launchlayer-text-secondary text-sm">Legal counsel</p>
                </div>
                <div className="bg-launchlayer-background p-3 md:p-4 rounded-xl border-l-4 border-l-launchlayer-mint relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <Zap className="w-5 h-5 md:w-6 md:h-6 text-launchlayer-mint/20" />
                  </div>
                  <h4 className="font-bold text-launchlayer-mint text-base md:text-lg flex items-center space-x-2">
                    <span>🎨</span>
                    <span>Airfoil Studios</span>
                  </h4>
                  <p className="text-launchlayer-text-secondary text-sm">Front-end coherence</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: "Vision & Contact",
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-6 md:space-y-8 px-4">
          <div className="space-y-4 md:space-y-6">
            <span className="px-4 md:px-6 py-2 md:py-3 rounded-full bg-launchlayer-accent/10 text-launchlayer-accent text-base md:text-lg font-medium flex items-center justify-center space-x-2 w-fit mx-auto">
              <Target className="w-4 h-4 md:w-5 md:h-5" />
              <span>OUR VISION</span>
            </span>
            
            <div className="max-w-4xl mx-auto space-y-4 md:space-y-6">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-launchlayer-text-primary leading-tight flex items-center justify-center space-x-3">
                <Rocket className="w-6 h-6 md:w-8 md:h-8 text-launchlayer-accent" />
                <span>Launch Layer is building the dominant Web3 launch infrastructure</span>
              </h2>
              
              <p className="text-base md:text-lg text-launchlayer-text-secondary leading-relaxed">
                Capturing sustainable revenue across every stage of token launches—staking, presale allocations, and liquidity provisioning.
              </p>
              
              <p className="text-base md:text-lg text-launchlayer-text-secondary leading-relaxed">
                We're engineering a defensible protocol that delivers predictable returns by owning:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 max-w-3xl mx-auto">
                <div className="bg-launchlayer-surface p-3 md:p-4 rounded-xl border-l-4 border-l-launchlayer-violet relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <Database className="w-5 h-5 md:w-6 md:h-6 text-launchlayer-violet/20" />
                  </div>
                  <h3 className="font-bold text-launchlayer-violet text-xs md:text-sm mb-1 flex items-center space-x-1">
                    <Database className="w-3 h-3 md:w-4 md:h-4" />
                    <span>Automated Yield-to-Presale</span>
                  </h3>
                  <p className="text-launchlayer-text-secondary text-xs">Allocation</p>
                </div>
                <div className="bg-launchlayer-surface p-3 md:p-4 rounded-xl border-l-4 border-l-launchlayer-accent relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <Rocket className="w-5 h-5 md:w-6 md:h-6 text-launchlayer-accent/20" />
                  </div>
                  <h3 className="font-bold text-launchlayer-accent text-xs md:text-sm mb-1 flex items-center space-x-1">
                    <Rocket className="w-3 h-3 md:w-4 md:h-4" />
                    <span>Institutional-Grade Launch</span>
                  </h3>
                  <p className="text-launchlayer-text-secondary text-xs">Infrastructure</p>
                </div>
                <div className="bg-launchlayer-surface p-3 md:p-4 rounded-xl border-l-4 border-l-launchlayer-mint relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <Repeat className="w-5 h-5 md:w-6 md:h-6 text-launchlayer-mint/20" />
                  </div>
                  <h3 className="font-bold text-launchlayer-mint text-xs md:text-sm mb-1 flex items-center space-x-1">
                    <Repeat className="w-3 h-3 md:w-4 md:h-4" />
                    <span>Deep Liquidity Flywheel</span>
                  </h3>
                  <p className="text-launchlayer-text-secondary text-xs">(DEX)</p>
                </div>
              </div>
              
              <p className="text-base md:text-lg font-bold text-launchlayer-accent flex items-center justify-center space-x-2">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
                <span>A high-margin, scalable model designed for market leadership.</span>
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl">
            <div className="space-y-3 md:space-y-4 bg-launchlayer-surface p-4 md:p-6 rounded-xl border border-launchlayer-surface-light relative overflow-hidden">
              <div className="absolute top-2 right-2">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-launchlayer-violet/20" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-launchlayer-violet flex items-center space-x-2">
                <Users className="w-5 h-5 md:w-6 md:h-6" />
                <span>Contact</span>
              </h3>
              <div className="text-launchlayer-text-secondary space-y-1 text-base md:text-lg">
                <p className="flex items-center space-x-2">
                  <Rocket className="w-4 h-4" />
                  <strong className="text-launchlayer-text-primary">Andy</strong>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="w-4 h-4 text-center">@</span>
                  <strong className="text-launchlayer-text-primary">andy@launchlayer.io</strong>
                </p>
                <p className="flex items-center space-x-2">
                  <span className="w-4 h-4 text-center">T</span>
                  <strong className="text-launchlayer-text-primary">@birdman1a</strong>
                </p>
              </div>
              <div className="pt-3 border-t border-launchlayer-surface-light">
                <p className="text-sm md:text-base text-launchlayer-accent font-bold flex items-center space-x-2">
                  <Rocket className="w-4 h-4 md:w-5 md:h-5" />
                  <span><strong>MVP Demo:</strong> <span className="text-launchlayer-accent">launchlayer.io/landing</span></span>
                </p>
              </div>
            </div>

            <div className="space-y-3 md:space-y-4 bg-launchlayer-surface p-4 md:p-6 rounded-xl border border-launchlayer-surface-light relative overflow-hidden">
              <div className="absolute top-2 right-2">
                <FileText className="w-6 h-6 md:w-8 md:h-8 text-launchlayer-mint/20" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-launchlayer-mint flex items-center space-x-2">
                <FileText className="w-5 h-5 md:w-6 md:h-6" />
                <span>Resources</span>
              </h3>
              <div className="space-y-2 md:space-y-3">
                <Link to="/whitepaper">
                  <Button
                    variant="outline"
                    className="w-full justify-start space-x-2 border-launchlayer-mint/30 hover:bg-launchlayer-mint/10"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Technical White Paper</span>
                  </Button>
                </Link>
                <p className="text-xs text-launchlayer-text-secondary">
                  Comprehensive technical documentation and architecture overview for investors and technical reviewers.
                </p>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="min-h-screen bg-launchlayer-background text-launchlayer-text-primary">
      {/* Main Content - Removed header */}
      <main className="container mx-auto p-4 md:p-6 min-h-screen flex flex-col">
        {/* Slide Content */}
        <div className="flex-1 bg-launchlayer-surface rounded-xl border border-launchlayer-surface-light p-4 md:p-8 mb-4 md:mb-6 overflow-y-auto">
          <div className="h-full">
            {slides[currentSlide].content}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-1 md:py-2 h-auto text-xs md:text-sm"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          {/* Slide Indicators */}
          <div className="flex space-x-1 md:space-x-2 overflow-x-auto no-scrollbar py-1">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                  index === currentSlide 
                    ? 'bg-launchlayer-accent' 
                    : 'bg-launchlayer-surface-light hover:bg-launchlayer-text-secondary'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-1 md:py-2 h-auto text-xs md:text-sm"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </Button>
        </div>
      </main>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default PitchDeckPage;
