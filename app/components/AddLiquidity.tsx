"use client";

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useAccount, useWalletClient } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { WETH_ADDRESS, USDC_ADDRESS, NONFUNGIBLE_POSITION_MANAGER_ADDRESS } from '../contracts';
import NonfungiblePositionManagerABI from '../abis/NonfungiblePositionManager.json';

export default function AddLiquidity() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [amount0, setAmount0] = useState('');
  const [amount1, setAmount1] = useState('');
  const [loading, setLoading] = useState(false);

  const addLiquidity = async () => {
    if (!amount0 || !amount1 || !walletClient || !address) return;

    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const positionManager = new ethers.Contract(
        NONFUNGIBLE_POSITION_MANAGER_ADDRESS,
        NonfungiblePositionManagerABI,
        signer
      );

      const amount0Desired = ethers.parseUnits(amount0, 18); // WETH decimals
      const amount1Desired = ethers.parseUnits(amount1, 6);  // USDC decimals

      const params = {
        token0: WETH_ADDRESS,
        token1: USDC_ADDRESS,
        fee: 3000,
        tickLower: -887272,  // These are example ticks, should be calculated based on price range
        tickUpper: 887272,
        amount0Desired,
        amount1Desired,
        amount0Min: 0,       // In production, should include slippage protection
        amount1Min: 0,
        recipient: address,
        deadline: Math.floor(Date.now() / 1000) + 60 * 20,
      };

      const tx = await positionManager.mint(params);
      await tx.wait();

      // Reset form
      setAmount0('');
      setAmount1('');
    } catch (error) {
      console.error('Error adding liquidity:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold gradient-text mb-2">Add Liquidity</h2>
        <p className="text-primary-300 text-sm">Provide liquidity and earn trading fees</p>
      </div>

      {/* Wallet Connection Status */}
      {!address && (
        <div className="status-info rounded-2xl p-4">
          <div className="flex items-start space-x-3">
            <div className="text-primary-400 mt-0.5 text-xl">💡</div>
            <div>
              <p className="text-primary-200 font-medium">Connect Your Wallet</p>
              <p className="text-primary-300 text-sm mt-1">
                Connect your wallet to provide liquidity and earn fees.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Token 0 Input */}
        <div>
          <label className="block text-sm font-medium text-primary-200 mb-3">
            WETH Amount
          </label>
          <div className="glass-input p-4 rounded-2xl">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-primary-300">Token Amount</span>
              <span className="text-sm text-primary-400">Balance: --</span>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                value={amount0}
                onChange={(e) => setAmount0(e.target.value)}
                placeholder="0.0"
                className="flex-1 bg-transparent text-2xl font-medium text-white placeholder-primary-400 border-none outline-none"
              />
              <div className="token-selector px-4 py-3 flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">ETH</span>
                </div>
                <span className="font-medium text-white">WETH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Plus Icon */}
        <div className="flex justify-center">
          <div className="p-3 glass-card rounded-2xl">
            <svg className="w-6 h-6 text-primary-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>

        {/* Token 1 Input */}
        <div>
          <label className="block text-sm font-medium text-primary-200 mb-3">
            USDC Amount
          </label>
          <div className="glass-input p-4 rounded-2xl">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-primary-300">Token Amount</span>
              <span className="text-sm text-primary-400">Balance: --</span>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                value={amount1}
                onChange={(e) => setAmount1(e.target.value)}
                placeholder="0.0"
                className="flex-1 bg-transparent text-2xl font-medium text-white placeholder-primary-400 border-none outline-none"
              />
              <div className="token-selector px-4 py-3 flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">USD</span>
                </div>
                <span className="font-medium text-white">USDC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pool Information */}
        {amount0 && amount1 && (
          <div className="glass-card rounded-2xl p-4 space-y-3">
            <h4 className="font-medium text-primary-200 flex items-center space-x-2">
              <span>📊</span>
              <span>Pool Information</span>
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-primary-300">Pool Fee:</span>
                <span className="text-primary-200 font-medium">0.3%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-300">Price Range:</span>
                <span className="text-primary-200 font-medium">Full Range</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary-300">Your Share:</span>
                <span className="text-primary-200 font-medium">-- %</span>
              </div>
            </div>
          </div>
        )}

        {/* Add Liquidity Button */}
        {!address ? (
          <div className="glass-card p-2 rounded-2xl">
            <ConnectButton />
          </div>
        ) : (
          <button
            onClick={addLiquidity}
            disabled={!amount0 || !amount1 || loading}
            className="w-full py-4 px-6 btn-primary rounded-2xl font-semibold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Adding Liquidity...</span>
              </div>
            ) : !amount0 || !amount1 ? (
              "Enter Amounts"
            ) : (
              "Add Liquidity"
            )}
          </button>
        )}

        {/* Benefits Section */}
        <div className="glass-card rounded-2xl p-4">
          <h4 className="font-medium text-primary-200 mb-3 flex items-center space-x-2">
            <span>💰</span>
            <span>Liquidity Provider Benefits</span>
          </h4>
          <ul className="text-sm text-primary-300 space-y-2">
            <li className="flex items-center space-x-2">
              <span className="text-green-400">•</span>
              <span>Earn 0.3% fees from all trades in this pool</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-green-400">•</span>
              <span>Receive an LP NFT representing your position</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-green-400">•</span>
              <span>Withdraw your liquidity anytime</span>
            </li>
            <li className="flex items-center space-x-2">
              <span className="text-green-400">•</span>
              <span>Participate in concentrated liquidity</span>
            </li>
          </ul>
        </div>

        {/* Additional Info */}
        <div className="glass-card rounded-2xl p-4 text-center">
          <div className="flex items-center justify-center space-x-4 text-xs text-primary-400">
            <div className="flex items-center space-x-1">
              <span>🎯</span>
              <span>Concentrated Liquidity</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>🏆</span>
              <span>LP NFTs</span>
            </div>
            <div className="flex items-center space-x-1">
              <span>💎</span>
              <span>Premium Rewards</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 