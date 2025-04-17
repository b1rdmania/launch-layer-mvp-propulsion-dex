import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DESIGN_SYSTEM } from "@/contracts/config";
import { getRaiseDetails } from "@/contracts/contractService";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ClaimPage: React.FC = () => {
  const { raiseAddress } = useParams<{ raiseAddress: string }>();
  const { isConnected, connect, address } = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [raiseName, setRaiseName] = useState<string>("");
  const navigate = useNavigate();

  // Load raise info when address is available
  React.useEffect(() => {
    const loadRaiseData = async () => {
      if (!raiseAddress) return;

      try {
        setIsLoading(true);
        const raiseData = await getRaiseDetails(raiseAddress);
        if (!raiseData) {
          toast.error("Raise not found");
          navigate("/");
          return;
        }
        setRaiseName(raiseData.metadata.name);
      } catch (error) {
        console.error("Failed to load raise data:", error);
        toast.error("Failed to load raise data");
      } finally {
        setIsLoading(false);
      }
    };

    loadRaiseData();
  }, [raiseAddress, navigate]);

  const handleHedgeyRedirect = () => {
    // Redirect to Hedgey with the token address
    // In a real implementation, this would use the actual token address from the raise
    const hedgeyUrl = "https://hedgey.finance";
    window.open(hedgeyUrl, "_blank");

    toast.info("Redirecting to Hedgey Finance for token claiming", {
      style: {
        background: DESIGN_SYSTEM.colors.secondaryBackground,
        color: DESIGN_SYSTEM.colors.primaryText,
        border: `1px solid ${DESIGN_SYSTEM.colors.secondaryText}`,
      },
    });
  };

  if (isLoading) {
    return (
      <div
        className="container mx-auto px-8 py-16 max-w-[1280px]"
        style={{ fontFamily: DESIGN_SYSTEM.fonts.primary }}
      >
        <div className="flex justify-center items-center min-h-[300px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3277F5]"></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="container mx-auto px-8 py-16 max-w-[1280px]"
      style={{ fontFamily: DESIGN_SYSTEM.fonts.primary }}
    >
      <div className="mb-6">
        <Link
          to="/"
          className="text-[#3277F5] hover:text-[#3277F5]/80 flex items-center gap-1 mb-4"
        >
          <ArrowLeft size={16} />
          Back to Discovery
        </Link>
        <h1 className="text-3xl font-bold mb-4 text-[#F9F9F9]">
          Claim Your {raiseName} Tokens
        </h1>
        <p className="text-[#B0B6BD] max-w-2xl mb-6">
          Tokens from this raise are distributed through Hedgey vesting
          contracts. Connect your wallet to access your allocation.
        </p>
      </div>

      <Card className="bg-[#1A1A1A] border-[#333333] max-w-xl">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-medium text-[#F9F9F9] mb-2">
                Token Claim Process
              </h2>
              <p className="text-[#B0B6BD]">
                Vested tokens are managed by Hedgey Finance, a secure token
                vesting protocol. Your tokens will be distributed according to
                the vesting schedule established by the project team.
              </p>
            </div>

            {!isConnected ? (
              <div>
                <p className="text-[#B0B6BD] mb-4">
                  Connect your wallet to continue to the claim process.
                </p>
                <Button
                  onClick={connect}
                  className="w-full bg-[#3277F5] hover:bg-[#3277F5]/90 text-white"
                >
                  Connect Wallet
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-[#111111] rounded-lg border border-[#333333]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#B0B6BD]">Connected Address</span>
                    <span className="text-[#F9F9F9] font-mono text-sm">
                      {address?.slice(0, 6)}...{address?.slice(-4)}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-[#B0B6BD] mb-4">
                    Your tokens are managed through Hedgey Finance. Click below
                    to access the vesting dashboard.
                  </p>
                  <Button
                    onClick={handleHedgeyRedirect}
                    className="w-full bg-[#3277F5] hover:bg-[#3277F5]/90 text-white"
                  >
                    Go to Hedgey Finance
                  </Button>
                  <p className="text-xs text-[#B0B6BD] mt-2">
                    Note: Cradle does not control the vesting contracts or have
                    custody of your tokens. All claims are processed directly
                    through Hedgey.
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="mt-12 p-6 bg-[#1A1A1A] border border-[#333333] rounded-xl max-w-xl">
        <h3 className="text-lg font-medium text-[#F9F9F9] mb-3">
          About the Claim Process
        </h3>
        <ul className="space-y-3 text-[#B0B6BD]">
          <li className="flex gap-2">
            <div className="min-w-5 mt-1">•</div>
            <p>
              After connecting your wallet, you'll be directed to Hedgey
              Finance.
            </p>
          </li>
          <li className="flex gap-2">
            <div className="min-w-5 mt-1">•</div>
            <p>
              Hedgey will display your vested token balance and upcoming unlock
              schedule.
            </p>
          </li>
          <li className="flex gap-2">
            <div className="min-w-5 mt-1">•</div>
            <p>
              Claimable tokens can be transferred to your wallet directly
              through the Hedgey interface.
            </p>
          </li>
          <li className="flex gap-2">
            <div className="min-w-5 mt-1">•</div>
            <p>For claim issues, please contact the project team directly.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ClaimPage;
