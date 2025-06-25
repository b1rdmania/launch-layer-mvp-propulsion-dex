"use client";

import React, { useState } from 'react';
import { ethers } from 'ethers';
import { useAccount, useWalletClient } from 'wagmi';
import { WRAPPED_S_ADDRESS, WETH_ADDRESS, NONFUNGIBLE_POSITION_MANAGER_ADDRESS } from '../contracts';
import NonfungiblePositionManagerABI from '../abis/NonfungiblePositionManager.json';

export default function AddLiquidity() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [amount0, setAmount0] = useState('');
  const [amount1, setAmount1] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if Algebra contracts are deployed
  const algebraDeployed = NONFUNGIBLE_POSITION_MANAGER_ADDRESS !== "0x0000000000000000000000000000000000000000";

  const addLiquidity = async () => {
    if (!amount0 || !amount1 || !walletClient || !algebraDeployed) return;

    try {
      setLoading(true);
      setError(null);

      if (!window.ethereum) {
        throw new Error("No ethereum provider found");
      }

      const provider = new ethers.BrowserProvider(window.ethereum as any);
      const signer = await provider.getSigner();
      const positionManager = new ethers.Contract(
        NONFUNGIBLE_POSITION_MANAGER_ADDRESS,
        NonfungiblePositionManagerABI,
        signer
      );

      const amount0Desired = ethers.parseEther(amount0);
      const amount1Desired = ethers.parseEther(amount1);

      const params = {
        token0: WRAPPED_S_ADDRESS,
        token1: WETH_ADDRESS,
        fee: 3000,
        tickLower: -887272, // Full range for simplicity
        tickUpper: 887272,
        amount0Desired,
        amount1Desired,
        amount0Min: 0,
        amount1Min: 0,
        recipient: address,
        deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes
      };

      const tx = await positionManager.mint(params);
      await tx.wait();

      setAmount0('');
      setAmount1('');
      alert('Liquidity added successfully!');
    } catch (err: any) {
      console.error('Add liquidity error:', err);
      setError(err.message || 'Failed to add liquidity');
    } finally {
      setLoading(false);
    }
  };

  if (!address) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Connect Wallet</h2>
          <p className="text-gray-600 mb-6">Please connect your wallet to provide liquidity on Sonic.</p>
          <div className="text-sm text-gray-500">
            <p>• Earn fees from trading activity</p>
            <p>• Get LP NFT representing your position</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-6">Add Liquidity</h2>
      
      {!algebraDeployed && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="text-blue-600 mt-0.5">ℹ️</div>
            <div>
              <p className="text-blue-800 font-medium">Liquidity Provision Coming Soon</p>
              <p className="text-blue-700 text-sm mt-1">
                You'll be able to provide liquidity and earn fees once SwapX (Algebra DEX) launches on Sonic.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* Token 0 Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">wS Amount</label>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Token 0</span>
              <span className="text-sm text-gray-500">Balance: --</span>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                value={amount0}
                onChange={(e) => setAmount0(e.target.value)}
                placeholder="0.0"
                className="flex-1 bg-transparent text-2xl font-medium border-none outline-none"
                disabled={!algebraDeployed}
              />
              <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 border border-gray-200">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                <span className="font-medium">wS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Plus Icon */}
        <div className="flex justify-center">
          <div className="p-2 bg-gray-100 rounded-full">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </div>
        </div>

        {/* Token 1 Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">WETH Amount</label>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Token 1</span>
              <span className="text-sm text-gray-500">Balance: --</span>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                value={amount1}
                onChange={(e) => setAmount1(e.target.value)}
                placeholder="0.0"
                className="flex-1 bg-transparent text-2xl font-medium border-none outline-none"
                disabled={!algebraDeployed}
              />
              <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 border border-gray-200">
                <div className="w-6 h-6 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full"></div>
                <span className="font-medium">WETH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pool Info */}
        {algebraDeployed && amount0 && amount1 && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h4 className="font-medium text-gray-800">Pool Information</h4>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Pool Fee:</span>
                <span>0.3%</span>
              </div>
              <div className="flex justify-between">
                <span>Price Range:</span>
                <span>Full Range</span>
              </div>
              <div className="flex justify-between">
                <span>Your Share:</span>
                <span>-- %</span>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Add Liquidity Button */}
        <button
          onClick={addLiquidity}
          disabled={!amount0 || !amount1 || loading || !algebraDeployed}
          className="w-full py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Adding Liquidity...</span>
            </div>
          ) : !algebraDeployed ? (
            "Coming Soon"
          ) : !amount0 || !amount1 ? (
            "Enter Amounts"
          ) : (
            "Add Liquidity"
          )}
        </button>

        {/* Benefits */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-800 mb-2">💰 Liquidity Provider Benefits</h4>
          <ul className="text-sm text-green-700 space-y-1">
            <li>• Earn 0.3% fees from all trades in this pool</li>
            <li>• Receive an LP NFT representing your position</li>
            <li>• Withdraw your liquidity anytime</li>
            <li>• Participate in concentrated liquidity</li>
          </ul>
        </div>

        {/* Network Info */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>Connected to Sonic Mainnet • Chain ID: 146</p>
          <p>Powered by Algebra Protocol (SwapX)</p>
        </div>
      </div>
    </div>
  );
} 