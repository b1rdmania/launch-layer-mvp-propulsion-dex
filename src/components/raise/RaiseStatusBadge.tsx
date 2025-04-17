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
        return { label: "Upcoming", bgColor: "bg-gray-700 text-gray-200" };
      case "presale":
        return { label: "Presale", bgColor: "bg-blue-600 text-white" };
      case "public":
        return { label: "Public Sale", bgColor: "bg-green-600 text-white" };
      case "ended":
        return { label: "Ended", bgColor: "bg-neutral-600 text-neutral-200" };
      case "cancelled":
        return { label: "Cancelled", bgColor: "bg-red-600 text-white" };
      case "finalized":
        return { label: "Finalized", bgColor: "bg-purple-600 text-white" };
      default:
        return { label: "Unknown", bgColor: "bg-gray-600 text-gray-200" };
    }
  };

  const { label, bgColor } = getStatusConfig();

  return (
    <div
      className={cn(
        "px-2 py-0.5 text-xs rounded-full font-medium inline-block",
        bgColor,
        className,
      )}
    >
      {label}
    </div>
  );
};

export default RaiseStatusBadge;
