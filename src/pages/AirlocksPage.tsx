
import React from "react";
import { ArrowRight, Shield, TrendingUp, Key, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import LandingLayout from "@/components/layout/LandingLayout";

const AirlocksPage: React.FC = () => {
  const navigate = useNavigate();

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

  const chains = [
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

  const scrollToChainSelection = () => {
    const element = document.getElementById('chain-selection');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <LandingLayout>
      <div className="min-h-screen bg-launchlayer-background">
        {/* Hero Section */}
        <section className="pt-20 pb-16 relative overflow-hidden">
          <div className="container mx-auto px-4 max-w-6xl text-center">
            <div className="relative z-10">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
                <span className="bg-gradient-to-r from-launchlayer-accent via-launchlayer-violet to-launchlayer-mint bg-clip-text text-transparent">
                  Turn Your Yield
                </span>
                <br />
                <span className="text-launchlayer-text-primary">Into Early Access</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-launchlayer-text-secondary mb-8 max-w-4xl mx-auto leading-relaxed">
                Airlocks are our unique yield-to-access system. Stake your assets, earn real yield from validator operations and blue-chip protocols, and automatically convert those earnings into guaranteed allocations in the most promising new projects.
              </p>
              
              <Button 
                variant="accent" 
                size="lg" 
                className="h-14 px-8 text-lg"
                onClick={scrollToChainSelection}
              >
                Explore Airlocks
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </div>
            
            {/* Placeholder for Lottie Animation */}
            <div className="mt-16 relative">
              <div className="w-full max-w-2xl mx-auto h-64 bg-gradient-to-br from-launchlayer-surface to-launchlayer-surface/50 rounded-2xl border border-launchlayer-surface-light flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🔄</div>
                  <p className="text-launchlayer-text-secondary">The Flywheel: The Full Ecosystem Loop</p>
                  <p className="text-sm text-launchlayer-text-secondary mt-2">(Lottie Animation Placeholder)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-launchlayer-surface">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-launchlayer-text-primary">
                Simple, Secure, Capital-Efficient
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <Card className="bg-launchlayer-background border-launchlayer-surface-light hover:border-launchlayer-accent/50 transition-all duration-300">
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

              {/* Step 2 */}
              <Card className="bg-launchlayer-background border-launchlayer-surface-light hover:border-launchlayer-accent/50 transition-all duration-300">
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

              {/* Step 3 */}
              <Card className="bg-launchlayer-background border-launchlayer-surface-light hover:border-launchlayer-accent/50 transition-all duration-300">
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
          </div>
        </section>

        {/* Featured Upcoming Launches */}
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
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
          </div>
        </section>

        {/* Explore Airlocks by Chain */}
        <section id="chain-selection" className="py-16 bg-launchlayer-surface">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-launchlayer-text-primary">
                Choose Your Chain to Get Started
              </h2>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {chains.map((chain, index) => (
                <Card 
                  key={index}
                  className="bg-launchlayer-background border-launchlayer-surface-light hover:border-launchlayer-accent/50 hover:scale-105 transition-all duration-300 cursor-pointer"
                  onClick={() => navigate('/beta-ux')}
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
          </div>
        </section>

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
    </LandingLayout>
  );
};

export default AirlocksPage;
