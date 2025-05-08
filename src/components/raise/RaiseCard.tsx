
import React from "react";
import { Link } from "react-router-dom";
import { RaiseData } from "@/types/contract-types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import RaiseStatusBadge from "./RaiseStatusBadge";

interface RaiseCardProps {
  raise: RaiseData;
}

const RaiseCard: React.FC<RaiseCardProps> = ({ raise }) => {
  const {
    address,
    metadata,
    tokenSymbol,
    maxAcceptedTokenRaise,
    totalAcceptedTokenRaised,
    acceptedTokenSymbol,
    status,
    presaleStart,
    publicSaleStart,
    endTime,
  } = raise;

  // Calculate progress percentage
  const progress =
    (parseFloat(totalAcceptedTokenRaised) / parseFloat(maxAcceptedTokenRaise)) *
    100;

  // Format currency amounts
  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount);
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  // Calculate time remaining/passed
  const getTimeIndicator = () => {
    const now = Date.now();

    if (status === "upcoming") {
      const timeToStart = Math.max(0, presaleStart - now);
      const days = Math.floor(timeToStart / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeToStart % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      return `Starts in ${days}d ${hours}h`;
    } else if (status === "presale") {
      const timeToPublic = Math.max(0, publicSaleStart - now);
      const hours = Math.floor(timeToPublic / (1000 * 60 * 60));
      const minutes = Math.floor(
        (timeToPublic % (1000 * 60 * 60)) / (1000 * 60),
      );
      return `Presale ends in ${hours}h ${minutes}m`;
    } else if (status === "public") {
      const timeToEnd = Math.max(0, endTime - now);
      const days = Math.floor(timeToEnd / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeToEnd % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      return `Ends in ${days}d ${hours}h`;
    } else if (status === "cancelled") {
      return "Sale cancelled";
    } else {
      return "Sale ended";
    }
  };

  return (
    <div className="bg-launchlayer-surface rounded-xl p-4 border border-launchlayer-surface-light hover:scale-[1.03] transition-transform duration-200 shadow-lg hover:shadow-[0_2px_10px_rgba(50,119,245,0.12)]">
      <div className="relative">
        <div className="absolute top-0 left-0 md:relative md:top-auto md:left-auto">
          <RaiseStatusBadge status={status} className="md:mb-2" />
        </div>
        <div className="flex items-center space-x-3 mb-4 mt-6 md:mt-0">
          <img
            src={metadata.logoUrl}
            alt={`${metadata.name} logo`}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h3 className="font-medium text-lg">{metadata.name}</h3>
            <p className="text-sm text-launchlayer-text-secondary">{tokenSymbol}</p>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm mt-2 text-launchlayer-text-secondary line-clamp-2">
          {metadata.description}
        </p>
      </div>

      {status !== "upcoming" && status !== "cancelled" && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span className="md:inline hidden">
              {formatCurrency(totalAcceptedTokenRaised)} /{" "}
              {formatCurrency(maxAcceptedTokenRaise)} {acceptedTokenSymbol}
            </span>
            <span className="md:hidden inline">
              {formatCurrency(totalAcceptedTokenRaised)}/{formatCurrency(maxAcceptedTokenRaise)}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-2">
        <span className="text-xs md:text-sm text-launchlayer-text-secondary w-full md:w-auto text-center md:text-left">
          {getTimeIndicator()}
        </span>

        <Link to={`/raise/${address}`} className="w-full md:w-auto">
          <Button
            variant="accent"
            className="w-full hover:shadow-[0_0_6px_rgba(50,119,245,0.3)] hover:scale-[1.03]"
          >
            View Sale
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RaiseCard;
