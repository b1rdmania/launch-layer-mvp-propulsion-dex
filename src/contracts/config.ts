
// Contract addresses on Sonic Testnet network
export const CONTRACT_ADDRESSES = {
  // Actual deployed addresses (2025-04-02)
  FACTORY: '0x8BAE780580c388f6F7eDA2d6a96D5cD6B0ebDbcF',
  ACCEPTED_TOKEN: '0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38', // WS (18 decimals)
  MTOKEN_SOLD: '0x06726427c7326d9AB606D1E81A036D041CEcbdcD', // Mock Token Sold (18 decimals)
  EXAMPLE_RAISE: '0x6226356cA224cD55d5f4Fec2B51B89d57cf98060', // Updated Raise instance (accepts WS)
  // Keep old addresses for reference if needed
  _MUSDC_DEPRECATED: '0x1B0E3F92A3bFE3648414DC267c99b3dA59DDb7ed', // Mock USDC (6 decimals)
  _OLD_RAISE_DEPRECATED: '0x60F23bF90714639D7CC6959e143faC086145B102', // Old Raise instance (accepted mUSDC)
};

export const NETWORK_CONFIG = {
  chainId: '0xdfc2', // Sonic Testnet Chain ID (57282 decimal)
  chainName: 'Sonic Testnet',
  nativeCurrency: {
    name: 'Sonic',
    symbol: 'S',
    decimals: 18
  },
  rpcUrls: ['https://sonic-testnet.drpc.org'],
  blockExplorerUrls: ['https://explorer.sonic.technology']
};

// Design System Constants - Based on UX & Design Specification
export const DESIGN_SYSTEM = {
  colors: {
    primaryBackground: '#111111', // Deep Dark
    secondaryBackground: '#1A1A1A', // Dark Gray (Card Background)
    primaryText: '#F9F9F9', // Near White
    secondaryText: '#B0B6BD', // Gray (Secondary Text / Borders)
    accentPrimary: '#3277F5', // Blue (Primary Action)
    accentSecondary: '#FF6D3B', // Orange (Secondary Action / Warning)
  },
  fonts: {
    primary: 'Inter, sans-serif',
    secondary: 'IBM Plex Mono, monospace',
  },
  layout: {
    maxWidth: '1280px',
    padding: '2rem',
    spacingUnit: '8px',
  }
};
