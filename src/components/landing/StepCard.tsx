
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StepCardProps {
  number: string;
  title: string;
  description: string;
  isActive?: boolean;
}

const StepCard: React.FC<StepCardProps> = ({ 
  number, 
  title, 
  description,
  isActive = false
}) => {
  return (
    <Card className={cn(
      "bg-launchlayer-surface border border-launchlayer-surface-light shadow-card hover:translate-y-[-2px] hover:shadow-[0_2px_10px_rgba(50,119,245,0.12)] transition-all duration-300", 
      isActive && "border-[#3787FB]"
    )}>
      <CardContent className="p-6 pt-6">
        <div className={cn(
          "flex items-center justify-center w-10 h-10 rounded-full text-white font-bold mb-4",
          isActive ? "bg-[#3787FB]" : "bg-launchlayer-accent"
        )}>
          {number}
        </div>
        <h3 className={cn(
          "text-lg font-bold mb-2 tracking-wider",
          isActive && "text-[#3787FB]"
        )}>{title}</h3>
        <p className="text-launchlayer-text-secondary text-[0.95rem] leading-[1.6]">{description}</p>
      </CardContent>
    </Card>
  );
};

export default StepCard;
