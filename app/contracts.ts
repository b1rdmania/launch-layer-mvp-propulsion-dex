// Sonic Mainnet Configuration
export const SONIC_CHAIN_ID = 146;

// Sonic Native Token Addresses (from Sonic official docs)
export const WRAPPED_S_ADDRESS = "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38"; // Wrapped S (wS)
export const WETH_ADDRESS = "0x50c42dEAcD8Fc9773493ED674b675bE577f2634b"; // Wrapped Ether (WETH)
export const USDC_ADDRESS = "0x29219dd400f2Bf60E5a23d13Be72B486D4038894"; // USDC (Bridged)
export const USDT_ADDRESS = "0x6047828dc181963ba44974801ff68e538da5eaf9"; // USDT (Bridged)

// SilverSwap (Algebra DEX) Contract Addresses - DEPLOYED ON SONIC!
// Source: https://docs.silverswap.io/silverswap/technical-details/editor
export const QUOTER_V2_ADDRESS = "0xe1181313a39d850d3A20F11FF1A6a94a29A09404"; // SilverSwap Quoter
export const SWAP_ROUTER_ADDRESS = "0x4882198dd2064D1E35b24735e6B9E5e3B45AcD6b"; // SilverSwap Router
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = "0x5084E9fDF9264489A14E77c011073D757e572bB4"; // SilverSwap NFT Position Manager

// Additional SilverSwap Contracts
export const FACTORY_ADDRESS = "0xb860200BD68dc39cEAfd6ebb82883f189f4CdA76"; // SilverSwap Factory
export const VAULT_ADDRESS = "0x5bE5f71bC89a2E5Fdbbb2D9Aeff1F4a38d5870F7"; // SilverSwap Vault
export const POOL_DEPLOYER_ADDRESS = "0x98AF00a67F5cC0b362Da34283D7d32817F6c9A29"; // SilverSwap Pool Deployer

// Pool Configuration
export const POOL_INIT_CODE_HASH = "0x6ec6c9c8091d160c0aa74b2b14ba9c1717e95093bd3ac085cee99a49aab294a4";

// Token List Configuration for Sonic
export const TOKEN_LIST = [
  { symbol: 'wS', address: WRAPPED_S_ADDRESS, decimals: 18 },
  { symbol: 'WETH', address: WETH_ADDRESS, decimals: 18 },
  { symbol: 'USDC', address: USDC_ADDRESS, decimals: 6 },
  { symbol: 'USDT', address: USDT_ADDRESS, decimals: 6 },
] as const; 