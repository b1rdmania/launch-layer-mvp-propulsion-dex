"use client";

import React, { useState, useEffect } from "react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Swap from "./components/Swap";
import AddLiquidity from "./components/AddLiquidity";
import MyPositions from "./components/MyPositions";
import { useAccount } from "wagmi";

const TABS = [
  { 
    id: "swap", 
    label: "Swap", 
    icon: "🔄", 
    description: "Trade tokens instantly",
    color: "from-primary-500 to-secondary-500"
  },
  { 
    id: "liquidity", 
    label: "Add Liquidity", 
    icon: "💧", 
    description: "Earn fees by providing liquidity",
    color: "from-secondary-500 to-accent-500"
  },
  { 
    id: "positions", 
    label: "My Positions", 
    icon: "📊", 
    description: "Manage your portfolio",
    color: "from-accent-500 to-primary-600"
  }
];

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);
  const { address, isConnected } = useAccount();

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (!isConnected) {
        setShowWelcome(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, [isConnected]);

  useEffect(() => {
    if (isConnected) {
      setShowWelcome(false);
    }
  }, [isConnected]);

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-primary relative overflow-hidden flex items-center justify-center">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl animate-pulse-glow" style={{animationDelay: '1s'}}></div>
        </div>
        
        {/* Loading Content */}
        <div className="text-center z-10">
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <div className="absolute inset-0 border-4 border-primary-500/30 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <h1 className="text-3xl font-bold gradient-text mb-2 animate-pulse">PropulsionDEX</h1>
          <p className="text-gray-300 animate-pulse">Loading the future of DeFi...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-primary relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-accent-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-purple">
              <span className="text-2xl font-bold text-white">P</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">PropulsionDEX</h1>
              <p className="text-gray-400 text-sm">Powered by Algebra Protocol</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Network Status */}
            <div className="hidden md:flex items-center space-x-2 glass-card px-4 py-2 rounded-xl">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-300">Sonic Mainnet</span>
            </div>
            
            {/* Connect Button */}
            <div className="glass-card p-1 rounded-2xl">
              <ConnectButton />
            </div>
          </div>
        </div>
      </header>

      {/* Welcome Modal */}
      {showWelcome && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-scale-in">
          <div className="glass-card p-8 rounded-3xl max-w-md mx-4 text-center animate-slide-up">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-primary rounded-full flex items-center justify-center shadow-purple">
              <span className="text-3xl">🚀</span>
            </div>
            <h2 className="text-2xl font-bold gradient-text mb-3">Welcome to PropulsionDEX</h2>
            <p className="text-gray-300 mb-6">
              Experience the next generation of decentralized trading on Sonic blockchain with deep liquidity and minimal fees.
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3 text-left">
                <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-primary-400">⚡</span>
                </div>
                <span className="text-gray-300">Lightning-fast swaps</span>
              </div>
              <div className="flex items-center space-x-3 text-left">
                <div className="w-8 h-8 bg-secondary-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-secondary-400">💰</span>
                </div>
                <span className="text-gray-300">Earn fees from liquidity</span>
              </div>
              <div className="flex items-center space-x-3 text-left">
                <div className="w-8 h-8 bg-accent-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-accent-400">📊</span>
                </div>
                <span className="text-gray-300">Advanced portfolio tracking</span>
              </div>
            </div>
            <button
              onClick={() => setShowWelcome(false)}
              className="w-full btn-primary py-3 rounded-xl font-semibold hover-lift"
            >
              Get Started
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="relative z-10 px-6 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="glass-card p-2 rounded-2xl max-w-2xl mx-auto">
              <div className="grid grid-cols-3 gap-2">
                {TABS.map((tab, index) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(index)}
                    className={`relative p-4 rounded-xl transition-all duration-300 group ${
                      activeTab === index
                        ? 'bg-gradient-primary text-white shadow-purple'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                        {tab.icon}
                      </span>
                      <span className="font-medium text-sm">{tab.label}</span>
                      <span className="text-xs opacity-70 hidden md:block">{tab.description}</span>
                    </div>
                    
                    {/* Active Tab Indicator */}
                    {activeTab === index && (
                      <div className="absolute inset-0 bg-gradient-primary rounded-xl opacity-10 animate-pulse-glow"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="animate-slide-up">
            {renderTabContent()}
          </div>

          {/* Stats Footer */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass-card p-6 rounded-2xl text-center hover-lift">
              <div className="w-12 h-12 mx-auto mb-3 bg-primary-500/20 rounded-xl flex items-center justify-center">
                <span className="text-primary-400">💎</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">$2.4M+</h3>
              <p className="text-gray-400 text-sm">Total Value Locked</p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl text-center hover-lift">
              <div className="w-12 h-12 mx-auto mb-3 bg-secondary-500/20 rounded-xl flex items-center justify-center">
                <span className="text-secondary-400">📈</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">$8.7M+</h3>
              <p className="text-gray-400 text-sm">24h Volume</p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl text-center hover-lift">
              <div className="w-12 h-12 mx-auto mb-3 bg-accent-500/20 rounded-xl flex items-center justify-center">
                <span className="text-accent-400">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">0.3%</h3>
              <p className="text-gray-400 text-sm">Trading Fees</p>
            </div>
            
            <div className="glass-card p-6 rounded-2xl text-center hover-lift">
              <div className="w-12 h-12 mx-auto mb-3 bg-primary-600/20 rounded-xl flex items-center justify-center">
                <span className="text-primary-500">🏆</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">1,247</h3>
              <p className="text-gray-400 text-sm">Active Users</p>
            </div>
          </div>
        </div>
      </main>

      {/* Floating Action Button (Mobile) */}
      <div className="fixed bottom-6 right-6 md:hidden z-40">
        <button
          onClick={() => setShowWelcome(true)}
          className="w-14 h-14 bg-gradient-primary rounded-full shadow-purple flex items-center justify-center hover-lift"
        >
          <span className="text-xl">💡</span>
        </button>
      </div>
    </div>
  );
}
