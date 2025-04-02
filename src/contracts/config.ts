// Contract addresses on Sonic Testnet network
export const CONTRACT_ADDRESSES = {
  // Actual deployed addresses (2025-04-02)
  FACTORY: '0x8BAE780580c388f6F7eDA2d6a96D5cD6B0ebDbcF',
  MUSDC: '0x1B0E3F92A3bFE3648414DC267c99b3dA59DDb7ed', // Mock USDC (6 decimals)
  MTOKEN_SOLD: '0x06726427c7326d9AB606D1E81A036D041CEcbdcD', // Mock Token Sold (18 decimals)
  EXAMPLE_RAISE: '0x60F23bF90714639D7CC6959e143faC086145B102', // Example deployed Raise instance
};

export const NETWORK_CONFIG = {
  chainId: '0xdfc2', // Sonic Testnet Chain ID (57282 decimal)
  chainName: 'Sonic Testnet',
  nativeCurrency: {
    name: 'Sonic',
    symbol: 'S', // Or SONIC?
    decimals: 18
  },
  rpcUrls: ['https://sonic-testnet.drpc.org'], // Updated RPC URL
  blockExplorerUrls: ['https://explorer.sonic.technology'] // Updated block explorer
};
