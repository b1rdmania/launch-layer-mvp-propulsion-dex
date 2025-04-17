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
    <Card className="bg-cradle-surface-light border-cradle-surface hover:scale-[1.02] transition-transform duration-200">
      <CardContent className="p-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-cradle-text-secondary">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
