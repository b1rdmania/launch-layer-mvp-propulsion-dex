
import React from "react";
import { Link } from "react-router-dom";
import { RaiseData } from "@/types/contract-types";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import RaiseStatusBadge from "./RaiseStatusBadge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

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
    <Card className="border-t-2 border-t-launchlayer-violet shadow-md hover:shadow-[0_2px_10px_rgba(167,139,250,0.12)] transition-all duration-300 hover:translate-y-[-2px]">
      <CardHeader className="pb-2 relative">
        <div className="flex justify-between items-start mb-4">
          <RaiseStatusBadge status={status} />
          {status !== "upcoming" && status !== "cancelled" && (
            <span className="text-xs bg-launchlayer-violet/10 text-launchlayer-violet px-2 py-0.5 rounded-full">
              {Math.round(progress)}% funded
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <img
            src={metadata.logoUrl}
            alt={`${metadata.name} logo`}
            className="w-12 h-12 rounded-full ring-1 ring-gray-700 bg-launchlayer-background"
          />
          <div className="text-left">
            <h3 className="font-bold text-lg">{metadata.name}</h3>
            <p className="text-sm text-launchlayer-text-secondary">{tokenSymbol}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-2">
        <p className="text-sm text-launchlayer-text-secondary line-clamp-2 mb-4">
          {metadata.description}
        </p>
        
        {status !== "upcoming" && status !== "cancelled" && (
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-xs text-launchlayer-text-secondary">Raised</span>
              <span className="text-xs text-launchlayer-text-secondary">
                {formatCurrency(totalAcceptedTokenRaised)} / {formatCurrency(maxAcceptedTokenRaise)} {acceptedTokenSymbol}
              </span>
            </div>
            <Progress 
              value={progress} 
              className="h-1.5 bg-gray-700"
              indicatorClassName="bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet" 
            />
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between items-center pt-2 border-t border-gray-700">
        <span className="text-xs text-launchlayer-text-secondary">
          {getTimeIndicator()}
        </span>
        
        <Link to={`/raise/${address}`}>
          <Button
            variant="violet"
            size="sm"
            className="group"
          >
            <span>View</span>
            <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-0.5 transition-transform duration-200" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RaiseCard;
