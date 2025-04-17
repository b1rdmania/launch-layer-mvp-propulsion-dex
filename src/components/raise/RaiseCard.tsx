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
    <div className="bg-cradle-surface rounded-xl p-4 border border-cradle-surface-light hover:scale-[1.03] transition-transform duration-200 shadow-lg">
      <div className="flex items-center space-x-3 mb-4">
        <img
          src={metadata.logoUrl}
          alt={`${metadata.name} logo`}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="font-medium text-lg">{metadata.name}</h3>
          <p className="text-sm text-cradle-text-secondary">{tokenSymbol}</p>
        </div>
      </div>

      <div className="mb-4">
        <RaiseStatusBadge status={status} />
        <p className="text-sm mt-2 text-cradle-text-secondary">
          {metadata.description}
        </p>
      </div>

      {status !== "upcoming" && status !== "cancelled" && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>
              {formatCurrency(totalAcceptedTokenRaised)} /{" "}
              {formatCurrency(maxAcceptedTokenRaise)} {acceptedTokenSymbol}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-cradle-text-secondary">
          {getTimeIndicator()}
        </span>

        <Link to={`/raise/${address}`}>
          <Button
            variant="default"
            className="bg-cradle-accent hover:bg-cradle-accent/90"
          >
            View Sale
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default RaiseCard;
