
import React, { useState } from "react";
import HeroSection from "@/components/landing/HeroSection";
import CurrentRaisesSection from "@/components/landing/CurrentRaisesSection";
import DeveloperSection from "@/components/landing/DeveloperSection";
import { Link } from "react-router-dom";
import { FileText, ArrowRight, ChevronLeft, ChevronRight, Target, Shield, Database, Rocket, TrendingUp, Repeat, Users, DollarSign, Zap, Star, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const LandingPage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  console.log("=== PITCH DECK LANDING PAGE LOADING ===");
  console.log("Route: ", window.location.pathname);
  console.log("Component: LandingPage - PITCH DECK VERSION");

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
      title: "Hero Section",
      content: <HeroSection />
    },
    {
      id: 2,
      title: "Core Principles",
      content: (
        <section className="py-16 md:py-24 bg-launchlayer-surface relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02] bg-noise"></div>
          <div className="md:hidden absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-launchlayer-accent via-launchlayer-violet to-launchlayer-mint"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] relative">
            <div className="text-center mb-12 md:mb-16">
              <div className="inline-block mb-4">
                <span className="text-sm font-medium text-launchlayer-accent bg-launchlayer-accent/10 px-3 py-1 rounded-full">
                  PAGE 2 - CORE PRINCIPLES
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-launchlayer-text-primary">
                Built on <span className="text-launchlayer-accent">Simple Principles</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet rounded-full mx-auto mb-4"></div>
              <p className="text-lg text-launchlayer-text-secondary max-w-3xl mx-auto">
                No gimmicks, no platform tokens, no artificial barriers. Just transparent, efficient token launches.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-launchlayer-background/50 backdrop-blur-sm p-6 rounded-xl border border-launchlayer-surface-light hover:shadow-[0_8px_30px_rgba(50,119,245,0.1)] transition-all duration-300">
                <div className="w-12 h-12 bg-launchlayer-accent/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-launchlayer-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-launchlayer-text-primary">Permissionless</h3>
                <p className="text-launchlayer-text-secondary">
                  Deploy your token sale without approval, KYC, or gatekeepers. Your project, your timeline.
                </p>
              </div>

              <div className="bg-launchlayer-background/50 backdrop-blur-sm p-6 rounded-xl border border-launchlayer-surface-light hover:shadow-[0_8px_30px_rgba(167,139,250,0.1)] transition-all duration-300">
                <div className="w-12 h-12 bg-launchlayer-violet/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-launchlayer-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-launchlayer-text-primary">Transparent</h3>
                <p className="text-launchlayer-text-secondary">
                  All contracts are open source. No hidden fees, no surprise mechanics, no platform tokens required.
                </p>
              </div>

              <div className="bg-launchlayer-background/50 backdrop-blur-sm p-6 rounded-xl border border-launchlayer-surface-light hover:shadow-[0_8px_30px_rgba(99,206,198,0.1)] transition-all duration-300">
                <div className="w-12 h-12 bg-launchlayer-mint/20 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-launchlayer-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-launchlayer-text-primary">Efficient</h3>
                <p className="text-launchlayer-text-secondary">
                  Fixed-price sales with instant finalization. No bonding curves, no price discovery games.
                </p>
              </div>
            </div>
          </div>
        </section>
      )
    },
    {
      id: 3,
      title: "The Airlock Mechanism",
      content: (
        <div className="space-y-3 md:space-y-6 px-2 md:px-4 py-16">
          <div className="text-center space-y-2 md:space-y-3">
            <span className="px-3 md:px-6 py-2 md:py-3 rounded-full bg-launchlayer-accent/10 text-launchlayer-accent text-sm md:text-lg font-medium flex items-center justify-center space-x-2 w-fit mx-auto">
              <Zap className="w-3 h-3 md:w-5 md:h-5" />
              <span>THE AIRLOCK MECHANISM</span>
            </span>
            <h2 className="text-lg md:text-2xl lg:text-3xl font-bold">Seamless automation—from staking to allocation</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-6">
            <div className="text-center space-y-2 md:space-y-4 p-3 md:p-6 bg-launchlayer-surface rounded-xl border-2 border-launchlayer-violet/30 relative">
              <div className="absolute top-2 md:top-3 left-2 md:left-3 w-5 h-5 md:w-8 md:h-8 bg-launchlayer-violet rounded-full flex items-center justify-center">
                <span className="text-xs md:text-lg font-bold text-white">1</span>
              </div>
              <div className="pt-1 md:pt-4">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-launchlayer-violet/20 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                  <Database className="w-5 h-5 md:w-8 md:h-8 text-launchlayer-violet" />
                </div>
                <h3 className="text-base md:text-xl font-bold text-launchlayer-violet mb-1 md:mb-3">Stake</h3>
                <p className="text-xs md:text-sm text-launchlayer-text-secondary leading-relaxed">
                  Users deposit assets into Airlocks. Principal always liquid (withdraw anytime).
                </p>
              </div>
              <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                <ArrowRight className="w-4 h-4 md:w-6 md:h-6 text-launchlayer-accent" />
              </div>
            </div>

            <div className="text-center space-y-2 md:space-y-4 p-3 md:p-6 bg-launchlayer-surface rounded-xl border-2 border-launchlayer-mint/30 relative">
              <div className="absolute top-2 md:top-3 left-2 md:left-3 w-5 h-5 md:w-8 md:h-8 bg-launchlayer-mint rounded-full flex items-center justify-center">
                <span className="text-xs md:text-lg font-bold text-white">2</span>
              </div>
              <div className="pt-1 md:pt-4">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-launchlayer-mint/20 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                  <TrendingUp className="w-5 h-5 md:w-8 md:h-8 text-launchlayer-mint" />
                </div>
                <h3 className="text-base md:text-xl font-bold text-launchlayer-mint mb-1 md:mb-3">Earn Yield + Boost</h3>
                <p className="text-xs md:text-sm text-launchlayer-text-secondary leading-relaxed">
                  Generate validator yield (10-15% APY) plus project-funded bonus rewards.
                </p>
              </div>
              <div className="hidden lg:block absolute -right-3 top-1/2 transform -translate-y-1/2">
                <ArrowRight className="w-4 h-4 md:w-6 md:h-6 text-launchlayer-mint" />
              </div>
            </div>

            <div className="text-center space-y-2 md:space-y-4 p-3 md:p-6 bg-launchlayer-surface rounded-xl border-2 border-launchlayer-accent/30 relative">
              <div className="absolute top-2 md:top-3 left-2 md:left-3 w-5 h-5 md:w-8 md:h-8 bg-launchlayer-accent rounded-full flex items-center justify-center">
                <span className="text-xs md:text-lg font-bold text-white">3</span>
              </div>
              <div className="pt-1 md:pt-4">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-launchlayer-accent/20 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4">
                  <Rocket className="w-5 h-5 md:w-8 md:h-8 text-launchlayer-accent" />
                </div>
                <h3 className="text-base md:text-xl font-bold text-launchlayer-accent mb-1 md:mb-3">Automated Allocation</h3>
                <p className="text-xs md:text-sm text-launchlayer-text-secondary leading-relaxed">
                  Yield auto-mints guaranteed presale allocations. Zero whitelist grind.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center space-x-2 md:space-x-4 pt-2 md:pt-4">
            <div className="w-2 h-2 md:w-3 md:h-3 bg-launchlayer-violet rounded-full animate-pulse"></div>
            <div className="w-4 h-0.5 md:w-8 md:h-0.5 bg-gradient-to-r from-launchlayer-violet to-launchlayer-mint"></div>
            <div className="w-2 h-2 md:w-3 md:h-3 bg-launchlayer-mint rounded-full animate-pulse delay-500"></div>
            <div className="w-4 h-0.5 md:w-8 md:h-0.5 bg-gradient-to-r from-launchlayer-mint to-launchlayer-accent"></div>
            <div className="w-2 h-2 md:w-3 md:h-3 bg-launchlayer-accent rounded-full animate-pulse delay-1000"></div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Current Raises",
      content: <CurrentRaisesSection />
    },
    {
      id: 5,
      title: "The Integrated Flywheel",
      content: (
        <div className="space-y-3 md:space-y-4 px-4 py-16">
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
      id: 6,
      title: "Traction & Revenue",
      content: (
        <div className="space-y-3 md:space-y-4 px-4 py-16">
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
      id: 7,
      title: "Developer Resources",
      content: <DeveloperSection />
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
    <div className="min-h-screen bg-gradient-to-b from-launchlayer-background via-launchlayer-background to-launchlayer-surface">
      {/* Page Header with Beta Badge */}
      <div className="bg-launchlayer-surface border-b border-launchlayer-surface-light">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-launchlayer-accent bg-launchlayer-accent/10 px-3 py-1 rounded-full">
              INTERACTIVE PITCH DECK
            </span>
            <h1 className="text-lg font-bold text-launchlayer-text-primary">
              Launch Layer Pitch Deck
            </h1>
          </div>
          <Link to="/whitepaper">
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <FileText size={16} />
              <span>Technical White Paper</span>
              <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Slide Content */}
      <div className="container mx-auto p-2 md:p-6 min-h-[calc(100vh-80px)] flex flex-col">
        <div className="flex-1 bg-launchlayer-surface rounded-xl border border-launchlayer-surface-light p-3 md:p-8 mb-3 md:mb-6 overflow-y-auto">
          <div className="h-full">
            {slides[currentSlide].content}
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between px-2">
          <Button
            variant="outline"
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="flex items-center space-x-1 md:space-x-2 px-2 md:px-4 py-1 md:py-2 h-auto text-xs md:text-sm"
          >
            <ChevronLeft size={14} />
            <span className="hidden sm:inline">Previous</span>
          </Button>

          {/* Slide Indicators */}
          <div className="flex space-x-1 md:space-x-2 overflow-x-auto py-1">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all flex-shrink-0 ${
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
            <ChevronRight size={14} />
          </Button>
        </div>

        {/* Slide Counter */}
        <div className="text-center mt-2">
          <span className="text-xs text-launchlayer-text-secondary">
            {currentSlide + 1} of {slides.length}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
