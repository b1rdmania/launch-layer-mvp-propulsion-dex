import React, { useEffect, useState } from 'react';
import { useAccount, useWalletClient, usePublicClient } from 'wagmi';
import { POSITION_MANAGER_ADDRESS, TOKEN_LIST } from '../contracts';
import positionManagerAbi from '../abis/NonfungiblePositionManager.json';

export default function MyPositions() {
  const { address } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const [positions, setPositions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [txStatus, setTxStatus] = useState('');

  // ... rest of the component logic ...

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-4xl w-full mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Positions</h2>
      {loading && (
        <div className="text-center py-8 text-gray-500">Loading positions...</div>
      )}
      {!loading && positions.length === 0 && (
        <div className="text-center py-8 text-gray-500">No positions found.</div>
      )}
      {!loading && positions.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2 text-left">Token ID</th>
                <th className="px-4 py-2 text-left">Liquidity</th>
                <th className="px-4 py-2 text-left">Tick Range</th>
                <th className="px-4 py-2 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {positions.map(({ tokenId, pos }) => (
                <tr key={tokenId.toString()} className="border-b">
                  <td className="px-4 py-3">{tokenId.toString()}</td>
                  <td className="px-4 py-3">{pos[7]?.toString()}</td>
                  <td className="px-4 py-3">{pos[4]?.toString()} to {pos[5]?.toString()}</td>
                  <td className="px-4 py-3 text-right">
                    <button 
                      onClick={() => handleRemove(tokenId)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    >
                      Remove & Collect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {txStatus && (
        <div className={`mt-4 p-4 rounded-lg ${txStatus.includes('failed') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {txStatus}
        </div>
      )}
    </div>
  );
} 