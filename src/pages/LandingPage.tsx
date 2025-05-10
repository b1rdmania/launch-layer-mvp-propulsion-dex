
import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CurrentRaisesSection from "@/components/landing/CurrentRaisesSection";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-launchlayer-background relative">
      <HeroSection />
      <div className="relative z-10 bg-launchlayer-background">
        <CurrentRaisesSection />
        <FeaturesSection />
      </div>
    </div>
  );
};

export default LandingPage;
