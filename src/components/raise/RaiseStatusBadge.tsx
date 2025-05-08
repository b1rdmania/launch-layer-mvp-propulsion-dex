
import React from "react";
import { cn } from "@/lib/utils";
import { RaiseStatus } from "@/types/contract-types";

interface RaiseStatusBadgeProps {
  status: RaiseStatus;
  className?: string;
}

const RaiseStatusBadge: React.FC<RaiseStatusBadgeProps> = ({
  status,
  className,
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case "upcoming":
        return { label: "Upcoming", bgColor: "bg-gray-700 text-gray-300" };
      case "presale":
        return { label: "Presale", bgColor: "bg-launchlayer-accent/20 text-launchlayer-accent" };
      case "public":
        return { label: "Public Sale", bgColor: "bg-launchlayer-mint/20 text-launchlayer-mint" };
      case "ended":
        return { label: "Ended", bgColor: "bg-neutral-700/30 text-neutral-300" };
      case "cancelled":
        return { label: "Cancelled", bgColor: "bg-red-600/20 text-red-400" };
      case "finalized":
        return { label: "Finalized", bgColor: "bg-launchlayer-violet/20 text-launchlayer-violet" };
      default:
        return { label: "Unknown", bgColor: "bg-gray-700/30 text-gray-300" };
    }
  };

  const { label, bgColor } = getStatusConfig();

  return (
    <div
      className={cn(
        "px-2.5 py-0.5 text-xs rounded-full font-medium inline-block",
        bgColor,
        className,
      )}
    >
      {label}
    </div>
  );
};

export default RaiseStatusBadge;
