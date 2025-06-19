// Sonic Mainnet Contract Addresses
export const WETH_ADDRESS = "0xdB78663Ad25D2C684087adF5993530019141E339";
export const QUOTER_ADDRESS = "0x6d4Ac88d77273F5Af83E1Cc706a8A6700B9CDD1a"; // QuoterV2
export const SWAP_ROUTER_ADDRESS = "0x2e6b9c8D4a0972F87f21437A3AC7E4a1810f5438";
export const POSITION_MANAGER_ADDRESS = "0x5084E9fDF9264489A14E77c011073D757e572bB4";
export const FACTORY_ADDRESS = "0xb860200BD68dc39cEAfd6ebb82883f189f4CdA76";
export const FARMING_CENTER_ADDRESS = "0x967f26d3A2714A55BdD1bD9C6E6ed148527E51d6";

// Constants
export const POOL_INIT_CODE_HASH = "0xf96d2474815c32e070cd63233f06af5413efc5dcb430aee4ff18cc29007c562d";

// Token Addresses
export const USDC_ADDRESS = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
export const WSONIC_ADDRESS = "0x20f60f0F4947A11F71E0ACaF3667733e3054e05A"; // Wrapped Sonic
export const PROPULSION_ADDRESS = "0x"; // TODO: Add when available

// Token List Configuration
export const TOKEN_LIST = [
  { symbol: 'WETH', address: WETH_ADDRESS, decimals: 18 },
  { symbol: 'USDC', address: USDC_ADDRESS, decimals: 6 },
  { symbol: 'wS', address: WSONIC_ADDRESS, decimals: 18 },
] as const; 