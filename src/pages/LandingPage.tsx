
import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CurrentRaisesSection from "@/components/landing/CurrentRaisesSection";
import MovingGradientBackground from "@/components/landing/MovingGradientBackground";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-launchlayer-background relative">
      {/* Moving Gradient Background for entire page */}
      <MovingGradientBackground />
      
      {/* Content with z-index to appear above the background */}
      <div className="relative z-10">
        <HeroSection />
        <div className="relative z-10">
          <CurrentRaisesSection />
          <FeaturesSection />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
