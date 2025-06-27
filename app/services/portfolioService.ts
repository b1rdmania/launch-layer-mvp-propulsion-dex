import { ethers } from 'ethers';
import { 
  SILVERSWAP_SUBGRAPH_URL, 
  SILVERSWAP_API_BASE, 
  PORTFOLIO_QUERIES,
  getTokenInfo,
  formatTokenAmount,
  NONFUNGIBLE_POSITION_MANAGER_ADDRESS,
  QUOTER_V2_ADDRESS,
  RPC_URL
} from '../contracts';

// Types for portfolio data
export interface Position {
  id: string;
  tokenId: number;
  pool: {
    id: string;
    token0: { symbol: string; decimals: number; address: string };
    token1: { symbol: string; decimals: number; address: string };
    fee: number;
  };
  tickLower: number;
  tickUpper: number;
  liquidity: string;
  depositedToken0: string;
  depositedToken1: string;
  withdrawnToken0: string;
  withdrawnToken1: string;
  collectedFeesToken0: string;
  collectedFeesToken1: string;
  currentValue: {
    token0: string;
    token1: string;
    totalUSD: number;
  };
  uncollectedFees: {
    token0: string;
    token1: string;
    totalUSD: number;
  };
  priceRange: {
    lower: number;
    upper: number;
    current: number;
    inRange: boolean;
  };
}

export interface SwapTransaction {
  id: string;
  timestamp: number;
  pool: {
    token0: { symbol: string };
    token1: { symbol: string };
  };
  amount0: string;
  amount1: string;
  amountUSD: number;
  type: 'buy' | 'sell';
}

export interface PoolData {
  id: string;
  token0Price: string;
  token1Price: string;
  sqrtPrice: string;
  tick: number;
  liquidity: string;
  volumeUSD: string;
  totalValueLockedUSD: string;
  feesUSD: string;
}

export interface PortfolioSummary {
  totalValueUSD: number;
  totalFeesEarned: number;
  totalPositions: number;
  activePositions: number;
  totalSwaps: number;
  totalVolumeUSD: number;
  positions: Position[];
  recentSwaps: SwapTransaction[];
}

class PortfolioService {
  private provider: ethers.JsonRpcProvider;

  constructor() {
    this.provider = new ethers.JsonRpcProvider(RPC_URL);
  }

  // Fetch data from SilverSwap subgraph
  private async querySubgraph(query: string, variables: any = {}): Promise<any> {
    try {
      const response = await fetch(SILVERSWAP_SUBGRAPH_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
      }

      return result.data;
    } catch (error) {
      console.error('Subgraph query error:', error);
      return null;
    }
  }

  // Get user's liquidity positions
  async getUserPositions(userAddress: string): Promise<Position[]> {
    try {
      const data = await this.querySubgraph(PORTFOLIO_QUERIES.USER_POSITIONS, {
        owner: userAddress.toLowerCase(),
      });

      if (!data?.positions) {
        return [];
      }

      const positions: Position[] = [];

      for (const pos of data.positions) {
        // Calculate current position value and fees
        const currentValue = await this.calculatePositionValue(pos);
        const uncollectedFees = await this.calculateUncollectedFees(pos);
        const priceRange = await this.calculatePriceRange(pos);

        positions.push({
          id: pos.id,
          tokenId: parseInt(pos.id),
          pool: {
            id: pos.pool.id,
            token0: {
              symbol: pos.pool.token0.symbol,
              decimals: pos.pool.token0.decimals,
              address: pos.pool.token0.id,
            },
            token1: {
              symbol: pos.pool.token1.symbol,
              decimals: pos.pool.token1.decimals,
              address: pos.pool.token1.id,
            },
            fee: pos.pool.fee,
          },
          tickLower: pos.tickLower.tickIdx,
          tickUpper: pos.tickUpper.tickIdx,
          liquidity: pos.liquidity,
          depositedToken0: pos.depositedToken0,
          depositedToken1: pos.depositedToken1,
          withdrawnToken0: pos.withdrawnToken0,
          withdrawnToken1: pos.withdrawnToken1,
          collectedFeesToken0: pos.collectedFeesToken0,
          collectedFeesToken1: pos.collectedFeesToken1,
          currentValue,
          uncollectedFees,
          priceRange,
        });
      }

      return positions;
    } catch (error) {
      console.error('Error fetching user positions:', error);
      return [];
    }
  }

  // Get user's swap history
  async getUserSwaps(userAddress: string): Promise<SwapTransaction[]> {
    try {
      const data = await this.querySubgraph(PORTFOLIO_QUERIES.USER_SWAPS, {
        sender: userAddress.toLowerCase(),
      });

      if (!data?.swaps) {
        return [];
      }

      return data.swaps.map((swap: any) => ({
        id: swap.id,
        timestamp: parseInt(swap.timestamp),
        pool: swap.pool,
        amount0: swap.amount0,
        amount1: swap.amount1,
        amountUSD: parseFloat(swap.amountUSD || '0'),
        type: parseFloat(swap.amount0) > 0 ? 'sell' : 'buy',
      }));
    } catch (error) {
      console.error('Error fetching user swaps:', error);
      return [];
    }
  }

  // Get pool data
  async getPoolData(poolId: string): Promise<PoolData | null> {
    try {
      const data = await this.querySubgraph(PORTFOLIO_QUERIES.POOL_DATA, {
        poolId: poolId.toLowerCase(),
      });

      return data?.pool || null;
    } catch (error) {
      console.error('Error fetching pool data:', error);
      return null;
    }
  }

  // Calculate position current value
  private async calculatePositionValue(position: any): Promise<{
    token0: string;
    token1: string;
    totalUSD: number;
  }> {
    try {
      // This would typically involve complex calculations based on current tick, liquidity, etc.
      // For now, we'll use a simplified calculation
      const token0Amount = formatTokenAmount(position.depositedToken0, position.pool.token0.decimals);
      const token1Amount = formatTokenAmount(position.depositedToken1, position.pool.token1.decimals);
      
      // Estimate USD value (this would normally require price feeds)
      const estimatedUSD = (parseFloat(token0Amount) * 100) + (parseFloat(token1Amount) * 2000); // Rough estimate

      return {
        token0: token0Amount,
        token1: token1Amount,
        totalUSD: estimatedUSD,
      };
    } catch (error) {
      console.error('Error calculating position value:', error);
      return { token0: '0', token1: '0', totalUSD: 0 };
    }
  }

  // Calculate uncollected fees
  private async calculateUncollectedFees(position: any): Promise<{
    token0: string;
    token1: string;
    totalUSD: number;
  }> {
    try {
      // This would involve calling the position manager contract to get uncollected fees
      // For now, we'll use collected fees as a proxy
      const fees0 = formatTokenAmount(position.collectedFeesToken0, position.pool.token0.decimals);
      const fees1 = formatTokenAmount(position.collectedFeesToken1, position.pool.token1.decimals);
      
      // Estimate USD value of fees
      const feesUSD = (parseFloat(fees0) * 100) + (parseFloat(fees1) * 2000); // Rough estimate

      return {
        token0: fees0,
        token1: fees1,
        totalUSD: feesUSD,
      };
    } catch (error) {
      console.error('Error calculating uncollected fees:', error);
      return { token0: '0', token1: '0', totalUSD: 0 };
    }
  }

  // Calculate price range information
  private async calculatePriceRange(position: any): Promise<{
    lower: number;
    upper: number;
    current: number;
    inRange: boolean;
  }> {
    try {
      // Convert ticks to prices (simplified calculation)
      const tickLower = position.tickLower.tickIdx;
      const tickUpper = position.tickUpper.tickIdx;
      
      // Tick to price conversion: price = 1.0001^tick
      const priceLower = Math.pow(1.0001, tickLower);
      const priceUpper = Math.pow(1.0001, tickUpper);
      
      // Get current pool data to determine current price
      const poolData = await this.getPoolData(position.pool.id);
      const currentPrice = poolData ? parseFloat(poolData.token0Price) : 1;
      
      const inRange = currentPrice >= priceLower && currentPrice <= priceUpper;

      return {
        lower: priceLower,
        upper: priceUpper,
        current: currentPrice,
        inRange,
      };
    } catch (error) {
      console.error('Error calculating price range:', error);
      return { lower: 0, upper: 0, current: 0, inRange: false };
    }
  }

  // Get comprehensive portfolio summary
  async getPortfolioSummary(userAddress: string): Promise<PortfolioSummary> {
    try {
      const [positions, swaps] = await Promise.all([
        this.getUserPositions(userAddress),
        this.getUserSwaps(userAddress),
      ]);

      const totalValueUSD = positions.reduce((sum, pos) => sum + pos.currentValue.totalUSD, 0);
      const totalFeesEarned = positions.reduce((sum, pos) => sum + pos.uncollectedFees.totalUSD, 0);
      const activePositions = positions.filter(pos => pos.priceRange.inRange).length;
      const totalVolumeUSD = swaps.reduce((sum, swap) => sum + swap.amountUSD, 0);

      return {
        totalValueUSD,
        totalFeesEarned,
        totalPositions: positions.length,
        activePositions,
        totalSwaps: swaps.length,
        totalVolumeUSD,
        positions,
        recentSwaps: swaps.slice(0, 10), // Last 10 swaps
      };
    } catch (error) {
      console.error('Error getting portfolio summary:', error);
      return {
        totalValueUSD: 0,
        totalFeesEarned: 0,
        totalPositions: 0,
        activePositions: 0,
        totalSwaps: 0,
        totalVolumeUSD: 0,
        positions: [],
        recentSwaps: [],
      };
    }
  }

  // Get token balances
  async getTokenBalances(userAddress: string, tokenAddresses: string[]): Promise<Record<string, string>> {
    try {
      const balances: Record<string, string> = {};

      for (const tokenAddress of tokenAddresses) {
        try {
          // Create ERC20 contract instance
          const tokenContract = new ethers.Contract(
            tokenAddress,
            ['function balanceOf(address) view returns (uint256)'],
            this.provider
          );

          const balance = await tokenContract.balanceOf(userAddress);
          const tokenInfo = getTokenInfo(tokenAddress);
          
          balances[tokenAddress] = formatTokenAmount(balance.toString(), tokenInfo.decimals);
        } catch (error) {
          console.error(`Error fetching balance for ${tokenAddress}:`, error);
          balances[tokenAddress] = '0';
        }
      }

      return balances;
    } catch (error) {
      console.error('Error fetching token balances:', error);
      return {};
    }
  }

  // Get pool APR data
  async getPoolAPR(poolId: string, days: number = 7): Promise<number> {
    try {
      // This would typically calculate APR based on fees earned vs liquidity over time
      // For now, return a mock APR
      return Math.random() * 20 + 5; // 5-25% APR
    } catch (error) {
      console.error('Error calculating pool APR:', error);
      return 0;
    }
  }

  // Get trending pools
  async getTrendingPools(): Promise<any[]> {
    try {
      const query = `
        query getTrendingPools {
          pools(orderBy: volumeUSD, orderDirection: desc, first: 10) {
            id
            token0 {
              symbol
              id
            }
            token1 {
              symbol
              id
            }
            fee
            volumeUSD
            totalValueLockedUSD
            token0Price
            token1Price
          }
        }
      `;

      const data = await this.querySubgraph(query);
      return data?.pools || [];
    } catch (error) {
      console.error('Error fetching trending pools:', error);
      return [];
    }
  }
}

// Export singleton instance
export const portfolioService = new PortfolioService();
export default portfolioService; 