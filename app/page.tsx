"use client";

import React, { useState } from "react";
import { ArrowLeft, Wallet, ExternalLink, Plus, Minus, AlertTriangle, ArrowRight, Shield, TrendingUp, Key, FileText, Database, Layers, GitBranch, Zap, Target } from "lucide-react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Swap from "./components/Swap";
import AddLiquidity from "./components/AddLiquidity";
import MyPositions from "./components/MyPositions";
import { useAccount } from "wagmi";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./components/ui/dialog";
import { Badge } from "./components/ui/badge";

export default function Home() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'dex' | 'airlocks' | 'whitepaper'>('dashboard');
  const [activeTab, setActiveTab] = useState(0);
  const { address, isConnected } = useAccount();

  const chains = [{
    name: 'Sonic',
    logo: '🔊',
    tvl: '$2,400,000',
    pools: 8
  }, {
    name: 'Base',
    logo: '🔵',
    tvl: '$4,100,000',
    pools: 3
  }, {
    name: 'HyperEVM',
    logo: '⚡',
    tvl: '$5,200,000',
    pools: 3
  }, {
    name: 'MegaETH',
    logo: '🚀',
    tvl: '$2,200,000',
    pools: 3
  }];

  const mockProjects = [{
    name: 'SilverSwap Pro',
    category: 'DeFi',
    logo: '💧',
    description: 'Advanced Algebra DEX with concentrated liquidity on Sonic',
    tgeDate: 'July 22, 2025',
    totalRaise: '$2.5M',
    status: 'upcoming'
  }, {
    name: 'Sonic AI',
    category: 'AI',
    logo: '🤖',
    description: 'On-chain AI model training and inference protocol',
    tgeDate: 'August 15, 2025',
    totalRaise: '$4.2M',
    status: 'upcoming'
  }, {
    name: 'SonicRealms',
    category: 'Gaming',
    logo: '🎮',
    description: 'Fully on-chain strategy game with NFT armies',
    tgeDate: 'September 3, 2025',
    totalRaise: '$1.8M',
    status: 'upcoming'
  }, {
    name: 'SonicBridge',
    category: 'Infrastructure',
    logo: '🌉',
    description: 'Cross-chain messaging protocol for Sonic ecosystem',
    tgeDate: 'October 1, 2025',
    totalRaise: '$3.1M',
    status: 'upcoming'
  }];

  const DEXView = () => {
    const TABS = [
      { 
        id: "swap", 
        label: "Swap", 
        icon: "🔄", 
        description: "Trade tokens instantly"
      },
      { 
        id: "liquidity", 
        label: "Add Liquidity", 
        icon: "💧", 
        description: "Earn fees by providing liquidity"
      },
      { 
        id: "positions", 
        label: "My Positions", 
        icon: "📊", 
        description: "Manage your portfolio"
      }
    ];

    const renderTabContent = () => {
      switch (activeTab) {
        case 0:
          return <Swap />;
        case 1:
          return <AddLiquidity />;
        case 2:
          return <MyPositions />;
        default:
          return <Swap />;
      }
    };

    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => setCurrentView('dashboard')} className="p-2">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-3xl font-bold text-launchlayer-text-primary">Algebra DEX</h1>
        </div>

        {/* DEX Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-4 text-center">
              <h3 className="text-xl font-bold text-launchlayer-accent">$2.4M</h3>
              <p className="text-sm text-launchlayer-text-secondary">Total Value Locked</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <h3 className="text-xl font-bold text-launchlayer-violet">$450K</h3>
              <p className="text-sm text-launchlayer-text-secondary">24h Volume</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <h3 className="text-xl font-bold text-launchlayer-mint">1,247</h3>
              <p className="text-sm text-launchlayer-text-secondary">Active Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <h3 className="text-xl font-bold text-launchlayer-accent">8</h3>
              <p className="text-sm text-launchlayer-text-secondary">Trading Pairs</p>
            </CardContent>
          </Card>
        </div>

        {/* Tab Navigation */}
        <div className="bg-launchlayer-surface rounded-lg border border-launchlayer-surface-light p-2">
          <div className="grid grid-cols-3 gap-2">
            {TABS.map((tab, index) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(index)}
                className={`relative p-4 rounded-lg transition-all duration-300 group ${
                  activeTab === index
                    ? 'bg-launchlayer-accent text-white'
                    : 'text-launchlayer-text-secondary hover:text-launchlayer-text-primary hover:bg-launchlayer-surface-light'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    {tab.icon}
                  </span>
                  <span className="font-medium text-sm">{tab.label}</span>
                  <span className="text-xs opacity-70 hidden md:block">{tab.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {renderTabContent()}
        </div>
      </div>
    );
  };

  const DashboardView = () => (
    <div className="space-y-8">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 bg-launchlayer-surface rounded-lg border border-launchlayer-surface-light">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-launchlayer-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">L</span>
            </div>
            <span className="text-3xl font-bold text-launchlayer-text-primary">Dashboard</span>
          </div>
          <div className="hidden md:flex space-x-4 text-sm">
            <span 
              className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary cursor-pointer"
              onClick={() => setCurrentView('dex')}
            >
              DEX
            </span>
            <span 
              className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary cursor-pointer"
              onClick={() => setCurrentView('airlocks')}
            >
              Airlocks
            </span>
            <span 
              className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary cursor-pointer"
              onClick={() => setCurrentView('whitepaper')}
            >
              White Paper
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          {isConnected ? (
            <div className="flex items-center space-x-2">
              <Wallet className="w-4 h-4" />
              <span>{address?.slice(0, 6)}...{address?.slice(-4)}</span>
            </div>
          ) : (
            <ConnectButton />
          )}
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
          <div className="grid grid-cols-2 gap-4">
            <Button onClick={() => setCurrentView('airlocks')} className="w-full">
              View My Airlocks
            </Button>
            <Button onClick={() => setCurrentView('dex')} variant="outline" className="w-full">
              Open DEX
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Airlock Chains Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Explore Airlocks</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {chains.map(chain => (
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
                    if (chain.name === 'Sonic') {
                      setCurrentView('dex');
                    } else {
                      setCurrentView('airlocks');
                    }
                  }} 
                  className="w-full"
                >
                  {chain.name === 'Sonic' ? 'Open DEX' : 'Select Chain'}
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
          {mockProjects.map((project, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-2xl">{project.logo}</span>
                  <h4 className="font-bold">{project.name}</h4>
                </div>
                <p className="text-sm text-launchlayer-text-secondary mb-2">{project.description}</p>
                <div className="space-y-1 text-xs">
                  <p><span className="text-launchlayer-text-secondary">TGE:</span> {project.tgeDate}</p>
                  <p><span className="text-launchlayer-text-secondary">Raise:</span> {project.totalRaise}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const AirlocksView = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => setCurrentView('dashboard')} className="p-2">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-3xl font-bold text-launchlayer-text-primary">Airlocks</h1>
      </div>
      
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-xl font-bold mb-2">Airlocks Coming Soon</h3>
          <p className="text-launchlayer-text-secondary mb-4">
            Launch Layer airlock functionality is currently in development. 
            For now, explore our fully functional DEX on Sonic.
          </p>
          <Button onClick={() => setCurrentView('dex')}>
            Try the DEX
          </Button>
        </CardContent>
      </Card>
    </div>
  );

  const WhitePaperView = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => setCurrentView('dashboard')} className="p-2">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-3xl font-bold text-launchlayer-text-primary">White Paper</h1>
      </div>
      
      <Card>
        <CardContent className="p-8">
          <div className="prose prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-launchlayer-accent mb-4">Launch Layer Protocol</h2>
            <p className="text-launchlayer-text-secondary mb-6">
              Launch Layer is a comprehensive DeFi protocol that combines advanced DEX functionality 
              with innovative airlock mechanisms for project launches and yield farming.
            </p>
            
            <h3 className="text-xl font-bold text-launchlayer-violet mb-3">Algebra DEX Integration</h3>
            <p className="text-launchlayer-text-secondary mb-4">
              Our DEX is powered by Algebra Protocol, providing concentrated liquidity and advanced 
              trading features on Sonic blockchain. Experience lightning-fast swaps with minimal fees.
            </p>

            <h3 className="text-xl font-bold text-launchlayer-mint mb-3">Key Features</h3>
            <ul className="text-launchlayer-text-secondary space-y-2 mb-6">
              <li>• Advanced concentrated liquidity positions</li>
              <li>• Multi-chain airlock mechanisms</li>
              <li>• Yield farming with project token rewards</li>
              <li>• Cross-chain bridge integrations</li>
              <li>• Automated portfolio management</li>
            </ul>

            <Button onClick={() => setCurrentView('dex')} className="w-full">
              Experience the DEX
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-launchlayer-background text-launchlayer-text-primary">
      <div className="container mx-auto px-4 py-8">
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'dex' && <DEXView />}
        {currentView === 'airlocks' && <AirlocksView />}
        {currentView === 'whitepaper' && <WhitePaperView />}
      </div>
    </div>
  );
}
