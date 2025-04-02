
// Contract addresses on Sonic Testnet network
export const CONTRACT_ADDRESSES = {
  // Replace with actual addresses when deployed
  FACTORY: '0x8B...cF', // Replace with actual Factory contract address
  MUSDC: '0x1B...ed', // Replace with actual mUSDC token address
};

export const NETWORK_CONFIG = {
  chainId: '0x12c77', // This is for Sonic Testnet (75895 in decimal)
  chainName: 'Sonic Testnet',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18
  },
  rpcUrls: ['https://rpc.sonic.testnet.io'], // Replace with actual RPC URL
  blockExplorerUrls: ['https://explorer.sonic.testnet.io'] // Replace with actual block explorer
};
