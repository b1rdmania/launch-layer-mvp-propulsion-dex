
// Mock API services for Cradle.build

export type RaiseMetadata = {
  name: string;
  tokenSymbol: string;
  description: string;
  longDescription: string;
  logoUrl: string;
  bannerUrl: string;
  websiteUrl: string;
  socialLinks: {
    twitter?: string;
    telegram?: string;
    discord?: string;
    medium?: string;
  };
};

export type RaiseStatus = 
  | 'upcoming' 
  | 'presale' 
  | 'public' 
  | 'ended' 
  | 'cancelled'
  | 'finalized';

export type RaiseData = {
  address: string;
  token: string;
  tokenName: string;
  tokenSymbol: string;
  acceptedToken: string;
  acceptedTokenSymbol: string;
  pricePerToken: string;
  presaleStart: number;
  publicSaleStart: number;
  endTime: number;
  owner: string;
  feeRecipient: string;
  feePercentBasisPoints: number;
  maxAcceptedTokenRaise: string;
  minTokenAllocation: string;
  maxTokenAllocation: string;
  merkleRoot: string;
  totalAcceptedTokenRaised: string;
  isFinalized: boolean;
  status: RaiseStatus;
  metadata: RaiseMetadata;
};

// Mock data
const mockRaises: RaiseData[] = [
  {
    address: '0x1234567890123456789012345678901234567890',
    token: '0xabcdef1234567890abcdef1234567890abcdef12',
    tokenName: 'BOOM Perpetual DEX',
    tokenSymbol: 'BOOM',
    acceptedToken: '0x1B...ed',
    acceptedTokenSymbol: 'mUSDC',
    pricePerToken: '0.1',
    presaleStart: Date.now() + 86400000, // 1 day from now
    publicSaleStart: Date.now() + 172800000, // 2 days from now
    endTime: Date.now() + 432000000, // 5 days from now
    owner: '0x0987654321098765432109876543210987654321',
    feeRecipient: '0xfedc...ba98',
    feePercentBasisPoints: 250, // 2.5%
    maxAcceptedTokenRaise: '100000',
    minTokenAllocation: '100',
    maxTokenAllocation: '2000',
    merkleRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
    totalAcceptedTokenRaised: '0',
    isFinalized: false,
    status: 'upcoming',
    metadata: {
      name: 'BOOM Perpetual DEX',
      tokenSymbol: 'BOOM',
      description: 'Next-generation perpetual DEX built on Sonic Network',
      longDescription: '# BOOM Perpetual DEX\n\nBOOM is building a next-generation perpetual DEX optimized for the Sonic Network, delivering lightning-fast trades with minimal fees.\n\n## Features\n- Leveraged trading up to 50x\n- Tight spreads and deep liquidity\n- Advanced order types\n- Automated market making\n\n## Tokenomics\n- Total Supply: 100,000,000 BOOM\n- Initial Circulating Supply: 10,000,000 BOOM (10%)\n- Vesting Schedule: Linear vesting over 12 months\n\n## Team\nOur team consists of former traders and blockchain developers from major exchanges, committed to building the best trading experience on Sonic.',
      logoUrl: 'https://placehold.co/200x200/3277F5/FFFFFF/?text=BOOM',
      bannerUrl: 'https://placehold.co/1200x300/3277F5/FFFFFF/?text=BOOM+DEX',
      websiteUrl: 'https://boom-dex.example.com',
      socialLinks: {
        twitter: 'https://twitter.com/boomdex',
        telegram: 'https://t.me/boomdex',
        discord: 'https://discord.gg/boomdex'
      }
    }
  },
  {
    address: '0xaaaaabbbbbcccccdddddeeeeefffffggggghhhh',
    token: '0xabcdef1234567890abcdef1234567890abcdef23',
    tokenName: 'SonicSwap',
    tokenSymbol: 'SWAP',
    acceptedToken: '0x1B...ed',
    acceptedTokenSymbol: 'mUSDC',
    pricePerToken: '0.05',
    presaleStart: Date.now() - 172800000, // 2 days ago
    publicSaleStart: Date.now() - 86400000, // 1 day ago
    endTime: Date.now() + 172800000, // 2 days from now
    owner: '0x0987654321098765432109876543210987654321',
    feeRecipient: '0xfedc...ba98',
    feePercentBasisPoints: 300, // 3%
    maxAcceptedTokenRaise: '200000',
    minTokenAllocation: '100',
    maxTokenAllocation: '5000',
    merkleRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
    totalAcceptedTokenRaised: '120000',
    isFinalized: false,
    status: 'public',
    metadata: {
      name: 'SonicSwap',
      tokenSymbol: 'SWAP',
      description: 'AMM DEX built natively for Sonic Network with innovative LP incentives',
      longDescription: '# SonicSwap\n\nSonicSwap is the leading AMM DEX built natively for Sonic Network, designed to provide deep liquidity and capital efficiency.\n\n## Features\n- Concentrated liquidity pools\n- Single-sided liquidity provision\n- Boosted farming rewards\n- Governance through veTokens\n\n## Tokenomics\n- Total Supply: 1,000,000,000 SWAP\n- Initial Circulating Supply: 200,000,000 SWAP (20%)\n- Vesting Schedule: 25% at TGE, 75% linearly vested over 18 months\n\n## Team\nOur team has built multiple successful DeFi protocols with over $500M TVL.',
      logoUrl: 'https://placehold.co/200x200/FF6D3B/FFFFFF/?text=SWAP',
      bannerUrl: 'https://placehold.co/1200x300/FF6D3B/FFFFFF/?text=SonicSwap',
      websiteUrl: 'https://sonicswap.example.com',
      socialLinks: {
        twitter: 'https://twitter.com/sonicswap',
        telegram: 'https://t.me/sonicswap',
        discord: 'https://discord.gg/sonicswap'
      }
    }
  },
  {
    address: '0x11111222223333344444555556666677777888889',
    token: '0xabcdef1234567890abcdef1234567890abcdef34',
    tokenName: 'NightVault',
    tokenSymbol: 'VAULT',
    acceptedToken: '0x1B...ed',
    acceptedTokenSymbol: 'mUSDC',
    pricePerToken: '0.2',
    presaleStart: Date.now() - 432000000, // 5 days ago
    publicSaleStart: Date.now() - 345600000, // 4 days ago
    endTime: Date.now() - 172800000, // 2 days ago
    owner: '0x0987654321098765432109876543210987654321',
    feeRecipient: '0xfedc...ba98',
    feePercentBasisPoints: 200, // 2%
    maxAcceptedTokenRaise: '500000',
    minTokenAllocation: '500',
    maxTokenAllocation: '10000',
    merkleRoot: '0x0000000000000000000000000000000000000000000000000000000000000000',
    totalAcceptedTokenRaised: '450000',
    isFinalized: true,
    status: 'finalized',
    metadata: {
      name: 'NightVault',
      tokenSymbol: 'VAULT',
      description: 'Self-custodial yield optimization platform for Sonic Network',
      longDescription: '# NightVault\n\nNightVault is a self-custodial yield optimization platform that maximizes returns across multiple DeFi protocols on Sonic Network.\n\n## Features\n- Automated yield farming strategies\n- Auto-compounding vaults\n- Risk-rated investment options\n- Insurance coverage\n\n## Tokenomics\n- Total Supply: 10,000,000 VAULT\n- Initial Circulating Supply: 1,500,000 VAULT (15%)\n- Vesting Schedule: Linear vesting over 24 months with 6-month cliff\n\n## Team\nFormer portfolio managers and smart contract engineers with decades of combined experience in traditional finance and DeFi.',
      logoUrl: 'https://placehold.co/200x200/2ECC71/FFFFFF/?text=VAULT',
      bannerUrl: 'https://placehold.co/1200x300/2ECC71/FFFFFF/?text=NightVault',
      websiteUrl: 'https://nightvault.example.com',
      socialLinks: {
        twitter: 'https://twitter.com/nightvault',
        telegram: 'https://t.me/nightvault',
        discord: 'https://discord.gg/nightvault'
      }
    }
  }
];

// API functions
export const fetchAllRaises = async (): Promise<RaiseData[]> => {
  // In a real implementation, we would fetch this from the blockchain
  return Promise.resolve(mockRaises);
};

export const fetchRaiseByAddress = async (address: string): Promise<RaiseData | undefined> => {
  // In a real implementation, we would fetch this from the blockchain
  const raise = mockRaises.find(raise => raise.address === address);
  return Promise.resolve(raise);
};

export const getUserContribution = async (raiseAddress: string, userAddress: string): Promise<string> => {
  // Mock user contribution - in a real app, this would be fetched from the blockchain
  return Promise.resolve('0');
};

// Mock transaction functions
export const approveToken = async (raiseAddress: string, amount: string): Promise<boolean> => {
  // Mock approval - in a real app, this would call the token contract
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 1500);
  });
};

export const contribute = async (raiseAddress: string, amount: string, proof?: string[]): Promise<boolean> => {
  // Mock contribution - in a real app, this would call the raise contract
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 2000);
  });
};

export const finalizeRaise = async (raiseAddress: string): Promise<boolean> => {
  // Mock finalize - in a real app, this would call the raise contract
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 2000);
  });
};

export const cancelRaise = async (raiseAddress: string): Promise<boolean> => {
  // Mock cancel - in a real app, this would call the raise contract
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 2000);
  });
};

export const sweepFunds = async (raiseAddress: string): Promise<boolean> => {
  // Mock sweep - in a real app, this would call the raise contract
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 2000);
  });
};

export const createRaise = async (raiseData: Partial<RaiseData>): Promise<string> => {
  // Mock create raise - in a real app, this would call the factory contract
  return new Promise((resolve) => {
    setTimeout(() => resolve('0x' + Math.random().toString(16).substring(2, 42)), 3000);
  });
};
