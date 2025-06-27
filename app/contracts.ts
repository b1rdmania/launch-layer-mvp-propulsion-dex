// Sonic Mainnet Configuration
export const CHAIN_ID = 146;
export const RPC_URL = "https://rpc.soniclabs.com";

// Sonic Token Addresses
export const WRAPPED_S_ADDRESS = "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38"; // Wrapped S (wS)
export const WETH_ADDRESS = "0x50c42dEAcD8Fc9773493ED674b675bE577f2634b"; // WETH on Sonic
export const USDC_ADDRESS = "0x29219dd400f2Bf60E5a23d13Be72B486D4038894"; // USDC on Sonic
export const USDT_ADDRESS = "0x6047828dc181963ba44974801ff68e538da5eaf9"; // USDT on Sonic

// Algebra DEX Contract Addresses (SilverSwap on Sonic)
export const ALGEBRA_FACTORY_ADDRESS = "0x8c1eb1e5325049b412b7e71337116bef88a29b3a";
export const QUOTER_V2_ADDRESS = "0x61fFE014bA17989E743c5F6cB21bF9697530B21e";
export const SWAP_ROUTER_ADDRESS = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45";
export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";
export const TICK_LENS_ADDRESS = "0xbfd8137f7d1516D3ea5cA83523914859ec47F573";

// SilverSwap API Configuration
export const SILVERSWAP_API_BASE = "https://api.silverswap.com";
export const SILVERSWAP_SUBGRAPH_URL = "https://graph.soniclabs.com/subgraphs/name/silverswap/algebra-v3";

// Pool Addresses (wS/WETH pair)
export const WS_WETH_POOL_ADDRESS = "0x4e68Ccd3E89f51C3074ca5072bbAC773960dFa36";

// Token Decimals
export const TOKEN_DECIMALS = {
  [WRAPPED_S_ADDRESS]: 18,
  [WETH_ADDRESS]: 18,
  [USDC_ADDRESS]: 6,
  [USDT_ADDRESS]: 6,
};

// Popular Token Pairs for Trading
export const POPULAR_PAIRS = [
  {
    token0: WRAPPED_S_ADDRESS,
    token1: WETH_ADDRESS,
    symbol: "wS/WETH",
    fee: 3000, // 0.3%
  },
  {
    token0: WETH_ADDRESS,
    token1: USDC_ADDRESS,
    symbol: "WETH/USDC",
    fee: 3000, // 0.3%
  },
  {
    token0: USDC_ADDRESS,
    token1: USDT_ADDRESS,
    symbol: "USDC/USDT",
    fee: 500, // 0.05%
  },
];

// Fee Tiers
export const FEE_TIERS = [
  { fee: 500, label: "0.05%" },
  { fee: 3000, label: "0.3%" },
  { fee: 10000, label: "1%" },
];

// Price Ranges for Concentrated Liquidity
export const PRICE_RANGES = {
  TIGHT: { min: 0.95, max: 1.05 }, // ±5%
  MEDIUM: { min: 0.8, max: 1.2 }, // ±20%
  WIDE: { min: 0.5, max: 2.0 }, // ±100%
};

// GraphQL Queries for Portfolio Data
export const PORTFOLIO_QUERIES = {
  USER_POSITIONS: `
    query getUserPositions($owner: String!) {
      positions(where: { owner: $owner }) {
        id
        owner
        pool {
          id
          token0 {
            symbol
            decimals
          }
          token1 {
            symbol
            decimals
          }
          fee
        }
        tickLower {
          tickIdx
        }
        tickUpper {
          tickIdx
        }
        liquidity
        depositedToken0
        depositedToken1
        withdrawnToken0
        withdrawnToken1
        collectedFeesToken0
        collectedFeesToken1
      }
    }
  `,
  
  POOL_DATA: `
    query getPoolData($poolId: String!) {
      pool(id: $poolId) {
        id
        token0Price
        token1Price
        sqrtPrice
        tick
        liquidity
        volumeUSD
        totalValueLockedUSD
        feesUSD
      }
    }
  `,
  
  USER_SWAPS: `
    query getUserSwaps($sender: String!) {
      swaps(where: { sender: $sender }, orderBy: timestamp, orderDirection: desc, first: 100) {
        id
        timestamp
        pool {
          token0 {
            symbol
          }
          token1 {
            symbol
          }
        }
        amount0
        amount1
        amountUSD
      }
    }
  `,
};

// Helper function to get token info
export function getTokenInfo(address: string) {
  const lowerAddress = address.toLowerCase();
  
  if (lowerAddress === WRAPPED_S_ADDRESS.toLowerCase()) {
    return { symbol: "wS", name: "Wrapped S", decimals: 18 };
  }
  if (lowerAddress === WETH_ADDRESS.toLowerCase()) {
    return { symbol: "WETH", name: "Wrapped Ether", decimals: 18 };
  }
  if (lowerAddress === USDC_ADDRESS.toLowerCase()) {
    return { symbol: "USDC", name: "USD Coin", decimals: 6 };
  }
  if (lowerAddress === USDT_ADDRESS.toLowerCase()) {
    return { symbol: "USDT", name: "Tether USD", decimals: 6 };
  }
  
  return { symbol: "UNKNOWN", name: "Unknown Token", decimals: 18 };
}

// Helper function to format amounts
export function formatTokenAmount(amount: string, decimals: number): string {
  const divisor = BigInt(10 ** decimals);
  const bigAmount = BigInt(amount);
  const wholePart = bigAmount / divisor;
  const fractionalPart = bigAmount % divisor;
  
  if (fractionalPart === BigInt(0)) {
    return wholePart.toString();
  }
  
  const fractionalStr = fractionalPart.toString().padStart(decimals, '0');
  const trimmedFractional = fractionalStr.replace(/0+$/, '');
  
  if (trimmedFractional === '') {
    return wholePart.toString();
  }
  
  return `${wholePart}.${trimmedFractional}`;
} 