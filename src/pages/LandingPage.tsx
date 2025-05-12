
import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CurrentRaisesSection from "@/components/landing/CurrentRaisesSection";
import LaunchesSection from "@/components/landing/LaunchesSection";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-launchlayer-background">
      {/* Content */}
      <div>
        <HeroSection />
        <CurrentRaisesSection />
        <FeaturesSection />
        <LaunchesSection />
      </div>
    </div>
  );
};

export default LandingPage;
