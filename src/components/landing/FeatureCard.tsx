
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  borderColor?: "accent" | "violet" | "mint";
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  borderColor = "accent",
}) => {
  const getBorderColor = () => {
    switch (borderColor) {
      case "accent": return "border-t-launchlayer-accent";
      case "violet": return "border-t-launchlayer-violet";
      case "mint": return "border-t-launchlayer-mint";
      default: return "border-t-launchlayer-accent";
    }
  };

  return (
    <Card 
      className={`relative bg-gradient-to-br from-launchlayer-surface to-launchlayer-surface/90 backdrop-blur-sm border-t-2 ${getBorderColor()} border-launchlayer-surface-light shadow-xl hover:shadow-[0_8px_30px_rgba(50,119,245,0.10)] hover:translate-y-[-8px] transition-all duration-300 overflow-hidden h-full`}
    >
      {/* Subtle accent glow in corner */}
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-[60px] opacity-10 bg-launchlayer-${borderColor}`} />
      
      <CardContent className="p-6 pt-6 relative z-10 h-full flex flex-col">
        <div className={`mb-5 w-16 h-16 rounded-2xl bg-launchlayer-surface-light bg-opacity-50 flex items-center justify-center`}>
          <div className="group-hover:scale-110 transition-all duration-300">{icon}</div>
        </div>
        <h3 className="text-xl font-bold mb-3 tracking-tight">{title}</h3>
        <p className="text-launchlayer-text-secondary text-[0.95rem] leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
