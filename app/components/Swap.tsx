"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount, useChainId, useWalletClient } from "wagmi";
import { WRAPPED_S_ADDRESS, WETH_ADDRESS, QUOTER_V2_ADDRESS, SWAP_ROUTER_ADDRESS } from "../contracts";
import QuoterV2ABI from "../abis/QuoterV2.json";
import SwapRouterABI from "../abis/SwapRouter.json";

export default function Swap() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient();
  const [amount, setAmount] = useState("");
  const [quote, setQuote] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [direction, setDirection] = useState<"WS_TO_WETH" | "WETH_TO_WS">("WS_TO_WETH");

  // Check if Algebra contracts are deployed
  const algebraDeployed = QUOTER_V2_ADDRESS !== "0x0000000000000000000000000000000000000000";

  const getQuote = async () => {
    if (!amount || !walletClient || !algebraDeployed) return;
    
    setLoading(true);
    setError(null);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const quoterContract = new ethers.Contract(QUOTER_V2_ADDRESS, QuoterV2ABI, provider);
      
      const amountIn = ethers.parseUnits(
        amount,
        direction === "WS_TO_WETH" ? 18 : 18 // Both tokens are 18 decimals
      );

      const [tokenIn, tokenOut] = direction === "WS_TO_WETH" 
        ? [WRAPPED_S_ADDRESS, WETH_ADDRESS]
        : [WETH_ADDRESS, WRAPPED_S_ADDRESS];

      const quoteResult = await quoterContract.quoteExactInputSingle({
        tokenIn,
        tokenOut,
        amountIn,
        limitSqrtPrice: 0
      });

      const formattedQuote = ethers.formatUnits(
        quoteResult.amountOut || quoteResult,
        18 // Both tokens are 18 decimals
      );
      setQuote(formattedQuote);
    } catch (error) {
      console.error("Error getting quote:", error);
      setError("Failed to get quote. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const executeSwap = async () => {
    if (!amount || !walletClient || !quote || !algebraDeployed) return;
    
    setLoading(true);
    setError(null);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const swapRouter = new ethers.Contract(SWAP_ROUTER_ADDRESS, SwapRouterABI, signer);
      
      const amountIn = ethers.parseUnits(
        amount,
        18 // Both tokens are 18 decimals
      );

      const [tokenIn, tokenOut] = direction === "WS_TO_WETH" 
        ? [WRAPPED_S_ADDRESS, WETH_ADDRESS]
        : [WETH_ADDRESS, WRAPPED_S_ADDRESS];

      const params = {
        tokenIn,
        tokenOut,
        recipient: address,
        deadline: Math.floor(Date.now() / 1000) + 60 * 20, // 20 minutes
        amountIn,
        amountOutMinimum: 0, // Note: In production, this should be calculated with slippage
        limitSqrtPrice: 0
      };

      const tx = await swapRouter.exactInputSingle(params);
      await tx.wait();
      
      // Reset states after successful swap
      setAmount("");
      setQuote(null);
    } catch (error) {
      console.error("Error executing swap:", error);
      setError("Failed to execute swap. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (amount && algebraDeployed) {
      getQuote();
    } else {
      setQuote(null);
    }
  }, [amount, direction, algebraDeployed]);

  if (!algebraDeployed) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Swap Coming Soon</h3>
          <p className="text-gray-600 mb-4">
            SwapX (Algebra DEX) is launching soon on Sonic. Stay tuned for trading functionality!
          </p>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Available Tokens:</strong> wS (Wrapped Sonic), WETH, USDC, USDT
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
          Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder={`Enter amount in ${direction === "WS_TO_WETH" ? "wS" : "WETH"}`}
          className="w-full p-2 border rounded"
        />
      </div>

      <div className="mb-6">
        <button
          onClick={() => setDirection(prev => 
            prev === "WS_TO_WETH" ? "WETH_TO_WS" : "WS_TO_WETH"
          )}
          className="w-full p-2 bg-gray-100 rounded flex items-center justify-center gap-2 hover:bg-gray-200 transition"
        >
          <span>{direction === "WS_TO_WETH" ? "wS → WETH" : "WETH → wS"}</span>
          <span>🔄</span>
        </button>
      </div>

      {quote && (
        <div className="mb-6 p-4 bg-gray-50 rounded">
          <p className="text-sm text-gray-600">You will receive approximately:</p>
          <p className="text-lg font-semibold">
            {quote} {direction === "WS_TO_WETH" ? "WETH" : "wS"}
          </p>
        </div>
      )}

      <button
        onClick={executeSwap}
        disabled={!quote || loading}
        className={`w-full p-3 rounded text-white transition ${
          !quote || loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loading ? "Processing..." : "Swap"}
      </button>
    </div>
  );
} 