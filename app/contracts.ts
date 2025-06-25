// Sonic Mainnet Configuration
export const SONIC_CHAIN_ID = 146;

// Sonic Native Token Addresses (from Sonic official docs)
export const WRAPPED_S_ADDRESS = "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38"; // Wrapped S (wS)
export const WETH_ADDRESS = "0x50c42dEAcD8Fc9773493ED674b675bE577f2634b"; // Wrapped Ether (WETH)
export const USDC_ADDRESS = "0x29219dd400f2Bf60E5a23d13Be72B486D4038894"; // USDC (Bridged)
export const USDT_ADDRESS = "0x6047828dc181963ba44974801ff68e538da5eaf9"; // USDT (Bridged)

// Algebra Protocol Addresses (SwapX/Future DEX deployment)
// TODO: Update these when SwapX or other Algebra DEX launches on Sonic
export const QUOTER_V2_ADDRESS = "0x0000000000000000000000000000000000000000"; // Placeholder
export const SWAP_ROUTER_ADDRESS = "0x0000000000000000000000000000000000000000"; // Placeholder
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = "0x0000000000000000000000000000000000000000"; // Placeholder

// Pool Constants (Standard Algebra values)
export const POOL_INIT_CODE_HASH = "0x6ec6c9c8091d160c0aa74b2b14ba9c1717e95093bd3ac085cee99a49aab294a4";

// Token List Configuration for Sonic
export const TOKEN_LIST = [
  { symbol: 'wS', address: WRAPPED_S_ADDRESS, decimals: 18 },
  { symbol: 'WETH', address: WETH_ADDRESS, decimals: 18 },
  { symbol: 'USDC', address: USDC_ADDRESS, decimals: 6 },
  { symbol: 'USDT', address: USDT_ADDRESS, decimals: 6 },
] as const; 