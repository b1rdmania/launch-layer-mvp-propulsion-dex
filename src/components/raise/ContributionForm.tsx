
import React, { useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';
import { RaiseData, approveToken, contribute } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";

interface ContributionFormProps {
  raise: RaiseData;
  userContribution: string;
  onContributionSuccess: () => void;
}

const ContributionForm: React.FC<ContributionFormProps> = ({ 
  raise, 
  userContribution,
  onContributionSuccess
}) => {
  const { isConnected, address, connect } = useWallet();
  const [amount, setAmount] = useState<string>('');
  const [approving, setApproving] = useState(false);
  const [contributing, setContributing] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  // Calculate token amount and cost
  const tokenAmount = amount ? parseFloat(amount) : 0;
  const tokenCost = tokenAmount * parseFloat(raise.pricePerToken);

  // Check if contribution is allowed based on raise status
  const canContribute = ['presale', 'public'].includes(raise.status);
  
  // Calculate remaining allocation
  const remainingAllocation = Math.max(
    0, 
    parseFloat(raise.maxTokenAllocation) - parseFloat(userContribution)
  );

  // Calculate remaining hard cap
  const remainingHardCap = Math.max(
    0,
    parseFloat(raise.maxAcceptedTokenRaise) - parseFloat(raise.totalAcceptedTokenRaised)
  );

  // Check if amount is valid
  const isAmountValid = 
    tokenAmount >= parseFloat(raise.minTokenAllocation) &&
    tokenAmount <= remainingAllocation &&
    tokenCost <= remainingHardCap;

  const handleApprove = async () => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      setApproving(true);
      const success = await approveToken(raise.address, tokenCost.toString());
      
      if (success) {
        setIsApproved(true);
        toast.success(`Successfully approved ${tokenCost} ${raise.acceptedTokenSymbol}`);
      } else {
        toast.error("Approval failed");
      }
    } catch (error) {
      console.error("Approval error:", error);
      toast.error("Failed to approve tokens");
    } finally {
      setApproving(false);
    }
  };

  const handleContribute = async () => {
    if (!isConnected || !address) {
      toast.error("Please connect your wallet first");
      return;
    }

    if (!isAmountValid) {
      toast.error("Invalid contribution amount");
      return;
    }

    try {
      setContributing(true);
      // In a real implementation, we would check if the raise has a merkle root
      // and if so, we would need to provide a proof
      const success = await contribute(raise.address, amount);
      
      if (success) {
        toast.success(
          `Contribution successful! You paid ${tokenCost} ${raise.acceptedTokenSymbol} for an estimated ${tokenAmount} ${raise.tokenSymbol}. Claiming via Hedgey available after sale ends.`
        );
        setAmount('');
        setIsApproved(false);
        onContributionSuccess();
      } else {
        toast.error("Contribution failed");
      }
    } catch (error) {
      console.error("Contribution error:", error);
      toast.error("Failed to contribute");
    } finally {
      setContributing(false);
    }
  };

  if (!canContribute) {
    return (
      <div className="bg-cradle-surface-light p-6 rounded-xl">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">
            {raise.status === 'upcoming' ? 'Sale has not started yet' : 'Sale has ended'}
          </h3>
          <p className="text-cradle-text-secondary mb-4">
            {raise.status === 'upcoming' 
              ? `The sale will start on ${new Date(raise.presaleStart).toLocaleString()}`
              : 'This sale is no longer accepting contributions'}
          </p>
          
          {['finalized', 'ended'].includes(raise.status) && (
            <Button 
              variant="default"
              className="w-full bg-cradle-accent hover:bg-cradle-accent/90"
              onClick={() => window.open('https://hedgey.finance', '_blank')}
            >
              Claim Tokens via Hedgey
            </Button>
          )}
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return (
      <div className="bg-cradle-surface-light p-6 rounded-xl">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Connect Wallet to Contribute</h3>
          <p className="text-cradle-text-secondary mb-4">
            Connect your wallet to participate in this token sale
          </p>
          <Button 
            onClick={connect}
            className="w-full bg-cradle-accent hover:bg-cradle-accent/90"
          >
            Connect Wallet
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cradle-surface-light p-6 rounded-xl">
      <h3 className="text-lg font-medium mb-4">Contribute to {raise.metadata.name}</h3>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="tokenAmount" className="block text-sm font-medium mb-1">
            Amount of {raise.tokenSymbol} to purchase
          </label>
          <Input
            id="tokenAmount"
            type="number"
            placeholder={`Enter ${raise.tokenSymbol} amount`}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="bg-cradle-surface border-cradle-surface-light font-mono"
          />
        </div>
        
        <div className="bg-cradle-surface p-3 rounded-md">
          <div className="flex justify-between text-sm">
            <span className="text-cradle-text-secondary">Cost:</span>
            <span className="font-mono">
              {tokenCost.toFixed(6)} {raise.acceptedTokenSymbol}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-cradle-text-secondary">Price per token:</span>
            <span className="font-mono">
              {parseFloat(raise.pricePerToken).toFixed(6)} {raise.acceptedTokenSymbol}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-cradle-text-secondary">Your contribution:</span>
            <span className="font-mono">
              {parseFloat(userContribution) > 0 ? parseFloat(userContribution).toFixed(2) : '0'} {raise.tokenSymbol}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-cradle-text-secondary">Min allocation:</span>
            <span className="font-mono">
              {parseFloat(raise.minTokenAllocation).toFixed(2)} {raise.tokenSymbol}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-cradle-text-secondary">Max allocation:</span>
            <span className="font-mono">
              {parseFloat(raise.maxTokenAllocation).toFixed(2)} {raise.tokenSymbol}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-cradle-text-secondary">Remaining:</span>
            <span className="font-mono">
              {remainingAllocation.toFixed(2)} {raise.tokenSymbol}
            </span>
          </div>
        </div>
        
        {!isApproved ? (
          <Button 
            disabled={!amount || parseFloat(amount) <= 0 || approving}
            onClick={handleApprove}
            className="w-full bg-cradle-accent hover:bg-cradle-accent/90"
          >
            {approving ? 'Approving...' : `Approve ${tokenCost.toFixed(2)} ${raise.acceptedTokenSymbol}`}
          </Button>
        ) : (
          <Button 
            disabled={!isAmountValid || contributing}
            onClick={handleContribute}
            className="w-full bg-cradle-accent hover:bg-cradle-accent/90"
          >
            {contributing ? 'Contributing...' : 'Contribute'}
          </Button>
        )}
        
        {/* Error messages */}
        {amount && parseFloat(amount) > 0 && (
          <div className="text-sm">
            {parseFloat(amount) < parseFloat(raise.minTokenAllocation) && (
              <p className="text-cradle-error">
                Amount is below minimum allocation of {parseFloat(raise.minTokenAllocation)} {raise.tokenSymbol}
              </p>
            )}
            {parseFloat(amount) > remainingAllocation && (
              <p className="text-cradle-error">
                Amount exceeds your remaining allocation
              </p>
            )}
            {tokenCost > remainingHardCap && (
              <p className="text-cradle-error">
                Amount would exceed the raise hard cap
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContributionForm;
