// Contract addresses on Sonic Testnet network
export const CONTRACT_ADDRESSES = {
  // Actual deployed addresses (2025-04-02)
  FACTORY: "0x8e6cB0498930544a6E11e69733D31Eb4bf0c31DE",
  ACCEPTED_TOKEN: "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38", // WS (18 decimals)
  MTOKEN_SOLD: "0x9841350c8ED09792fED824309010777d0Ac4747d", // Mock Token Sold (18 decimals)
  EXAMPLE_RAISE: "0x223533992D6C8e2bAd3D64F814377eFC3128db63", // Updated Raise instance (accepts WS)
  // Keep old addresses for reference if needed
  _MUSDC_DEPRECATED: "0x1B0E3F92A3bFE3648414DC267c99b3dA59DDb7ed", // Mock USDC (6 decimals)
  _OLD_RAISE_DEPRECATED: "0x60F23bF90714639D7CC6959e143faC086145B102", // Old Raise instance (accepted mUSDC)
};

export const NETWORK_CONFIG = {
  chainId: "0xdede", // Sonic Testnet Chain ID (57282 decimal)
  chainName: "Sonic Blaze Testnet",
  nativeCurrency: {
    name: "Sonic",
    symbol: "S",
    decimals: 18,
  },
  rpcUrls: ["https://sonic-testnet.drpc.org"],
  blockExplorerUrls: ["https://testnet.sonicscan.org/"],
};

// Design System Constants - Based on UX & Design Specification
export const DESIGN_SYSTEM = {
  colors: {
    primaryBackground: "#111111", // Deep Dark
    secondaryBackground: "#1A1A1A", // Dark Gray (Card Background)
    primaryText: "#F9F9F9", // Near White
    secondaryText: "#B0B6BD", // Gray (Secondary Text / Borders)
    accentPrimary: "#3277F5", // Blue (Primary Action)
    accentSecondary: "#FF6D3B", // Orange (Secondary Action / Warning)
  },
  fonts: {
    primary: "Inter, sans-serif",
    secondary: "IBM Plex Mono, monospace",
  },
  layout: {
    maxWidth: "1280px",
    padding: "2rem",
    spacingUnit: "8px",
  },
};
