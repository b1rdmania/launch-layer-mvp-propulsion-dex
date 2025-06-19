import React, { useState } from 'react';
import { useAccount, useWalletClient, usePublicClient } from 'wagmi';
import { POSITION_MANAGER_ADDRESS, TOKEN_LIST } from '../contracts';
import positionManagerAbi from '../abis/NonfungiblePositionManager.json';

export default function AddLiquidity() {
  const [tokenA, setTokenA] = useState(TOKEN_LIST[0].address);
  const [tokenB, setTokenB] = useState(TOKEN_LIST[1].address);
  const [amountA, setAmountA] = useState('');
  const [amountB, setAmountB] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [txStatus, setTxStatus] = useState('');
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();

  const decimalsA = TOKEN_LIST.find(t => t.address === tokenA)?.decimals || 18;
  const decimalsB = TOKEN_LIST.find(t => t.address === tokenB)?.decimals || 18;

  // ... rest of the component logic ...

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-md w-full mx-auto">
      <h2 className="text-2xl font-bold mb-6">Add Liquidity</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Token A:</label>
          <select 
            value={tokenA} 
            onChange={e => setTokenA(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            {TOKEN_LIST.map(t => (
              <option key={t.address} value={t.address}>{t.symbol}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Token B:</label>
          <select 
            value={tokenB} 
            onChange={e => setTokenB(e.target.value)}
            className="w-full p-2 border rounded-lg"
          >
            {TOKEN_LIST.filter(t => t.address !== tokenA).map(t => (
              <option key={t.address} value={t.address}>{t.symbol}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount A:</label>
          <input 
            type="number" 
            value={amountA} 
            onChange={e => setAmountA(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="0.0"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount B:</label>
          <input 
            type="number" 
            value={amountB} 
            onChange={e => setAmountB(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="0.0"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Min Price:</label>
            <input 
              type="number" 
              value={minPrice} 
              onChange={e => setMinPrice(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="0.0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Max Price:</label>
            <input 
              type="number" 
              value={maxPrice} 
              onChange={e => setMaxPrice(e.target.value)}
              className="w-full p-2 border rounded-lg"
              placeholder="0.0"
            />
          </div>
        </div>
        <button 
          onClick={handleAdd} 
          disabled={!amountA || !amountB || !minPrice || !maxPrice}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          Add Liquidity
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