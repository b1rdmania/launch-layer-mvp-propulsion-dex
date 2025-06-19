import React, { useState } from 'react';
import { useAccount, useWalletClient, usePublicClient } from 'wagmi';
import { QUOTER_ADDRESS, SWAP_ROUTER_ADDRESS, TOKEN_LIST } from '../contracts';
import quoterAbi from '../abis/QuoterV2.json';
import routerAbi from '../abis/SwapRouter.json';

export default function Swap() {
  const [tokenIn, setTokenIn] = useState(TOKEN_LIST[0].address);
  const [tokenOut, setTokenOut] = useState(TOKEN_LIST[1].address);
  const [amountIn, setAmountIn] = useState('');
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);
  const [txStatus, setTxStatus] = useState('');
  const publicClient = usePublicClient();
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();

  const decimalsIn = TOKEN_LIST.find(t => t.address === tokenIn)?.decimals || 18;
  const decimalsOut = TOKEN_LIST.find(t => t.address === tokenOut)?.decimals || 18;

  // ... rest of the component code ...
  
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold mb-6">Swap</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From:</label>
          <select 
            value={tokenIn} 
            onChange={e => setTokenIn(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            {TOKEN_LIST.map(t => (
              <option key={t.address} value={t.address}>{t.symbol}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">To:</label>
          <select 
            value={tokenOut} 
            onChange={e => setTokenOut(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            {TOKEN_LIST.filter(t => t.address !== tokenIn).map(t => (
              <option key={t.address} value={t.address}>{t.symbol}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount:</label>
          <div className="flex gap-2">
            <input 
              type="number" 
              value={amountIn} 
              onChange={e => setAmountIn(e.target.value)}
              className="flex-1 p-2 border rounded-lg"
              placeholder="0.0"
            />
            <button 
              onClick={handleQuote} 
              disabled={!amountIn || loading}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50"
            >
              {loading ? 'Quoting...' : 'Get Quote'}
            </button>
          </div>
        </div>
        {quote && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="font-medium">Estimated Output:</p>
            <p className="text-lg">
              {quote} {TOKEN_LIST.find(t => t.address === tokenOut)?.symbol}
            </p>
          </div>
        )}
        <button 
          onClick={handleSwap} 
          disabled={!amountIn || !quote}
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          Swap
        </button>
        {txStatus && (
          <div className={`p-4 rounded-lg ${txStatus.includes('failed') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            {txStatus}
          </div>
        )}
      </div>
    </div>
  );
} 