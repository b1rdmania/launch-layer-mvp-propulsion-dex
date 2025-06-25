"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount, useChainId, useWalletClient } from "wagmi";
import { ConnectButton } from '@rainbow-me/rainbowkit';
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

  // Check if we're on Sonic and if SilverSwap contracts are deployed
  const isCorrectNetwork = chainId === 146; // Sonic mainnet
  const silverSwapDeployed = true; // SilverSwap is deployed on Sonic!

  const getQuote = async () => {
    if (!amount || !isCorrectNetwork) return;
    
    if (!silverSwapDeployed) {
      setError("SilverSwap not available. Please check your network connection.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (!window.ethereum) {
        throw new Error("No ethereum provider found");
      }

      const provider = new ethers.BrowserProvider(window.ethereum as any);
      const quoter = new ethers.Contract(QUOTER_V2_ADDRESS, QuoterV2ABI, provider);

      const amountIn = ethers.parseEther(amount);
      const result = await quoter.quoteExactInputSingle.staticCall({
        tokenIn: WRAPPED_S_ADDRESS,
        tokenOut: WETH_ADDRESS,
        fee: 3000,
        amountIn: amountIn,
        sqrtPriceLimitX96: 0,
      });

      setQuote(ethers.formatEther(result.amountOut));
    } catch (err: any) {
      console.error("Quote error:", err);
      setError(err.message || "Failed to get quote");
    } finally {
      setLoading(false);
    }
  };

  const executeSwap = async () => {
    if (!amount || !walletClient || !silverSwapDeployed) return;

    try {
      setLoading(true);
      setError(null);

      if (!window.ethereum) {
        throw new Error("No ethereum provider found");
      }

      const provider = new ethers.BrowserProvider(window.ethereum as any);
      const signer = await provider.getSigner();
      const router = new ethers.Contract(SWAP_ROUTER_ADDRESS, SwapRouterABI, signer);

      const amountIn = ethers.parseEther(amount);
      const amountOutMinimum = quote ? ethers.parseEther((parseFloat(quote) * 0.95).toString()) : 0;

      const params = {
        tokenIn: WRAPPED_S_ADDRESS,
        tokenOut: WETH_ADDRESS,
        fee: 3000,
        recipient: address,
        deadline: Math.floor(Date.now() / 1000) + 60 * 20,
        amountIn: amountIn,
        amountOutMinimum: amountOutMinimum,
        sqrtPriceLimitX96: 0,
      };

      const tx = await router.exactInputSingle(params);
      await tx.wait();

      setAmount("");
      setQuote(null);
      alert("Swap successful!");
    } catch (err: any) {
      console.error("Swap error:", err);
      setError(err.message || "Swap failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (amount && isCorrectNetwork) {
      const timeoutId = setTimeout(getQuote, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [amount, isCorrectNetwork]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold mb-6">Swap Tokens</h2>
      
      {/* Wallet Connection Status */}
      {!address && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="text-blue-600 mt-0.5">💡</div>
            <div>
              <p className="text-blue-800 font-medium">Connect Your Wallet</p>
              <p className="text-blue-700 text-sm mt-1">
                Connect your wallet using the button in the top right to start trading on Sonic.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Network Warning */}
      {address && !isCorrectNetwork && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="text-orange-600 mt-0.5">⚠️</div>
            <div>
              <p className="text-orange-800 font-medium">Wrong Network</p>
              <p className="text-orange-700 text-sm mt-1">
                Please switch to Sonic Mainnet (Chain ID: 146) to use the DEX.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* SilverSwap Live Status */}
      {silverSwapDeployed && isCorrectNetwork && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <div className="text-green-600 mt-0.5">✅</div>
            <div>
              <p className="text-green-800 font-medium">SilverSwap is Live!</p>
              <p className="text-green-700 text-sm mt-1">
                Trade with deep liquidity and low fees on Sonic's premier DEX powered by Algebra Protocol.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {/* From Token */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">You pay</span>
              <span className="text-sm text-gray-500">Balance: --</span>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="flex-1 bg-transparent text-2xl font-medium border-none outline-none"
              />
              <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 border border-gray-200">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                <span className="font-medium">wS</span>
              </div>
            </div>
          </div>
        </div>

        {/* Swap Direction Button */}
        <div className="flex justify-center">
          <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>
        </div>

        {/* To Token */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">You receive</span>
              <span className="text-sm text-gray-500">Balance: --</span>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={quote || ""}
                placeholder="0.0"
                className="flex-1 bg-transparent text-2xl font-medium border-none outline-none"
                readOnly
              />
              <div className="flex items-center space-x-2 bg-white rounded-lg px-3 py-2 border border-gray-200">
                <div className="w-6 h-6 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full"></div>
                <span className="font-medium">WETH</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quote Info */}
        {quote && (
          <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Exchange Rate:</span>
              <span>1 wS = {(parseFloat(quote) / parseFloat(amount || "1")).toFixed(6)} WETH</span>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Swap Button */}
        {!address ? (
          <div className="text-center">
            <ConnectButton />
          </div>
        ) : (
          <button
            onClick={executeSwap}
            disabled={!amount || loading || !silverSwapDeployed || !quote || !isCorrectNetwork}
            className="w-full py-3 px-4 bg-black text-white rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                <span>Processing...</span>
              </div>
            ) : !isCorrectNetwork ? (
              "Switch to Sonic Network"
            ) : !silverSwapDeployed ? (
              "SilverSwap Unavailable"
            ) : !amount ? (
              "Enter Amount"
            ) : !quote ? (
              "Get Quote"
            ) : (
              "Swap Tokens"
            )}
          </button>
        )}

        {/* Network Info */}
        <div className="text-center text-xs text-gray-500 space-y-1">
          <p>Connected to Sonic Mainnet • Chain ID: 146</p>
          <p>Powered by SilverSwap (Algebra Protocol)</p>
        </div>
      </div>
    </div>
  );
} 