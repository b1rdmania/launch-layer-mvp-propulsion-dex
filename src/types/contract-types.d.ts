// Keep RaiseStatus as a type since it's a union type
export type RaiseStatus =
  | "upcoming"
  | "presale"
  | "public"
  | "ended"
  | "cancelled"
  | "finalized";

// Convert RaiseMetadata to an interface
export interface RaiseMetadata {
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
}

// Convert RaiseData to an interface
export interface RaiseData {
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
  isSwept: boolean;
  status: RaiseStatus;
  metadata?: RaiseMetadata;
}
