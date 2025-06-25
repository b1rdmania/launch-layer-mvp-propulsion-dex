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

  useEffect(() => {
    const fetchPositions = async () => {
      if (!address || !walletClient || !algebraDeployed) {
        setPositions([]);
        setLoading(false);
        return;
      }

      try {
        setError(null);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const positionManager = new ethers.Contract(
          NONFUNGIBLE_POSITION_MANAGER_ADDRESS,
          NonfungiblePositionManagerABI,
          provider
        );

        // Get the balance of positions
        const balance = await positionManager.balanceOf(address);
        const positionPromises = [];

        // Fetch each position
        for (let i = 0; i < balance; i++) {
          const tokenId = await positionManager.tokenOfOwnerByIndex(address, i);
          const position = await positionManager.positions(tokenId);
          positionPromises.push({
            id: tokenId.toString(),
            token0: position.token0,
            token1: position.token1,
            fee: position.fee,
            liquidity: position.liquidity.toString(),
            tickLower: position.tickLower,
            tickUpper: position.tickUpper,
          });
        }

        const fetchedPositions = await Promise.all(positionPromises);
        setPositions(fetchedPositions);
      } catch (error) {
        console.error("Error fetching positions:", error);
        setError("Failed to fetch positions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPositions();
  }, [address, walletClient, algebraDeployed]);

  if (!algebraDeployed) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Positions Coming Soon</h3>
          <p className="text-gray-600 mb-4">
            Your liquidity positions will appear here once SwapX (Algebra DEX) launches on Sonic.
          </p>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-800">
              <strong>Features:</strong> NFT-based positions, fee collection, and yield tracking
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-center text-gray-600">Loading positions...</p>
      </div>
    );
  }

  if (!address) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-center text-gray-600">Please connect your wallet to view positions</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  if (positions.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <p className="text-center text-gray-600">No positions found</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Your Positions</h2>
      <div className="space-y-4">
        {positions.map((position) => (
          <div
            key={position.id}
            className="border p-4 rounded-lg hover:bg-gray-50 transition"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Position ID</p>
                <p className="font-medium">{position.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Fee Tier</p>
                <p className="font-medium">{position.fee / 10000}%</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Price Range</p>
                <p className="font-medium">
                  {position.tickLower} - {position.tickUpper}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Liquidity</p>
                <p className="font-medium">{position.liquidity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 