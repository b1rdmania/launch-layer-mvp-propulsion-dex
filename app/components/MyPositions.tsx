"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount, useWalletClient } from "wagmi";
import { NONFUNGIBLE_POSITION_MANAGER_ADDRESS } from "../contracts";
import NonfungiblePositionManagerABI from "../abis/NonfungiblePositionManager.json";

interface Position {
  id: string;
  token0: string;
  token1: string;
  fee: number;
  liquidity: string;
  tickLower: number;
  tickUpper: number;
}

export default function MyPositions() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if Algebra contracts are deployed
  const algebraDeployed = NONFUNGIBLE_POSITION_MANAGER_ADDRESS !== "0x0000000000000000000000000000000000000000";

  const loadPositions = async () => {
    if (!address || !algebraDeployed) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (!window.ethereum) {
        throw new Error("No ethereum provider found");
      }

      const provider = new ethers.BrowserProvider(window.ethereum as any);
      const positionManager = new ethers.Contract(
        NONFUNGIBLE_POSITION_MANAGER_ADDRESS,
        NonfungiblePositionManagerABI,
        provider
      );

      // Get balance of LP NFTs for the user
      const balance = await positionManager.balanceOf(address);
      const positionsData: Position[] = [];

      for (let i = 0; i < balance; i++) {
        const tokenId = await positionManager.tokenOfOwnerByIndex(address, i);
        const position = await positionManager.positions(tokenId);

        positionsData.push({
          id: tokenId.toString(),
          token0: position.token0,
          token1: position.token1,
          fee: position.fee,
          liquidity: position.liquidity.toString(),
          tickLower: position.tickLower,
          tickUpper: position.tickUpper,
        });
      }

      setPositions(positionsData);
    } catch (err: any) {
      console.error("Load positions error:", err);
      setError(err.message || "Failed to load positions");
    } finally {
      setLoading(false);
    }
  };

  const removePosition = async (positionId: string) => {
    if (!walletClient || !algebraDeployed) return;

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

      // First decrease liquidity to 0
      const position = positions.find(p => p.id === positionId);
      if (!position) return;

      const decreaseParams = {
        tokenId: positionId,
        liquidity: position.liquidity,
        amount0Min: 0,
        amount1Min: 0,
        deadline: Math.floor(Date.now() / 1000) + 60 * 20,
      };

      const decreaseTx = await positionManager.decreaseLiquidity(decreaseParams);
      await decreaseTx.wait();

      // Then collect fees and tokens
      const collectParams = {
        tokenId: positionId,
        recipient: address,
        amount0Max: "340282366920938463463374607431768211455", // MaxUint128
        amount1Max: "340282366920938463463374607431768211455", // MaxUint128
      };

      const collectTx = await positionManager.collect(collectParams);
      await collectTx.wait();

      // Finally burn the NFT
      const burnTx = await positionManager.burn(positionId);
      await burnTx.wait();

      // Reload positions
      await loadPositions();
      alert("Position removed successfully!");
    } catch (err: any) {
      console.error("Remove position error:", err);
      setError(err.message || "Failed to remove position");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      loadPositions();
    }
  }, [address, algebraDeployed]);

  if (!address) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Connect Wallet</h2>
          <p className="text-gray-600 mb-6">Please connect your wallet to view your liquidity positions.</p>
          <div className="text-sm text-gray-500">
            <p>• View your LP NFT positions</p>
            <p>• Manage liquidity and collect fees</p>
          </div>
        </div>
      </div>
    );
  }

  if (!algebraDeployed) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Positions Coming Soon</h2>
          <p className="text-gray-600 mb-6">
            Liquidity position management will be available once SwapX (Algebra DEX) launches on Sonic.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="text-blue-600 mt-0.5">💡</div>
              <div className="text-left">
                <p className="text-blue-800 font-medium">What you'll be able to do:</p>
                <ul className="text-blue-700 text-sm mt-2 space-y-1">
                  <li>• View all your LP NFT positions</li>
                  <li>• Track fees earned from trading</li>
                  <li>• Manage position ranges and liquidity</li>
                  <li>• Collect accumulated fees</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">My Positions</h2>
        <button
          onClick={loadPositions}
          disabled={loading}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
              <span>Refreshing...</span>
            </div>
          ) : (
            "Refresh"
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm mb-6">
          {error}
        </div>
      )}

      {loading && positions.length === 0 ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your positions...</p>
        </div>
      ) : positions.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">No Positions Found</h3>
          <p className="text-gray-600 mb-6">You don't have any liquidity positions yet.</p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-left">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Get started by:</strong>
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Adding liquidity to a trading pair</li>
              <li>• Choosing your preferred price range</li>
              <li>• Earning fees from trading activity</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {positions.map((position, index) => (
            <div key={position.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    Position #{position.id}
                  </h3>
                  <p className="text-sm text-gray-600">LP NFT Position</p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Fee Tier</div>
                  <div className="font-medium">{position.fee / 10000}%</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-500 mb-1">Token Pair</div>
                  <div className="font-medium text-gray-800">
                    {position.token0.slice(0, 6)}...{position.token0.slice(-4)} / {position.token1.slice(0, 6)}...{position.token1.slice(-4)}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-500 mb-1">Liquidity</div>
                  <div className="font-medium text-gray-800">
                    {parseFloat(ethers.formatEther(position.liquidity)).toFixed(4)}
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-sm text-gray-500 mb-1">Price Range</div>
                  <div className="font-medium text-gray-800">
                    {position.tickLower} - {position.tickUpper}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
                  Collect Fees
                </button>
                <button className="flex-1 py-2 px-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors">
                  Increase Liquidity
                </button>
                <button 
                  onClick={() => removePosition(position.id)}
                  disabled={loading}
                  className="flex-1 py-2 px-4 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  Remove Position
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Network Info */}
      <div className="text-center text-xs text-gray-500 space-y-1 mt-6 pt-6 border-t border-gray-200">
        <p>Connected to Sonic Mainnet • Chain ID: 146</p>
        <p>Powered by Algebra Protocol (SwapX)</p>
      </div>
    </div>
  );
} 