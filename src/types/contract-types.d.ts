
// Contract Types
export interface RaiseContractDetails {
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
  isCancelled: boolean;
  status: 'upcoming' | 'presale' | 'public' | 'ended' | 'cancelled' | 'finalized';
}
