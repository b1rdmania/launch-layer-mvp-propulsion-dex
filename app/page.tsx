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
  const [currentView, setCurrentView] = useState<'dashboard' | 'swap' | 'liquidity' | 'positions'>('dashboard');
  const { address, isConnected } = useAccount();

  const dexStats = {
    tvl: '$2,400,000',
    volume24h: '$450,000',
    activeUsers: '1,247',
    tradingPairs: '8'
  };

  const topPairs = [
    { pair: 'wS/WETH', volume: '$125,000', apy: '18.5%', tvl: '$850,000' },
    { pair: 'WETH/USDC', volume: '$98,000', apy: '12.3%', tvl: '$650,000' },
    { pair: 'USDC/USDT', volume: '$87,000', apy: '8.9%', tvl: '$420,000' },
    { pair: 'wS/USDC', volume: '$65,000', apy: '15.2%', tvl: '$380,000' }
  ];

  const DashboardView = () => (
    <div className="space-y-8">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 bg-launchlayer-surface rounded-lg border border-launchlayer-surface-light">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-launchlayer-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">P</span>
            </div>
            <span className="text-3xl font-bold text-launchlayer-text-primary">PropulsionDEX</span>
          </div>
          <div className="hidden md:flex space-x-4 text-sm">
            <span className="text-launchlayer-accent font-medium">Dashboard</span>
            <span 
              className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary cursor-pointer"
              onClick={() => setCurrentView('swap')}
            >
              Swap
            </span>
            <span 
              className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary cursor-pointer"
              onClick={() => setCurrentView('liquidity')}
            >
              Liquidity
            </span>
            <span 
              className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary cursor-pointer"
              onClick={() => setCurrentView('positions')}
            >
              Positions
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

      {/* DEX Stats Banner */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-launchlayer-accent">{dexStats.tvl}</h3>
            <p className="text-launchlayer-text-secondary">Total Value Locked</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-launchlayer-violet">{dexStats.volume24h}</h3>
            <p className="text-launchlayer-text-secondary">24h Volume</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-launchlayer-mint">{dexStats.activeUsers}</h3>
            <p className="text-launchlayer-text-secondary">Active Users</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-launchlayer-accent">{dexStats.tradingPairs}</h3>
            <p className="text-launchlayer-text-secondary">Trading Pairs</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <Button 
              onClick={() => setCurrentView('swap')} 
              className="w-full h-20 flex flex-col items-center justify-center space-y-2"
            >
              <span className="text-2xl">🔄</span>
              <span>Swap Tokens</span>
            </Button>
            <Button 
              onClick={() => setCurrentView('liquidity')} 
              variant="outline" 
              className="w-full h-20 flex flex-col items-center justify-center space-y-2"
            >
              <span className="text-2xl">💧</span>
              <span>Add Liquidity</span>
            </Button>
            <Button 
              onClick={() => setCurrentView('positions')} 
              variant="outline" 
              className="w-full h-20 flex flex-col items-center justify-center space-y-2"
            >
              <span className="text-2xl">📊</span>
              <span>My Positions</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Top Trading Pairs */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Top Trading Pairs</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {topPairs.map((pair, index) => (
            <Card key={index} className="hover:border-launchlayer-accent transition-colors cursor-pointer">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-launchlayer-text-primary">{pair.pair}</h3>
                    <div className="space-y-1 text-sm">
                      <p><span className="text-launchlayer-text-secondary">24h Volume:</span> <span className="text-launchlayer-accent">{pair.volume}</span></p>
                      <p><span className="text-launchlayer-text-secondary">TVL:</span> <span className="text-launchlayer-mint">{pair.tvl}</span></p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-launchlayer-violet">{pair.apy}</div>
                    <div className="text-sm text-launchlayer-text-secondary">APY</div>
                  </div>
                </div>
                <Button 
                  onClick={() => setCurrentView('swap')} 
                  className="w-full mt-4"
                  size="sm"
                >
                  Trade {pair.pair}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Protocol Information */}
      <Card>
        <CardHeader>
          <CardTitle>About PropulsionDEX</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-launchlayer-accent/20 rounded-lg flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6 text-launchlayer-accent" />
              </div>
              <h3 className="font-bold text-launchlayer-text-primary">Lightning Fast</h3>
              <p className="text-sm text-launchlayer-text-secondary">
                Powered by Algebra Protocol on Sonic blockchain for instant swaps with minimal fees
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-launchlayer-violet/20 rounded-lg flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6 text-launchlayer-violet" />
              </div>
              <h3 className="font-bold text-launchlayer-text-primary">Secure & Audited</h3>
              <p className="text-sm text-launchlayer-text-secondary">
                Battle-tested smart contracts with concentrated liquidity and advanced security features
              </p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-launchlayer-mint/20 rounded-lg flex items-center justify-center mx-auto">
                <TrendingUp className="w-6 h-6 text-launchlayer-mint" />
              </div>
              <h3 className="font-bold text-launchlayer-text-primary">Maximize Yields</h3>
              <p className="text-sm text-launchlayer-text-secondary">
                Earn trading fees and yield farming rewards with optimized liquidity positions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const SwapView = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => setCurrentView('dashboard')} className="p-2">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-3xl font-bold text-launchlayer-text-primary">Swap Tokens</h1>
      </div>
      <Swap />
    </div>
  );

  const LiquidityView = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => setCurrentView('dashboard')} className="p-2">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-3xl font-bold text-launchlayer-text-primary">Add Liquidity</h1>
      </div>
      <AddLiquidity />
    </div>
  );

  const PositionsView = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="ghost" onClick={() => setCurrentView('dashboard')} className="p-2">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-3xl font-bold text-launchlayer-text-primary">My Positions</h1>
      </div>
      <MyPositions />
    </div>
  );

  return (
    <div className="min-h-screen bg-launchlayer-background text-launchlayer-text-primary">
      <div className="container mx-auto px-4 py-8">
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'swap' && <SwapView />}
        {currentView === 'liquidity' && <LiquidityView />}
        {currentView === 'positions' && <PositionsView />}
      </div>
    </div>
  );
}
