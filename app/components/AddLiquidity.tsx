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
    if (!amount0 || !amount1 || !walletClient || !address || !algebraDeployed) return;

    setLoading(true);
    setError(null);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const positionManager = new ethers.Contract(
        NONFUNGIBLE_POSITION_MANAGER_ADDRESS,
        NonfungiblePositionManagerABI,
        signer
      );

      const amount0Desired = ethers.parseUnits(amount0, 18); // wS decimals
      const amount1Desired = ethers.parseUnits(amount1, 18); // WETH decimals

      const params = {
        token0: WRAPPED_S_ADDRESS,
        token1: WETH_ADDRESS,
        tickLower: -887272,  // These are example ticks, should be calculated based on price range
        tickUpper: 887272,
        amount0Desired,
        amount1Desired,
        amount0Min: 0,       // In production, should include slippage protection
        amount1Min: 0,
        recipient: address,
        deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes
      };

      const tx = await positionManager.mint(params);
      await tx.wait();

      // Reset form
      setAmount0('');
      setAmount1('');
    } catch (error) {
      console.error('Error adding liquidity:', error);
      setError('Failed to add liquidity. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!algebraDeployed) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Liquidity Provision Coming Soon</h3>
          <p className="text-gray-600 mb-4">
            Liquidity provision will be available once SwapX (Algebra DEX) launches on Sonic.
          </p>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Features:</strong> Concentrated liquidity, dynamic fees, and yield farming
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          wS Amount
        </label>
        <input
          type="number"
          value={amount0}
          onChange={(e) => setAmount0(e.target.value)}
          placeholder="Enter wS amount"
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          WETH Amount
        </label>
        <input
          type="number"
          value={amount1}
          onChange={(e) => setAmount1(e.target.value)}
          placeholder="Enter WETH amount"
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        onClick={addLiquidity}
        disabled={!amount0 || !amount1 || loading}
        className={`w-full p-3 rounded text-white transition ${
          !amount0 || !amount1 || loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : "Add Liquidity"}
      </button>
    </div>
  );
} 