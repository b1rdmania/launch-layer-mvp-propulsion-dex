import React, { useState } from "react";
import { ArrowLeft, Wallet, ExternalLink, Plus, Minus, AlertTriangle, ArrowRight, Shield, TrendingUp, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const BetaUXPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'dashboard' | 'chain' | 'personal' | 'airlocks'>('dashboard');
  const [selectedChain, setSelectedChain] = useState<string>('');
  const [showStakingModal, setShowStakingModal] = useState(false);
  const [selectedPool, setSelectedPool] = useState<any>(null);
  const [stakeAmount, setStakeAmount] = useState('');

  const chains = [
    { name: 'Base', logo: '🔵', tvl: '$4,100,000', pools: 3 },
    { name: 'HyperEVM', logo: '⚡', tvl: '$5,200,000', pools: 3 },
    { name: 'MegaETH', logo: '🚀', tvl: '$2,200,000', pools: 3 },
    { name: 'Monad', logo: '🔮', tvl: '$1,250,000', pools: 3 }
  ];

  const pools = {
    'Base': [
      {
        name: 'Core Yield ETH',
        strategy: 'Core Yield (Proprietary)',
        asset: 'ETH',
        apy: '16.8%',
        tvl: '$2,200,000',
        description: 'Our unique alpha strategy powered by Infrasingularity\'s validator and early-network operations.',
        risk: 'medium'
      },
      {
        name: 'Blue-Chip ETH',
        strategy: 'Blue-Chip Stable',
        asset: 'ETH',
        apy: '9.5%',
        tvl: '$1,500,000',
        description: 'A trusted strategy earning yield from top-tier protocols, powered by Beefy Finance.',
        risk: 'low'
      },
      {
        name: 'Degen Leverage ETH',
        strategy: 'Leveraged Yield',
        asset: 'ETH',
        apy: '45.2%',
        tvl: '$400,000',
        description: 'High-risk leveraged DeFi strategy using recursive lending and exotic derivatives. Only for experienced users.',
        risk: 'high'
      }
    ],
    'HyperEVM': [
      {
        name: 'Core Yield ETH',
        strategy: 'Core Yield (Proprietary)',
        asset: 'ETH',
        apy: '18.5%',
        tvl: '$3,000,000',
        description: 'Our unique alpha strategy powered by Infrasingularity\'s validator and early-network operations.',
        risk: 'medium'
      },
      {
        name: 'Blue-Chip ETH',
        strategy: 'Blue-Chip Stable',
        asset: 'ETH',
        apy: '11.2%',
        tvl: '$2,200,000',
        description: 'A trusted strategy earning yield from top-tier protocols, powered by Beefy Finance.',
        risk: 'low'
      },
      {
        name: 'Degen Perp ETH',
        strategy: 'Perpetuals Trading',
        asset: 'ETH',
        apy: '67.8%',
        tvl: '$250,000',
        description: 'Automated perpetual futures trading strategy. Extremely volatile returns with high liquidation risk.',
        risk: 'high'
      }
    ],
    'MegaETH': [
      {
        name: 'Core Yield ETH',
        strategy: 'Core Yield (Proprietary)',
        asset: 'ETH',
        apy: '22.1%',
        tvl: '$1,800,000',
        description: 'Our unique alpha strategy powered by Infrasingularity\'s validator and early-network operations.',
        risk: 'medium'
      },
      {
        name: 'Blue-Chip ETH',
        strategy: 'Blue-Chip Stable',
        asset: 'ETH',
        apy: '12.8%',
        tvl: '$1,100,000',
        description: 'A trusted strategy earning yield from top-tier protocols, powered by Beefy Finance.',
        risk: 'low'
      },
      {
        name: 'Degen Liquid Staking',
        strategy: 'Exotic LST Strategy',
        asset: 'ETH',
        apy: '38.9%',
        tvl: '$300,000',
        description: 'Complex liquid staking derivatives with MEV extraction. High smart contract and slashing risks.',
        risk: 'high'
      }
    ],
    'Monad': [
      {
        name: 'Core Yield ETH',
        strategy: 'Core Yield (Proprietary)',
        asset: 'ETH',
        apy: '19.7%',
        tvl: '$800,000',
        description: 'Our unique alpha strategy powered by Infrasingularity\'s validator and early-network operations.',
        risk: 'medium'
      },
      {
        name: 'Blue-Chip ETH',
        strategy: 'Blue-Chip Stable',
        asset: 'ETH',
        apy: '10.5%',
        tvl: '$350,000',
        description: 'A trusted strategy earning yield from top-tier protocols, powered by Beefy Finance.',
        risk: 'low'
      },
      {
        name: 'Degen Options ETH',
        strategy: 'Options Strategies',
        asset: 'ETH',
        apy: '52.3%',
        tvl: '$100,000',
        description: 'Automated options selling and complex derivatives strategies. High risk of total loss.',
        risk: 'high'
      }
    ]
  };

  const mockProjects = {
    'Base': [
      {
        name: 'BaseSwap Pro',
        category: 'DeFi',
        logo: '💧',
        description: 'Next-gen AMM with concentrated liquidity and MEV protection',
        tgeDate: 'July 22, 2025',
        totalRaise: '$2.5M',
        status: 'upcoming'
      },
      {
        name: 'ChainForge AI',
        category: 'AI',
        logo: '🤖',
        description: 'On-chain AI model training and inference protocol',
        tgeDate: 'August 15, 2025',
        totalRaise: '$4.2M',
        status: 'upcoming'
      },
      {
        name: 'PixelRealms',
        category: 'Gaming',
        logo: '🎮',
        description: 'Fully on-chain strategy game with NFT armies',
        tgeDate: 'September 3, 2025',
        totalRaise: '$1.8M',
        status: 'upcoming'
      },
      {
        name: 'BaseBridge',
        category: 'Infrastructure',
        logo: '🌉',
        description: 'Cross-chain messaging protocol for Base ecosystem',
        tgeDate: 'October 1, 2025',
        totalRaise: '$3.1M',
        status: 'upcoming'
      }
    ],
    'HyperEVM': [
      {
        name: 'HyperLend',
        category: 'DeFi',
        logo: '⚡',
        description: 'Ultra-fast lending protocol with instant liquidations',
        tgeDate: 'July 28, 2025',
        totalRaise: '$3.5M',
        status: 'upcoming'
      },
      {
        name: 'Neural Network',
        category: 'AI',
        logo: '🧠',
        description: 'Decentralized GPU compute network for AI workloads',
        tgeDate: 'August 20, 2025',
        totalRaise: '$6.8M',
        status: 'upcoming'
      },
      {
        name: 'CyberArena',
        category: 'Gaming',
        logo: '⚔️',
        description: 'Real-time PvP battles with tokenized esports',
        tgeDate: 'September 12, 2025',
        totalRaise: '$2.9M',
        status: 'upcoming'
      },
      {
        name: 'HyperOracle',
        category: 'Infrastructure',
        logo: '🔮',
        description: 'High-frequency oracle network with sub-second updates',
        tgeDate: 'October 8, 2025',
        totalRaise: '$4.7M',
        status: 'upcoming'
      }
    ],
    'MegaETH': [
      {
        name: 'MegaVault',
        category: 'DeFi',
        logo: '🏦',
        description: 'Automated yield strategies with AI-powered rebalancing',
        tgeDate: 'August 5, 2025',
        totalRaise: '$5.2M',
        status: 'upcoming'
      },
      {
        name: 'DeepMind Protocol',
        category: 'AI',
        logo: '🎯',
        description: 'Distributed AI agent marketplace and orchestration',
        tgeDate: 'August 25, 2025',
        totalRaise: '$8.1M',
        status: 'upcoming'
      },
      {
        name: 'SpaceExplorers',
        category: 'Gaming',
        logo: '🚀',
        description: 'MMO space exploration game with player-owned galaxies',
        tgeDate: 'September 18, 2025',
        totalRaise: '$3.6M',
        status: 'upcoming'
      },
      {
        name: 'MegaScale',
        category: 'Infrastructure',
        logo: '📈',
        description: 'Dynamic scaling solution for high-throughput dApps',
        tgeDate: 'October 15, 2025',
        totalRaise: '$7.3M',
        status: 'upcoming'
      }
    ],
    'Monad': [
      {
        name: 'MonadFi',
        category: 'DeFi',
        logo: '🌀',
        description: 'Native DeFi protocol leveraging Monad\'s parallel execution',
        tgeDate: 'July 30, 2025',
        totalRaise: '$4.8M',
        status: 'upcoming'
      },
      {
        name: 'Cognitive Labs',
        category: 'AI',
        logo: '🧪',
        description: 'On-chain machine learning model marketplace',
        tgeDate: 'August 12, 2025',
        totalRaise: '$5.5M',
        status: 'upcoming'
      },
      {
        name: 'MonadQuest',
        category: 'Gaming',
        logo: '🗡️',
        description: 'High-speed on-chain RPG with parallel quest execution',
        tgeDate: 'September 8, 2025',
        totalRaise: '$2.2M',
        status: 'upcoming'
      },
      {
        name: 'ParallelNode',
        category: 'Infrastructure',
        logo: '🔗',
        description: 'Validator infrastructure optimized for parallel chains',
        tgeDate: 'October 22, 2025',
        totalRaise: '$6.1M',
        status: 'upcoming'
      }
    ]
  };

  const userPositions = [
    {
      pool: 'Core Yield ETH (on HyperEVM)',
      staked: '$10,000.00',
      yield: '$150.75'
    },
    {
      pool: 'Blue-Chip USDC (on Base)',
      staked: '$5,500.00',
      yield: '$61.75'
    }
  ];

  const upcomingTGEs = [
    {
      name: 'Project Alpha',
      logo: '🌟',
      allocation: '$75.00',
      tgeDate: 'July 15, 2025'
    },
    {
      name: 'Beta Protocol',
      logo: '🔥',
      allocation: '$45.50',
      tgeDate: 'August 2, 2025'
    }
  ];

  const upcomingLaunches = [
    {
      name: "Neural Render Protocol",
      tagline: "Decentralized AI Rendering Protocol",
      tgeDate: "Q3 2025",
      logo: "🤖",
      status: "Allocation Open"
    },
    {
      name: "DeFi Insurance Nexus",
      tagline: "Cross-Chain Insurance Coverage",
      tgeDate: "Q4 2025",
      logo: "🛡️",
      status: "Allocation Open"
    },
    {
      name: "Quantum Finance",
      tagline: "Next-Gen Trading Infrastructure",
      tgeDate: "Q1 2026",
      logo: "⚡",
      status: "Coming Soon"
    },
    {
      name: "ZeroCarbon Chain",
      tagline: "Carbon-Negative Blockchain",
      tgeDate: "Q2 2026",
      logo: "🌱",
      status: "Coming Soon"
    }
  ];

  const chainsForAirlocks = [
    {
      name: "Base",
      color: "bg-blue-500",
      icon: "🔵",
      pools: "4 Active Pools",
      apy: "12.4% APY"
    },
    {
      name: "HyperEVM",
      color: "bg-purple-500",
      icon: "⚡",
      pools: "3 Active Pools",
      apy: "15.2% APY"
    },
    {
      name: "MegaETH",
      color: "bg-green-500",
      icon: "💎",
      pools: "5 Active Pools",
      apy: "11.8% APY"
    },
    {
      name: "Monad",
      color: "bg-orange-500",
      icon: "🚀",
      pools: "2 Active Pools",
      apy: "18.3% APY"
    }
  ];

  // New Airlocks Explainer View
  const AirlocksView = () => (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-launchlayer-accent via-launchlayer-violet to-launchlayer-mint bg-clip-text text-transparent">
              Turn Your Yield
            </span>
            <br />
            <span className="text-launchlayer-text-primary">Into Early Access</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-launchlayer-text-secondary mb-8 max-w-4xl mx-auto leading-relaxed">
            Airlocks are our unique yield-to-access system. Stake your assets, earn real yield from validator operations and blue-chip protocols, and automatically convert those earnings into guaranteed allocations in the most promising new projects.
          </p>
        </div>
        
        {/* Placeholder for Lottie Animation */}
        <div className="relative">
          <div className="w-full max-w-2xl mx-auto h-64 bg-gradient-to-br from-launchlayer-surface to-launchlayer-surface/50 rounded-2xl border border-launchlayer-surface-light flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🔄</div>
              <p className="text-launchlayer-text-secondary">The Flywheel: The Full Ecosystem Loop</p>
              <p className="text-sm text-launchlayer-text-secondary mt-2">(Lottie Animation Placeholder)</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 text-launchlayer-text-primary">
            Simple, Secure, Capital-Efficient
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-launchlayer-surface border-launchlayer-surface-light hover:border-launchlayer-accent/50 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-launchlayer-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-launchlayer-accent" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-launchlayer-text-primary">
                Stake & Stay Liquid
              </h3>
              <p className="text-launchlayer-text-secondary leading-relaxed">
                Deposit assets like ETH or USDC into our audited Airlocks. Your principal is never hard-locked and remains withdrawable.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-launchlayer-surface border-launchlayer-surface-light hover:border-launchlayer-accent/50 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-launchlayer-violet/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="text-launchlayer-violet" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-launchlayer-text-primary">
                Earn Real Yield
              </h3>
              <p className="text-launchlayer-text-secondary leading-relaxed">
                We generate sustainable yield for you through proprietary validator strategies and by integrating with trusted blue-chip protocols like Beefy Finance.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-launchlayer-surface border-launchlayer-surface-light hover:border-launchlayer-accent/50 transition-all duration-300">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-launchlayer-mint/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Key className="text-launchlayer-mint" size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-launchlayer-text-primary">
                Get Guaranteed Access
              </h3>
              <p className="text-launchlayer-text-secondary leading-relaxed">
                Your compounded yield is automatically converted into guaranteed presale allocations for our curated TGEs. No lotteries, no gas wars.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Upcoming Launches */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 text-launchlayer-text-primary">
            Allocations You Can Earn Now
          </h2>
        </div>
        
        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {upcomingLaunches.map((launch, index) => (
              <Card key={index} className="min-w-[300px] bg-launchlayer-surface border-launchlayer-surface-light hover:border-launchlayer-accent/50 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="text-3xl mr-3">{launch.logo}</div>
                    <div>
                      <h3 className="font-bold text-launchlayer-text-primary">{launch.name}</h3>
                      <p className="text-sm text-launchlayer-text-secondary">{launch.tagline}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-launchlayer-text-secondary">TGE Date:</span>
                      <span className="text-sm font-medium text-launchlayer-text-primary">{launch.tgeDate}</span>
                    </div>
                  </div>
                  
                  <Badge 
                    variant={launch.status === "Allocation Open" ? "default" : "secondary"}
                    className={launch.status === "Allocation Open" ? "bg-launchlayer-accent text-white" : ""}
                  >
                    {launch.status}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Choose Your Chain */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 text-launchlayer-text-primary">
            Choose Your Chain to Get Started
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {chainsForAirlocks.map((chain, index) => (
            <Card 
              key={index}
              className="bg-launchlayer-surface border-launchlayer-surface-light hover:border-launchlayer-accent/50 hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => {
                setSelectedChain(chain.name);
                setCurrentView('chain');
              }}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${chain.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <span className="text-2xl">{chain.icon}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-launchlayer-text-primary">
                  {chain.name}
                </h3>
                
                <div className="space-y-2 text-sm">
                  <p className="text-launchlayer-text-secondary">{chain.pools}</p>
                  <p className="text-launchlayer-accent font-medium">{chain.apy}</p>
                </div>
                
                <Button variant="outline" size="sm" className="mt-4 w-full">
                  Explore Pools
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );

  const DashboardView = () => (
    <div className="space-y-8">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 bg-launchlayer-surface rounded-lg border border-launchlayer-surface-light">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <img src="/lovable-uploads/c054fc20-c0d7-4c0c-9d55-8dc40e350c79.png" alt="Launch Layer" className="h-8 w-auto" />
            <span className="text-xl font-bold text-launchlayer-accent">Launch Layer</span>
          </div>
          <div className="hidden md:flex space-x-4 text-sm">
            <span className="text-launchlayer-accent font-medium">Dashboard</span>
            <span className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary cursor-pointer">Airlocks</span>
            <span className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary cursor-pointer">Launchpad</span>
            <span className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary cursor-pointer">Propulsion DEX</span>
            <span className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary cursor-pointer">My Account</span>
            <span 
              className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary cursor-pointer"
              onClick={() => navigate("/")}
            >
              White Paper
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Wallet className="w-4 h-4" />
          <span>0x1234...5678</span>
        </div>
      </nav>

      {/* High-Level Stats Banner */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-launchlayer-accent">$12,750,000</h3>
            <p className="text-launchlayer-text-secondary">Total Value Locked</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-launchlayer-violet">12</h3>
            <p className="text-launchlayer-text-secondary">Active Airlocks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-launchlayer-mint">16</h3>
            <p className="text-launchlayer-text-secondary">Upcoming Launches</p>
          </CardContent>
        </Card>
      </div>

      {/* Your Summary Section */}
      <Card>
        <CardHeader>
          <CardTitle>Your Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-launchlayer-text-secondary">Your Total Staked</p>
              <p className="text-2xl font-bold text-launchlayer-text-primary">$15,500</p>
            </div>
            <div>
              <p className="text-sm text-launchlayer-text-secondary">Your Accrued Yield (for TGEs)</p>
              <p className="text-2xl font-bold text-launchlayer-accent">$212.50</p>
            </div>
          </div>
          <Button onClick={() => setCurrentView('personal')} className="w-full">
            View My Airlocks
          </Button>
        </CardContent>
      </Card>

      {/* Airlock Chains Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Explore Airlocks</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {chains.map((chain) => (
            <Card key={chain.name} className="hover:border-launchlayer-accent transition-colors cursor-pointer">
              <CardContent className="p-6 text-center space-y-4">
                <div className="text-4xl">{chain.logo}</div>
                <h3 className="text-xl font-bold">{chain.name}</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-launchlayer-text-secondary">Chain TVL:</span> {chain.tvl}</p>
                  <p><span className="text-launchlayer-text-secondary">Available Pools:</span> {chain.pools}</p>
                </div>
                <Button 
                  onClick={() => {
                    setSelectedChain(chain.name);
                    setCurrentView('chain');
                  }}
                  className="w-full"
                >
                  Select Chain
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Upcoming Projects Preview */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Upcoming Project Launches</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(mockProjects).slice(0, 4).map(([chain, projects]) => (
            <Card key={chain}>
              <CardContent className="p-4">
                <h4 className="font-bold mb-2">{chain} Ecosystem</h4>
                <div className="space-y-2">
                  {projects.slice(0, 2).map((project, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm">
                      <span>{project.logo}</span>
                      <span className="truncate">{project.name}</span>
                    </div>
                  ))}
                  <p className="text-xs text-launchlayer-text-secondary">+{projects.length - 2} more projects</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const ChainView = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          onClick={() => setCurrentView('dashboard')}
          className="p-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-3xl font-bold">{selectedChain} Airlocks</h1>
      </div>

      {/* Chain-Specific Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-xl font-bold text-launchlayer-accent">
              {chains.find(c => c.name === selectedChain)?.tvl}
            </h3>
            <p className="text-sm text-launchlayer-text-secondary">TVL on {selectedChain}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-xl font-bold text-launchlayer-violet">
              {pools[selectedChain as keyof typeof pools]?.[1]?.apy} - {pools[selectedChain as keyof typeof pools]?.[2]?.apy}
            </h3>
            <p className="text-sm text-launchlayer-text-secondary">Current APY Range</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-xl font-bold text-launchlayer-mint">
              {pools[selectedChain as keyof typeof pools]?.length || 0}
            </h3>
            <p className="text-sm text-launchlayer-text-secondary">Available Pools</p>
          </CardContent>
        </Card>
      </div>

      {/* Available Pools */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Available Pools</h2>
        {pools[selectedChain as keyof typeof pools]?.map((pool, index) => (
          <Card key={index} className="hover:border-launchlayer-accent transition-colors">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-bold">{pool.name}</h3>
                    {pool.risk === 'high' && (
                      <Badge variant="destructive" className="bg-red-600 text-white flex items-center space-x-1">
                        <AlertTriangle className="w-3 h-3" />
                        <span>HIGH RISK</span>
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-launchlayer-text-secondary">{pool.strategy}</p>
                  <p className="text-xs text-launchlayer-text-secondary">{pool.description}</p>
                  {pool.risk === 'high' && (
                    <p className="text-xs text-red-400 font-medium">
                      ⚠️ This strategy involves high risk of loss. Only stake what you can afford to lose.
                    </p>
                  )}
                </div>
                <div className="text-right space-y-2 ml-4">
                  <div>
                    <p className="text-sm text-launchlayer-text-secondary">APY</p>
                    <p className={`text-xl font-bold ${pool.risk === 'high' ? 'text-red-400' : 'text-launchlayer-accent'}`}>
                      {pool.apy}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-launchlayer-text-secondary">Pool TVL</p>
                    <p className="font-medium">{pool.tvl}</p>
                  </div>
                  <Button 
                    onClick={() => {
                      setSelectedPool(pool);
                      setShowStakingModal(true);
                    }}
                    className="w-full"
                    variant={pool.risk === 'high' ? 'destructive' : 'default'}
                  >
                    Stake
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chain-Specific Projects */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Upcoming Launches on {selectedChain}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {mockProjects[selectedChain as keyof typeof mockProjects]?.map((project, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{project.logo}</span>
                      <div>
                        <h4 className="font-bold">{project.name}</h4>
                        <Badge variant="outline" className="text-xs">{project.category}</Badge>
                      </div>
                    </div>
                    <p className="text-xs text-launchlayer-text-secondary">{project.description}</p>
                    <div className="flex justify-between text-xs">
                      <span>Raise: {project.totalRaise}</span>
                      <span>TGE: {project.tgeDate}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const PersonalView = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          onClick={() => setCurrentView('dashboard')}
          className="p-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-3xl font-bold">My Airlocks</h1>
      </div>

      {/* Aggregated Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-launchlayer-text-primary">$15,500.00</h3>
            <p className="text-launchlayer-text-secondary">Total Value Staked</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-launchlayer-accent">$212.50</h3>
            <p className="text-launchlayer-text-secondary">Total Accrued Yield (Value for TGEs)</p>
          </CardContent>
        </Card>
      </div>

      {/* Position Breakdown */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Your Positions</h2>
        {userPositions.map((position, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{position.pool}</h3>
                  <p className="text-sm text-launchlayer-text-secondary">Amount Staked: {position.staked}</p>
                  <p className="text-sm text-launchlayer-accent">Accrued Yield: {position.yield}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Add Stake</Button>
                  <Button variant="outline" size="sm">Withdraw</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Allocations */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Your Upcoming TGE Allocations</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {upcomingTGEs.map((tge, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center space-y-2">
                <div className="text-3xl">{tge.logo}</div>
                <h3 className="font-bold">{tge.name}</h3>
                <p className="text-launchlayer-accent font-medium">~{tge.allocation}</p>
                <p className="text-sm text-launchlayer-text-secondary">TGE: {tge.tgeDate}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const StakingModal = () => (
    <Dialog open={showStakingModal} onOpenChange={setShowStakingModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span>Stake ETH in {selectedPool?.name}</span>
            {selectedPool?.risk === 'high' && (
              <Badge variant="destructive" className="bg-red-600 text-white">
                HIGH RISK
              </Badge>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {selectedPool?.risk === 'high' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm font-medium">High Risk Warning</span>
              </div>
              <p className="text-xs text-red-700 mt-1">
                This strategy has high risk of loss. Past performance does not guarantee future results.
              </p>
            </div>
          )}
          
          <div>
            <p className="text-sm text-launchlayer-text-secondary">Your Wallet Balance</p>
            <p className="font-bold">4.5 ETH</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount to Stake</label>
            <Input 
              placeholder="0.0"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
            />
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => setStakeAmount('1.125')}>25%</Button>
              <Button variant="outline" size="sm" onClick={() => setStakeAmount('2.25')}>50%</Button>
              <Button variant="outline" size="sm" onClick={() => setStakeAmount('4.5')}>MAX</Button>
            </div>
          </div>

          <div className="bg-launchlayer-surface p-4 rounded-lg space-y-2">
            <h4 className="font-medium">Transaction Summary</h4>
            <div className="text-sm space-y-1">
              <p>You will receive: ~{stakeAmount || '0'} s{selectedPool?.name?.replace(' ', '')}</p>
              <p>Current APY: {selectedPool?.apy}</p>
              <p>Gas Fee: ~$12.50</p>
            </div>
          </div>

          <div className="space-y-2">
            <Button className="w-full" variant="outline">
              Approve
            </Button>
            <Button 
              className="w-full" 
              disabled={!stakeAmount}
              variant={selectedPool?.risk === 'high' ? 'destructive' : 'default'}
            >
              Confirm Stake
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-launchlayer-background text-launchlayer-text-primary">
      {/* Header */}
      <header className="bg-launchlayer-surface border-b border-launchlayer-surface-light p-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/c054fc20-c0d7-4c0c-9d55-8dc40e350c79.png" 
              alt="Launch Layer Logo" 
              className="h-8 w-auto" 
            />
            <h1 className="text-xl font-bold bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet bg-clip-text text-transparent">
              Launch Layer - Beta UX Mockup
            </h1>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-launchlayer-text-secondary">
            <Button 
              variant={currentView === 'dashboard' ? 'accent' : 'ghost'} 
              size="sm"
              onClick={() => setCurrentView('dashboard')}
            >
              Dashboard
            </Button>
            <Button 
              variant={currentView === 'airlocks' ? 'accent' : 'ghost'} 
              size="sm"
              onClick={() => setCurrentView('airlocks')}
            >
              Airlocks
            </Button>
            <Button 
              variant={currentView === 'personal' ? 'accent' : 'ghost'} 
              size="sm"
              onClick={() => setCurrentView('personal')}
            >
              My Airlocks
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate("/")}
            >
              White Paper
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 max-w-6xl">
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'airlocks' && <AirlocksView />}
        {currentView === 'chain' && <ChainView />}
        {currentView === 'personal' && <PersonalView />}
        <StakingModal />
      </main>

      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default BetaUXPage;
