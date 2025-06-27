"use client";

import React, { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { portfolioService, Position, SwapTransaction, PortfolioSummary } from "../services/portfolioService";
import { getTokenInfo, WRAPPED_S_ADDRESS, WETH_ADDRESS, USDC_ADDRESS, USDT_ADDRESS } from "../contracts";

export default function MyPositions() {
  const { address, isConnected } = useAccount();
  const [portfolioData, setPortfolioData] = useState<PortfolioSummary | null>(null);
  const [tokenBalances, setTokenBalances] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<'overview' | 'positions' | 'history' | 'balances'>('overview');

  useEffect(() => {
    if (address && isConnected) {
      loadPortfolioData();
    }
  }, [address, isConnected]);

  const loadPortfolioData = async () => {
    if (!address) return;
    
    setLoading(true);
    setError("");
    
    try {
      const [portfolio, balances] = await Promise.all([
        portfolioService.getPortfolioSummary(address),
        portfolioService.getTokenBalances(address, [
          WRAPPED_S_ADDRESS,
          WETH_ADDRESS,
          USDC_ADDRESS,
          USDT_ADDRESS,
        ]),
      ]);
      
      setPortfolioData(portfolio);
      setTokenBalances(balances);
    } catch (err) {
      console.error("Error loading portfolio:", err);
      setError("Failed to load portfolio data");
    } finally {
      setLoading(false);
    }
  };

  const formatUSD = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="glass-card p-8 rounded-2xl">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Connect Your Wallet</h3>
          <p className="text-gray-300 mb-6">Connect your wallet to view your portfolio and positions</p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-300">Total Value</h3>
            <div className="w-8 h-8 bg-primary-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-white">
            {portfolioData ? formatUSD(portfolioData.totalValueUSD) : '$0.00'}
          </p>
          <p className="text-xs text-gray-400 mt-1">Portfolio Value</p>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-300">Fees Earned</h3>
            <div className="w-8 h-8 bg-secondary-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-white">
            {portfolioData ? formatUSD(portfolioData.totalFeesEarned) : '$0.00'}
          </p>
          <p className="text-xs text-gray-400 mt-1">Total Earnings</p>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-300">Active Positions</h3>
            <div className="w-8 h-8 bg-accent-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-white">
            {portfolioData ? `${portfolioData.activePositions}/${portfolioData.totalPositions}` : '0/0'}
          </p>
          <p className="text-xs text-gray-400 mt-1">In Range</p>
        </div>

        <div className="glass-card p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-gray-300">Total Volume</h3>
            <div className="w-8 h-8 bg-primary-600/20 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-white">
            {portfolioData ? formatUSD(portfolioData.totalVolumeUSD) : '$0.00'}
          </p>
          <p className="text-xs text-gray-400 mt-1">Trading Volume</p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="glass-card p-1 rounded-2xl">
        <div className="flex space-x-1">
          {[
            { key: 'overview', label: 'Overview', icon: '📊' },
            { key: 'positions', label: 'Positions', icon: '💎' },
            { key: 'history', label: 'History', icon: '📈' },
            { key: 'balances', label: 'Balances', icon: '💰' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? 'bg-gradient-primary text-white shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="glass-card p-6 rounded-2xl min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-300">Loading portfolio data...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-red-400 mb-2">{error}</p>
              <button
                onClick={loadPortfolioData}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">Portfolio Overview</h3>
                  <button
                    onClick={loadPortfolioData}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm"
                  >
                    Refresh
                  </button>
                </div>
                
                {portfolioData?.positions.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary-500/20 rounded-full flex items-center justify-center">
                      <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">No Positions Yet</h4>
                    <p className="text-gray-400 mb-4">Start by adding liquidity to earn fees from trading</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Positions */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Recent Positions</h4>
                      <div className="space-y-3">
                        {portfolioData?.positions.slice(0, 3).map((position) => (
                          <div key={position.id} className="bg-white/5 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-white">
                                {position.pool.token0.symbol}/{position.pool.token1.symbol}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                position.priceRange.inRange 
                                  ? 'bg-green-500/20 text-green-400' 
                                  : 'bg-red-500/20 text-red-400'
                              }`}>
                                {position.priceRange.inRange ? 'In Range' : 'Out of Range'}
                              </span>
                            </div>
                            <div className="text-sm text-gray-400">
                              Value: {formatUSD(position.currentValue.totalUSD)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Swaps */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Recent Activity</h4>
                      <div className="space-y-3">
                        {portfolioData?.recentSwaps.slice(0, 3).map((swap) => (
                          <div key={swap.id} className="bg-white/5 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-white">
                                {swap.pool.token0.symbol}/{swap.pool.token1.symbol}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                swap.type === 'buy' 
                                  ? 'bg-green-500/20 text-green-400' 
                                  : 'bg-red-500/20 text-red-400'
                              }`}>
                                {swap.type.toUpperCase()}
                              </span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-400">
                              <span>{formatUSD(swap.amountUSD)}</span>
                              <span>{formatDate(swap.timestamp)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Positions Tab */}
            {activeTab === 'positions' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Liquidity Positions</h3>
                {portfolioData?.positions.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400">No liquidity positions found</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {portfolioData?.positions.map((position) => (
                      <div key={position.id} className="bg-white/5 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex -space-x-2">
                              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {position.pool.token0.symbol[0]}
                              </div>
                              <div className="w-8 h-8 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {position.pool.token1.symbol[0]}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-white">
                                {position.pool.token0.symbol}/{position.pool.token1.symbol}
                              </h4>
                              <p className="text-sm text-gray-400">Fee: {position.pool.fee / 10000}%</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            position.priceRange.inRange 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {position.priceRange.inRange ? 'In Range' : 'Out of Range'}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-400 mb-1">Current Value</p>
                            <p className="font-semibold text-white">{formatUSD(position.currentValue.totalUSD)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 mb-1">Uncollected Fees</p>
                            <p className="font-semibold text-white">{formatUSD(position.uncollectedFees.totalUSD)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 mb-1">{position.pool.token0.symbol}</p>
                            <p className="font-semibold text-white">{position.currentValue.token0}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-400 mb-1">{position.pool.token1.symbol}</p>
                            <p className="font-semibold text-white">{position.currentValue.token1}</p>
                          </div>
                        </div>

                        <div className="flex space-x-3">
                          <button className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors text-sm">
                            Collect Fees
                          </button>
                          <button className="flex-1 px-4 py-2 bg-secondary-600 hover:bg-secondary-700 text-white rounded-lg transition-colors text-sm">
                            Remove Liquidity
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Trading History</h3>
                {portfolioData?.recentSwaps.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-gray-400">No trading history found</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {portfolioData?.recentSwaps.map((swap) => (
                      <div key={swap.id} className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              swap.type === 'buy' 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {swap.type.toUpperCase()}
                            </span>
                            <div>
                              <p className="font-medium text-white">
                                {swap.pool.token0.symbol}/{swap.pool.token1.symbol}
                              </p>
                              <p className="text-sm text-gray-400">{formatDate(swap.timestamp)}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-white">{formatUSD(swap.amountUSD)}</p>
                            <p className="text-sm text-gray-400">
                              {parseFloat(swap.amount0) > 0 ? '+' : ''}{parseFloat(swap.amount0).toFixed(4)} {swap.pool.token0.symbol}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Balances Tab */}
            {activeTab === 'balances' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white">Token Balances</h3>
                <div className="grid gap-4">
                  {Object.entries(tokenBalances).map(([address, balance]) => {
                    const tokenInfo = getTokenInfo(address);
                    return (
                      <div key={address} className="bg-white/5 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
                              {tokenInfo.symbol[0]}
                            </div>
                            <div>
                              <p className="font-semibold text-white">{tokenInfo.symbol}</p>
                              <p className="text-sm text-gray-400">{tokenInfo.name}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-white">{balance}</p>
                            <p className="text-sm text-gray-400">Balance</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
} 