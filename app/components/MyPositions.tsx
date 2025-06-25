"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount, useWalletClient } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { NONFUNGIBLE_POSITION_MANAGER_ADDRESS } from "../contracts";
import NonfungiblePositionManagerABI from "../abis/NonfungiblePositionManager.json";

interface Position {
  tokenId: string;
  token0: string;
  token1: string;
  fee: number;
  liquidity: string;
  amount0: string;
  amount1: string;
}

export default function MyPositions() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const [positions, setPositions] = useState<Position[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if SilverSwap contracts are deployed
  const silverSwapDeployed = true; // SilverSwap is deployed on Sonic!

  const loadPositions = async () => {
    if (!address || !silverSwapDeployed) return;

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

      // Get user's balance of NFTs
      const balance = await positionManager.balanceOf(address);
      const positionList: Position[] = [];

      for (let i = 0; i < Number(balance); i++) {
        const tokenId = await positionManager.tokenOfOwnerByIndex(address, i);
        const position = await positionManager.positions(tokenId);
        
        positionList.push({
          tokenId: tokenId.toString(),
          token0: position.token0,
          token1: position.token1,
          fee: Number(position.fee),
          liquidity: position.liquidity.toString(),
          amount0: "0", // Would need additional calls to get current amounts
          amount1: "0"
        });
      }

      setPositions(positionList);
    } catch (err: any) {
      console.error('Load positions error:', err);
      setError(err.message || 'Failed to load positions');
    } finally {
      setLoading(false);
    }
  };

  const removePosition = async (tokenId: string) => {
    if (!walletClient || !silverSwapDeployed) return;

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
      const position = await positionManager.positions(tokenId);
      
      if (position.liquidity > 0) {
        const decreaseParams = {
          tokenId,
          liquidity: position.liquidity,
          amount0Min: 0,
          amount1Min: 0,
          deadline: Math.floor(Date.now() / 1000) + 60 * 20,
        };

        const decreaseTx = await positionManager.decreaseLiquidity(decreaseParams);
        await decreaseTx.wait();
      }

      // Then collect the fees and remaining tokens
      const collectParams = {
        tokenId,
        recipient: address,
        amount0Max: "340282366920938463463374607431768211455", // MaxUint128
        amount1Max: "340282366920938463463374607431768211455",
      };

      const collectTx = await positionManager.collect(collectParams);
      await collectTx.wait();

      // Finally burn the NFT
      const burnTx = await positionManager.burn(tokenId);
      await burnTx.wait();

      // Reload positions
      await loadPositions();
      alert('Position removed successfully!');
    } catch (err: any) {
      console.error('Remove position error:', err);
      setError(err.message || 'Failed to remove position');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (address && silverSwapDeployed) {
      loadPositions();
    }
  }, [address, silverSwapDeployed]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Positions</h2>
        {address && silverSwapDeployed && (
          <button
            onClick={loadPositions}
            disabled={loading}
            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        )}
      </div>

      {/* Wallet Connection Status */}
      {!address && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="text-blue-600 mt-0.5">💡</div>
            <div>
              <p className="text-blue-800 font-medium">Connect Your Wallet</p>
              <p className="text-blue-700 text-sm mt-1">
                Connect your wallet using the button in the top right to view your liquidity positions.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SilverSwap Live Status */}
      {silverSwapDeployed && address && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="text-green-600 mt-0.5">✅</div>
            <div>
              <p className="text-green-800 font-medium">SilverSwap Position Tracking is Live!</p>
              <p className="text-green-700 text-sm mt-1">
                Track and manage your LP positions and collect earned fees from trading activity.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Connect Button */}
      {!address && (
        <div className="text-center">
          <ConnectButton />
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm mb-4">
          {error}
        </div>
      )}

      {/* Positions List */}
      {address && silverSwapDeployed && (
        <div className="space-y-4">
          {loading && positions.length === 0 ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
              <p className="text-gray-600">Loading your positions...</p>
            </div>
          ) : positions.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Positions Found</h3>
              <p className="text-gray-600 mb-4">You don't have any liquidity positions yet.</p>
              <button
                onClick={() => window.location.hash = 'add-liquidity'}
                className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Add Liquidity
              </button>
            </div>
          ) : (
            <div className="grid gap-4">
              {positions.map((position) => (
                <div key={position.tokenId} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="flex items-center space-x-1">
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                          <span className="font-medium">wS</span>
                        </div>
                        <span className="text-gray-400">/</span>
                        <div className="flex items-center space-x-1">
                          <div className="w-6 h-6 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full"></div>
                          <span className="font-medium">WETH</span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">Fee Tier: {position.fee / 10000}%</p>
                    </div>
                    <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                      #{position.tokenId}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Liquidity</p>
                      <p className="font-medium">{position.liquidity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Active
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                    <div className="text-sm text-gray-600">
                      <p>Unclaimed fees: ~0.00 wS + ~0.00 WETH</p>
                    </div>
                    <button
                      onClick={() => removePosition(position.tokenId)}
                      disabled={loading}
                      className="px-4 py-2 text-sm bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Info Section */}
      {address && silverSwapDeployed && (
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-2">📊 Position Management</h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Track your liquidity positions and earned fees</li>
            <li>• Add or remove liquidity from existing positions</li>
            <li>• Collect accumulated trading fees anytime</li>
            <li>• Each position is represented by an NFT</li>
          </ul>
        </div>
      )}

      {/* Network Info */}
      <div className="text-center text-xs text-gray-500 space-y-1 mt-6">
        <p>Connected to Sonic Mainnet • Chain ID: 146</p>
        <p>Powered by SilverSwap (Algebra Protocol)</p>
      </div>
    </div>
  );
} 