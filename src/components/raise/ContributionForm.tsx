import React, { useState } from "react";
import { useWallet } from "@/contexts/WalletContext";
import { RaiseData } from "@/types/contract-types";
import { approveToken, contribute } from "@/contracts/contractService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

interface ContributionFormProps {
  raise: RaiseData;
  userContribution: string;
  onContributionSuccess: () => void;
}

const ContributionForm: React.FC<ContributionFormProps> = ({
  raise,
  userContribution,
  onContributionSuccess,
}) => {
  const { isConnected, address, connect } = useWallet();
  const [amount, setAmount] = useState<string>("");
  const [approving, setApproving] = useState(false);
  const [contributing, setContributing] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const [showMerkleProof, setShowMerkleProof] = useState(false);
  const [merkleProof, setMerkleProof] = useState<string>("");

  // Calculate token amount and cost
  const tokenAmount = amount ? parseFloat(amount) : 0;
  const tokenCost = tokenAmount * parseFloat(raise.pricePerToken);

  // Check if contribution is allowed based on raise status
  const canContribute = ["presale", "public"].includes(raise.status);

  // Calculate remaining allocation
  const remainingAllocation = Math.max(
    0,
    parseFloat(raise.maxTokenAllocation) - parseFloat(userContribution),
  );

  // Calculate remaining hard cap
  const remainingHardCap = Math.max(
    0,
    parseFloat(raise.maxAcceptedTokenRaise) -
      parseFloat(raise.totalAcceptedTokenRaised),
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
      const success = await approveToken(
        raise.acceptedToken,
        raise.address,
        tokenCost.toString(),
      );

      if (success) {
        setIsApproved(true);
        toast.success(
          `Successfully approved ${tokenCost} ${raise.acceptedTokenSymbol}`,
        );
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

      // Process merkle proof if provided
      let processedProof: string[] = [];
      if (showMerkleProof && merkleProof.trim()) {
        try {
          // Parse the JSON array from the input
          processedProof = JSON.parse(merkleProof.trim());

          // Validate that it's actually an array of strings
          if (
            !Array.isArray(processedProof) ||
            processedProof.some((item) => typeof item !== "string")
          ) {
            throw new Error("Invalid merkle proof format");
          }
        } catch (error) {
          toast.error(
            "Invalid merkle proof format. Please provide a valid JSON array of strings.",
          );
          setContributing(false);
          return;
        }
      }

      // Pass the merkle proof to the contribute function
      const success = await contribute(raise.address, amount, processedProof);

      if (success) {
        toast.success(
          `Contribution successful! You paid ${tokenCost} ${raise.acceptedTokenSymbol} for an estimated ${tokenAmount} ${raise.tokenSymbol}. Claiming via Hedgey available after sale ends.`,
        );
        setAmount("");
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
            {raise.status === "upcoming"
              ? "Sale has not started yet"
              : "Sale has ended"}
          </h3>
          <p className="text-cradle-text-secondary mb-4">
            {raise.status === "upcoming"
              ? `The sale will start on ${new Date(raise.presaleStart).toLocaleString()}`
              : "This sale is no longer accepting contributions"}
          </p>

          {["finalized", "ended"].includes(raise.status) && (
            <Button
              variant="default"
              className="w-full bg-cradle-accent hover:bg-cradle-accent/90"
              onClick={() => window.open("https://hedgey.finance", "_blank")}
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
          <h3 className="text-lg font-medium mb-2">
            Connect Wallet to Contribute
          </h3>
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
      <h3 className="text-lg font-medium mb-4">
        Contribute to {raise.metadata.name || raise.tokenSymbol}
      </h3>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="tokenAmount"
            className="block text-sm font-medium mb-1"
          >
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

        <div className="flex items-center space-x-2">
          <Checkbox
            id="merkleProofCheck"
            checked={showMerkleProof}
            onCheckedChange={(checked) =>
              setShowMerkleProof(checked as boolean)
            }
          />
          <label
            htmlFor="merkleProofCheck"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Add Merkle Proof (for whitelist verification)
          </label>
        </div>

        {showMerkleProof && (
          <div>
            <label
              htmlFor="merkleProof"
              className="block text-sm font-medium mb-1"
            >
              Merkle Proof (JSON array)
            </label>
            <textarea
              id="merkleProof"
              placeholder='e.g., ["0x1234...", "0x5678..."]'
              value={merkleProof}
              onChange={(e) => setMerkleProof(e.target.value)}
              className="w-full h-24 px-3 py-2 bg-cradle-surface border-cradle-surface-light rounded-md font-mono text-sm"
            />
            <p className="text-xs text-cradle-text-secondary mt-1">
              Enter your merkle proof as a JSON array. You can get this from the
              project team or a merkle proof generator.
            </p>
          </div>
        )}

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
              {parseFloat(raise.pricePerToken).toFixed(6)}{" "}
              {raise.acceptedTokenSymbol}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-cradle-text-secondary">
              Your contribution:
            </span>
            <span className="font-mono">
              {parseFloat(userContribution) > 0
                ? parseFloat(userContribution).toFixed(2)
                : "0"}{" "}
              {raise.tokenSymbol}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-cradle-text-secondary">Min allocation:</span>
            <span className="font-mono">
              {parseFloat(raise.minTokenAllocation).toFixed(2)}{" "}
              {raise.tokenSymbol}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-cradle-text-secondary">Max allocation:</span>
            <span className="font-mono">
              {parseFloat(raise.maxTokenAllocation).toFixed(2)}{" "}
              {raise.tokenSymbol}
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
            {approving
              ? "Approving..."
              : `Approve ${tokenCost.toFixed(2)} ${raise.acceptedTokenSymbol}`}
          </Button>
        ) : (
          <Button
            disabled={!isAmountValid || contributing}
            onClick={handleContribute}
            className="w-full bg-cradle-accent hover:bg-cradle-accent/90"
          >
            {contributing ? "Contributing..." : "Contribute"}
          </Button>
        )}

        {amount && parseFloat(amount) > 0 && (
          <div className="text-sm">
            {parseFloat(amount) < parseFloat(raise.minTokenAllocation) && (
              <p className="text-cradle-error">
                Amount is below minimum allocation of{" "}
                {parseFloat(raise.minTokenAllocation)} {raise.tokenSymbol}
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
