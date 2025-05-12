
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { RaiseData } from "@/types/contract-types";
import {
  getRaiseDetails,
  getUserContribution,
} from "@/contracts/contractService";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import RaiseStatusBadge from "@/components/raise/RaiseStatusBadge";
import ContributionForm from "@/components/raise/ContributionForm";
import RaiseAdminActions from "@/components/raise/RaiseAdminActions";
import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";
import { toast } from "sonner";
import { NETWORK_CONFIG } from "@/contracts/config";

const RaiseDetailPage: React.FC = () => {
  const { raiseAddress } = useParams<{ raiseAddress: string }>();
  const { address: walletAddress, isConnected } = useWallet();

  const [raise, setRaise] = useState<RaiseData | null>(null);
  const [userContribution, setUserContribution] = useState("0");
  const [isLoading, setIsLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  const loadRaiseData = async () => {
    if (!raiseAddress) {
      toast.error("Invalid raise address");
      return;
    }

    try {
      setIsLoading(true);
      const raiseData = await getRaiseDetails(raiseAddress);

      if (!raiseData) {
        toast.error("Raise not found");
        return;
      }

      setRaise(raiseData);

      // Check if current user is the owner
      if (
        walletAddress &&
        raiseData.owner.toLowerCase() === walletAddress.toLowerCase()
      ) {
        setIsOwner(true);
      } else {
        setIsOwner(false);
      }

      // Get user contribution if wallet is connected
      if (walletAddress && isConnected) {
        const contribution = await getUserContribution(
          raiseAddress,
          walletAddress,
        );
        setUserContribution(contribution);
      }
    } catch (error) {
      console.error("Failed to load raise data:", error);
      toast.error("Failed to load raise data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadRaiseData();
  }, [raiseAddress, walletAddress, isConnected]);

  const handleRefresh = () => {
    loadRaiseData();
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 bg-launchlayer-background">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-launchlayer-violet"></div>
        </div>
      </div>
    );
  }

  if (!raise) {
    return (
      <div className="container mx-auto px-4 py-8 bg-launchlayer-background">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4 text-launchlayer-text-primary">Raise Not Found</h2>
          <p className="text-launchlayer-text-secondary mb-6">
            The sale you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/">
            <Button
              variant="default"
              className="bg-launchlayer-violet hover:bg-launchlayer-violet/90"
            >
              Back to Discovery
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate progress percentage
  const progress =
    (parseFloat(raise.totalAcceptedTokenRaised) /
      parseFloat(raise.maxAcceptedTokenRaise)) *
    100;

  // Format date and time for display
  const formatDateTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-launchlayer-background">
      <div className="mb-6">
        <Link
          to="/"
          className="text-launchlayer-violet hover:text-launchlayer-violet/80 flex items-center gap-1 mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Discovery
        </Link>

        {/* Banner image */}
        <div
          className="w-full h-48 md:h-64 bg-cover bg-center rounded-xl mb-6"
          style={{ backgroundImage: `url(${raise.metadata.bannerUrl})` }}
        />

        {/* Header with logo and title */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
          <img
            src={raise.metadata.logoUrl}
            alt={`${raise.metadata.name} logo`}
            className="w-20 h-20 rounded-full"
          />

          <div>
            <h1 className="text-3xl font-bold text-launchlayer-text-primary">{raise.metadata.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-launchlayer-text-secondary">
                {raise.tokenSymbol}
              </span>
              <RaiseStatusBadge status={raise.status} />
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="flex gap-4 mb-6">
          {raise.metadata.websiteUrl && (
            <a
              href={raise.metadata.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary"
            >
              Website
            </a>
          )}
          {raise.metadata.socialLinks.twitter && (
            <a
              href={raise.metadata.socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary"
            >
              Twitter
            </a>
          )}
          {raise.metadata.socialLinks.telegram && (
            <a
              href={raise.metadata.socialLinks.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary"
            >
              Telegram
            </a>
          )}
          {raise.metadata.socialLinks.discord && (
            <a
              href={raise.metadata.socialLinks.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary"
            >
              Discord
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column - Project details */}
        <div className="lg:col-span-2">
          {/* Admin actions for owner */}
          {isOwner && (
            <RaiseAdminActions
              raiseAddress={raise.address}
              status={raise.status}
              isFinalized={raise.isFinalized}
              isSwept={raise.isSwept}
              presaleStart={raise.presaleStart}
              endTime={raise.endTime}
              onActionSuccess={handleRefresh}
            />
          )}

          {/* Sale status */}
          <Card className="mb-6 bg-[#1A1A1A] border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-4 text-launchlayer-text-primary">Sale Status</h2>

              <div className="space-y-4">
                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-launchlayer-text-secondary">
                      Total Raised
                    </span>
                    <span className="font-mono text-launchlayer-text-primary">
                      {parseFloat(
                        raise.totalAcceptedTokenRaised,
                      ).toLocaleString()}{" "}
                      /{" "}
                      {parseFloat(raise.maxAcceptedTokenRaise).toLocaleString()}{" "}
                      {raise.acceptedTokenSymbol}
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Sale phases */}
                <div className="bg-[#111111] p-3 rounded-md space-y-3 border border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-launchlayer-text-secondary">
                      Presale Start:
                    </span>
                    <span className="font-mono text-launchlayer-text-primary">
                      {formatDateTime(raise.presaleStart)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-launchlayer-text-secondary">
                      Public Sale Start:
                    </span>
                    <span className="font-mono text-launchlayer-text-primary">
                      {formatDateTime(raise.publicSaleStart)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-launchlayer-text-secondary">
                      Sale End:
                    </span>
                    <span className="font-mono text-launchlayer-text-primary">
                      {formatDateTime(raise.endTime)}
                    </span>
                  </div>
                </div>

                {/* Token info */}
                <div className="bg-[#111111] p-3 rounded-md space-y-3 border border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-launchlayer-text-secondary">
                      Token Price:
                    </span>
                    <span className="font-mono text-launchlayer-text-primary">
                      {parseFloat(raise.pricePerToken)}{" "}
                      {raise.acceptedTokenSymbol} per {raise.tokenSymbol}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-launchlayer-text-secondary">
                      Min Allocation:
                    </span>
                    <span className="font-mono text-launchlayer-text-primary">
                      {parseFloat(raise.minTokenAllocation)} {raise.tokenSymbol}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-launchlayer-text-secondary">
                      Max Allocation:
                    </span>
                    <span className="font-mono text-launchlayer-text-primary">
                      {parseFloat(raise.maxTokenAllocation)} {raise.tokenSymbol}
                    </span>
                  </div>
                  {isConnected && (
                    <div className="flex justify-between text-sm">
                      <span className="text-launchlayer-text-secondary">
                        Your Contribution:
                      </span>
                      <span className="font-mono text-launchlayer-text-primary">
                        {parseFloat(userContribution)} {raise.tokenSymbol}
                      </span>
                    </div>
                  )}
                </div>

                {/* Contract info */}
                <div className="bg-[#111111] p-3 rounded-md space-y-3 border border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-launchlayer-text-secondary">
                      Raise Address:
                    </span>
                    <span className="font-mono truncate max-w-[180px] md:max-w-[280px] text-launchlayer-text-primary">
                      {raise.address}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-launchlayer-text-secondary">
                      Token Address:
                    </span>
                    <span className="font-mono truncate max-w-[180px] md:max-w-[280px] text-launchlayer-text-primary">
                      {raise.token}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Project description */}
          <Card className="bg-[#1A1A1A] border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-4 text-launchlayer-text-primary">
                About {raise.metadata.name}
              </h2>
              <MarkdownRenderer markdown={raise.metadata.longDescription} />
            </CardContent>
          </Card>
        </div>

        {/* Right column - Contribution form */}
        <div className="lg:col-span-1">
          {/* Show claim link for finalized raises */}
          {raise.status === "finalized" ? (
            <Card className="bg-[#1A1A1A] border-gray-700 mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-medium mb-4 text-launchlayer-text-primary">Claim Tokens</h2>
                <p className="text-launchlayer-text-secondary mb-4">
                  This raise has been finalized. You can now claim your tokens
                  through Hedgey Finance.
                </p>
                <Link to={`/claim/${raise.address}`}>
                  <Button className="w-full bg-launchlayer-violet hover:bg-launchlayer-violet/90 text-white">
                    Go to Claim Page
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <ContributionForm
              raise={raise}
              userContribution={userContribution}
              onContributionSuccess={handleRefresh}
            />
          )}

          {/* Contract details */}
          <Card className="mt-6 bg-[#1A1A1A] border-gray-700">
            <CardContent className="p-6">
              <h3 className="font-medium mb-4 text-launchlayer-text-primary">Contract Details</h3>

              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-launchlayer-text-secondary block">
                    Raise Contract:
                  </span>
                  <a
                    href={`${NETWORK_CONFIG.blockExplorerUrls[0]}/address/${raise.address}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-launchlayer-violet hover:underline font-mono truncate block"
                  >
                    {raise.address}
                  </a>
                </div>

                <div>
                  <span className="text-launchlayer-text-secondary block">
                    Token Contract:
                  </span>
                  <a
                    href={`${NETWORK_CONFIG.blockExplorerUrls[0]}/address/${raise.token}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-launchlayer-violet hover:underline font-mono truncate block"
                  >
                    {raise.token}
                  </a>
                </div>

                <Separator className="my-2 bg-gray-700" />

                <div>
                  <span className="text-launchlayer-text-secondary block">
                    Owner:
                  </span>
                  <a
                    href={`${NETWORK_CONFIG.blockExplorerUrls[0]}/address/${raise.owner}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-launchlayer-violet hover:underline font-mono truncate block"
                  >
                    {raise.owner}
                  </a>
                </div>

                {(raise.status === "finalized" || raise.status === "ended") &&
                  !isOwner && (
                    <div className="mt-4">
                      <Link to={`/claim/${raise.address}`}>
                        <Button
                          variant="outline"
                          className="w-full border-launchlayer-violet text-launchlayer-violet hover:bg-launchlayer-violet hover:text-white"
                        >
                          View Claim Page
                        </Button>
                      </Link>
                    </div>
                  )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RaiseDetailPage;
