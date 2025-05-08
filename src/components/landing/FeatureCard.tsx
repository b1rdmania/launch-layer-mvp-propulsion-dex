
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <Card className="bg-launchlayer-surface border-launchlayer-surface-light shadow-card hover:translate-y-[-2px] hover:shadow-[0_2px_10px_rgba(50,119,245,0.12)] transition-all duration-300">
      <CardContent className="p-6 pt-6">
        <div className="mb-4 text-launchlayer-accent group-hover:brightness-110 transition-all">{icon}</div>
        <h3 className="text-lg font-bold mb-2 tracking-wider">{title}</h3>
        <p className="text-launchlayer-text-secondary text-[0.95rem] leading-[1.6]">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
