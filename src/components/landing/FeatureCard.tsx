
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
    <Card className="bg-launchlayer-surface border-launchlayer-surface-light card-hover shadow-card">
      <CardContent className="p-6 pt-6">
        <div className="mb-4 text-launchlayer-accent">{icon}</div>
        <h3 className="text-lg font-bold mb-2 tracking-wider">{title}</h3>
        <p className="text-launchlayer-text-secondary text-[0.95rem] leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
