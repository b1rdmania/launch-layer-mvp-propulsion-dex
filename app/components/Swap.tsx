"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAccount, useChainId, useWalletClient } from "wagmi";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { 
  WRAPPED_S_ADDRESS, 
  WETH_ADDRESS, 
  USDC_ADDRESS,
  QUOTER_V2_ADDRESS, 
  SWAP_ROUTER_ADDRESS,
  POPULAR_PAIRS,
  getTokenInfo,
  formatTokenAmount,
  SILVERSWAP_API_BASE,
  CHAIN_ID
} from "../contracts";
import QuoterV2ABI from "../abis/QuoterV2.json";
import SwapRouterABI from "../abis/SwapRouter.json";

interface TokenInfo {
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  balance?: string;
}

interface SwapQuote {
  amountOut: string;
  priceImpact: number;
  fee: string;
  route: string[];
}

export default function Swap() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient();
  
  // Token selection
  const [tokenIn, setTokenIn] = useState<TokenInfo>({
    address: WRAPPED_S_ADDRESS,
    symbol: "wS",
    name: "Wrapped S",
    decimals: 18,
  });
  const [tokenOut, setTokenOut] = useState<TokenInfo>({
    address: WETH_ADDRESS,
    symbol: "WETH",
    name: "Wrapped Ether",
    decimals: 18,
  });
  
  // Input amounts
  const [amountIn, setAmountIn] = useState("");
  const [amountOut, setAmountOut] = useState("");
  
  // UI states
  const [quote, setQuote] = useState<SwapQuote | null>(null);
  const [loading, setLoading] = useState(false);
  const [swapping, setSwapping] = useState(false);
  const [error, setError] = useState("");
  const [slippage, setSlippage] = useState("0.5");
  const [showTokenSelector, setShowTokenSelector] = useState<'in' | 'out' | null>(null);
  
  // Token balances
  const [balances, setBalances] = useState<Record<string, string>>({});
  
  // Available tokens
  const tokens: TokenInfo[] = [
    { address: WRAPPED_S_ADDRESS, symbol: "wS", name: "Wrapped S", decimals: 18 },
    { address: WETH_ADDRESS, symbol: "WETH", name: "Wrapped Ether", decimals: 18 },
    { address: USDC_ADDRESS, symbol: "USDC", name: "USD Coin", decimals: 6 },
  ];

  // Load token balances
  useEffect(() => {
    if (address && isConnected) {
      loadBalances();
    }
  }, [address, isConnected]);

  // Get quote when amount changes
  useEffect(() => {
    if (amountIn && parseFloat(amountIn) > 0 && tokenIn.address !== tokenOut.address) {
      getQuote();
    } else {
      setQuote(null);
      setAmountOut("");
    }
  }, [amountIn, tokenIn.address, tokenOut.address]);

  const loadBalances = async () => {
    if (!address) return;

    try {
      const provider = new ethers.JsonRpcProvider("https://rpc.soniclabs.com");
      const newBalances: Record<string, string> = {};

      for (const token of tokens) {
        try {
          const tokenContract = new ethers.Contract(
            token.address,
            ['function balanceOf(address) view returns (uint256)'],
            provider
          );
          const balance = await tokenContract.balanceOf(address);
          newBalances[token.address] = formatTokenAmount(balance.toString(), token.decimals);
        } catch (error) {
          console.error(`Error fetching balance for ${token.symbol}:`, error);
          newBalances[token.address] = "0";
        }
      }

      setBalances(newBalances);
    } catch (error) {
      console.error("Error loading balances:", error);
    }
  };

  const getQuote = async () => {
    if (!amountIn || parseFloat(amountIn) === 0) return;

    setLoading(true);
    setError("");

    try {
      // Try SilverSwap API first
      const response = await fetch(`${SILVERSWAP_API_BASE}/quote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tokenIn: tokenIn.address,
          tokenOut: tokenOut.address,
          amountIn: ethers.parseUnits(amountIn, tokenIn.decimals).toString(),
        }),
      });

      if (response.ok) {
        const quoteData = await response.json();
        const amountOutFormatted = formatTokenAmount(quoteData.amountOut, tokenOut.decimals);
        
        setQuote({
          amountOut: quoteData.amountOut,
          priceImpact: quoteData.priceImpact || 0,
          fee: quoteData.fee || "0",
          route: quoteData.route || [tokenIn.symbol, tokenOut.symbol],
        });
        setAmountOut(amountOutFormatted);
      } else {
        // Fallback to on-chain quoter
        await getOnChainQuote();
      }
    } catch (error) {
      console.error("Error getting quote:", error);
      // Fallback to on-chain quoter
      await getOnChainQuote();
    } finally {
      setLoading(false);
    }
  };

  const getOnChainQuote = async () => {
    try {
      const provider = new ethers.JsonRpcProvider("https://rpc.soniclabs.com");
      const quoter = new ethers.Contract(QUOTER_V2_ADDRESS, QuoterV2ABI, provider);

      const amountInWei = ethers.parseUnits(amountIn, tokenIn.decimals);
      
      // Use QuoterV2 for exact input quote
      const params = {
        tokenIn: tokenIn.address,
        tokenOut: tokenOut.address,
        fee: 3000, // 0.3% fee tier
        amountIn: amountInWei,
        sqrtPriceLimitX96: 0,
      };

      const quoteResult = await quoter.quoteExactInputSingle.staticCall(params);
      const amountOutFormatted = formatTokenAmount(quoteResult.amountOut.toString(), tokenOut.decimals);
      
      setQuote({
        amountOut: quoteResult.amountOut.toString(),
        priceImpact: 0.1, // Estimated
        fee: "0.3",
        route: [tokenIn.symbol, tokenOut.symbol],
      });
      setAmountOut(amountOutFormatted);
    } catch (error) {
      console.error("Error getting on-chain quote:", error);
      setError("Unable to get quote. Please try again.");
    }
  };

  const executeSwap = async () => {
    if (!address || !walletClient || !quote) return;

    setSwapping(true);
    setError("");

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const router = new ethers.Contract(SWAP_ROUTER_ADDRESS, SwapRouterABI, signer);

      const amountInWei = ethers.parseUnits(amountIn, tokenIn.decimals);
      const amountOutMinWei = ethers.parseUnits(
        (parseFloat(amountOut) * (1 - parseFloat(slippage) / 100)).toString(),
        tokenOut.decimals
      );

      // Check and approve token if needed
      if (tokenIn.address !== ethers.ZeroAddress) {
        const tokenContract = new ethers.Contract(
          tokenIn.address,
          ['function allowance(address,address) view returns (uint256)', 'function approve(address,uint256) returns (bool)'],
          signer
        );

        const allowance = await tokenContract.allowance(address, SWAP_ROUTER_ADDRESS);
        if (allowance < amountInWei) {
          const approveTx = await tokenContract.approve(SWAP_ROUTER_ADDRESS, amountInWei);
          await approveTx.wait();
        }
      }

      // Execute swap
      const params = {
        tokenIn: tokenIn.address,
        tokenOut: tokenOut.address,
        fee: 3000,
        recipient: address,
        deadline: Math.floor(Date.now() / 1000) + 1200, // 20 minutes
        amountIn: amountInWei,
        amountOutMinimum: amountOutMinWei,
        sqrtPriceLimitX96: 0,
      };

      const swapTx = await router.exactInputSingle(params);
      await swapTx.wait();

      // Show success notification
      showSuccessNotification();

      // Reset form and reload balances
      setAmountIn("");
      setAmountOut("");
      setQuote(null);
      await loadBalances();
      
    } catch (error: any) {
      console.error("Swap failed:", error);
      setError(error.message || "Swap failed. Please try again.");
    } finally {
      setSwapping(false);
    }
  };

  const showSuccessNotification = () => {
    // Create a temporary success notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 z-50 glass-card p-4 rounded-xl animate-slide-up';
    notification.innerHTML = `
      <div class="flex items-center space-x-3">
        <div class="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
          <svg class="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <div>
          <p class="text-white font-medium">Swap Successful!</p>
          <p class="text-gray-400 text-sm">Transaction completed</p>
        </div>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 5000);
  };

  const switchTokens = () => {
    const tempToken = tokenIn;
    setTokenIn(tokenOut);
    setTokenOut(tempToken);
    setAmountIn(amountOut);
    setAmountOut(amountIn);
  };

  const selectToken = (token: TokenInfo, type: 'in' | 'out') => {
    if (type === 'in') {
      setTokenIn(token);
    } else {
      setTokenOut(token);
    }
    setShowTokenSelector(null);
  };

  const formatBalance = (balance: string) => {
    const num = parseFloat(balance);
    if (num === 0) return "0";
    if (num < 0.0001) return "< 0.0001";
    return num.toFixed(4);
  };

  const getPriceImpactColor = (impact: number) => {
    if (impact < 1) return "text-green-400";
    if (impact < 3) return "text-yellow-400";
    return "text-red-400";
  };

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="glass-card p-8 rounded-2xl">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-primary rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Connect Your Wallet</h3>
          <p className="text-gray-300 mb-6">Connect your wallet to start trading</p>
          <ConnectButton />
        </div>
      </div>
    );
  }

  if (chainId !== CHAIN_ID) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
        <div className="glass-card p-8 rounded-2xl">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Wrong Network</h3>
          <p className="text-gray-300 mb-6">Please switch to Sonic Mainnet to use the DEX</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold gradient-text mb-2">Swap Tokens</h2>
        <p className="text-gray-300 text-sm">Trade tokens instantly with minimal slippage</p>
      </div>

      {/* Main Swap Interface */}
      <div className="glass-card p-6 rounded-2xl max-w-md mx-auto">
        {/* Slippage Settings */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-300">Slippage Tolerance</span>
          <div className="flex space-x-2">
            {["0.1", "0.5", "1.0"].map((value) => (
              <button
                key={value}
                onClick={() => setSlippage(value)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                  slippage === value
                    ? 'bg-primary-600 text-white'
                    : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {value}%
              </button>
            ))}
            <input
              type="number"
              value={slippage}
              onChange={(e) => setSlippage(e.target.value)}
              className="w-16 px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-xs text-white text-center"
              step="0.1"
              min="0.1"
              max="50"
            />
          </div>
        </div>

        {/* Token Input */}
        <div className="space-y-2">
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">From</span>
              <span className="text-sm text-gray-400">
                Balance: {formatBalance(balances[tokenIn.address] || "0")}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                value={amountIn}
                onChange={(e) => setAmountIn(e.target.value)}
                placeholder="0.0"
                className="flex-1 bg-transparent text-2xl font-semibold text-white placeholder-gray-500 outline-none"
              />
              <button
                onClick={() => setShowTokenSelector('in')}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 rounded-xl px-3 py-2 transition-colors"
              >
                <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {tokenIn.symbol[0]}
                </div>
                <span className="font-medium text-white">{tokenIn.symbol}</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
            <div className="flex justify-end mt-2">
              <button
                onClick={() => setAmountIn(balances[tokenIn.address] || "0")}
                className="text-xs text-primary-400 hover:text-primary-300 transition-colors"
              >
                Max
              </button>
            </div>
          </div>

          {/* Switch Button */}
          <div className="flex justify-center">
            <button
              onClick={switchTokens}
              className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          {/* Token Output */}
          <div className="bg-white/5 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">To</span>
              <span className="text-sm text-gray-400">
                Balance: {formatBalance(balances[tokenOut.address] || "0")}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                value={amountOut}
                readOnly
                placeholder="0.0"
                className="flex-1 bg-transparent text-2xl font-semibold text-white placeholder-gray-500 outline-none"
              />
              <button
                onClick={() => setShowTokenSelector('out')}
                className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 rounded-xl px-3 py-2 transition-colors"
              >
                <div className="w-6 h-6 bg-gradient-to-r from-secondary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {tokenOut.symbol[0]}
                </div>
                <span className="font-medium text-white">{tokenOut.symbol}</span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Quote Information */}
        {quote && (
          <div className="mt-4 p-4 bg-white/5 rounded-xl">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Price Impact</span>
                <span className={getPriceImpactColor(quote.priceImpact)}>
                  {quote.priceImpact.toFixed(2)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Trading Fee</span>
                <span className="text-white">{quote.fee}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Route</span>
                <span className="text-white">{quote.route.join(" → ")}</span>
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-xl">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Swap Button */}
        <button
          onClick={executeSwap}
          disabled={!amountIn || !amountOut || loading || swapping || !!error}
          className="w-full mt-6 px-6 py-4 bg-gradient-primary hover:shadow-purple disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 relative overflow-hidden group"
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          {swapping ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              <span>Processing Swap...</span>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-pulse w-4 h-4 bg-white/50 rounded-full"></div>
              <span>Getting Quote...</span>
            </div>
          ) : !amountIn ? (
            "Enter Amount"
          ) : !amountOut ? (
            "Invalid Pair"
          ) : parseFloat(amountIn) > parseFloat(balances[tokenIn.address] || "0") ? (
            "Insufficient Balance"
          ) : (
            <span className="flex items-center justify-center space-x-2">
              <span>Swap Tokens</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          )}
        </button>
      </div>

      {/* Token Selector Modal */}
      {showTokenSelector && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="glass-card p-6 rounded-2xl max-w-sm w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Select Token</h3>
              <button
                onClick={() => setShowTokenSelector(null)}
                className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-2">
              {tokens.map((token) => (
                <button
                  key={token.address}
                  onClick={() => selectToken(token, showTokenSelector)}
                  disabled={
                    (showTokenSelector === 'in' && token.address === tokenOut.address) ||
                    (showTokenSelector === 'out' && token.address === tokenIn.address)
                  }
                  className="w-full flex items-center space-x-3 p-3 bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-bold">
                    {token.symbol[0]}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-white">{token.symbol}</p>
                    <p className="text-sm text-gray-400">{token.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white">{formatBalance(balances[token.address] || "0")}</p>
                    <p className="text-xs text-gray-400">Balance</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Popular Pairs */}
      <div className="glass-card p-6 rounded-2xl">
        <h3 className="text-lg font-semibold text-white mb-4">Popular Pairs</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {POPULAR_PAIRS.map((pair, index) => {
            const token0Info = getTokenInfo(pair.token0);
            const token1Info = getTokenInfo(pair.token1);
            return (
              <button
                key={index}
                onClick={() => {
                  setTokenIn({
                    address: pair.token0,
                    symbol: token0Info.symbol,
                    name: token0Info.name,
                    decimals: token0Info.decimals,
                  });
                  setTokenOut({
                    address: pair.token1,
                    symbol: token1Info.symbol,
                    name: token1Info.name,
                    decimals: token1Info.decimals,
                  });
                }}
                className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors text-left"
              >
                <p className="font-medium text-white">{pair.symbol}</p>
                <p className="text-sm text-gray-400">Fee: {pair.fee / 10000}%</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
} 