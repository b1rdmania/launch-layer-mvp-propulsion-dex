
import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CurrentRaisesSection from "@/components/landing/CurrentRaisesSection";
import BackgroundPatternSection from "@/components/landing/BackgroundPatternSection";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-launchlayer-background relative">
      <BackgroundPatternSection />
      <HeroSection />
      <CurrentRaisesSection />
      <FeaturesSection />
    </div>
  );
};

export default LandingPage;
