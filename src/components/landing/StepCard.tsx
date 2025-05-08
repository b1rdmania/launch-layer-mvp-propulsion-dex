
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface StepCardProps {
  number: string;
  title: string;
  description: string;
}

const StepCard: React.FC<StepCardProps> = ({ number, title, description }) => {
  return (
    <Card className="bg-launchlayer-surface border border-launchlayer-surface-light hover:border-launchlayer-accent/50 transition-colors shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-launchlayer-accent text-white font-bold mb-4">
          {number}
        </div>
        <h3 className="text-lg font-bold mb-2 tracking-wider">{title}</h3>
        <p className="text-launchlayer-text-secondary text-[0.95rem] leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

export default StepCard;
