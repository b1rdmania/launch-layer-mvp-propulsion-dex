
import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import LaunchFlowSection from "@/components/landing/LaunchFlowSection";
import ProcessSection from "@/components/landing/ProcessSection";
import CurrentRaisesSection from "@/components/landing/CurrentRaisesSection";
import CtaSection from "@/components/landing/CtaSection";
import DeveloperSection from "@/components/landing/DeveloperSection";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-cradle-background">
      <HeroSection />
      <FeaturesSection />
      <LaunchFlowSection />
      <CurrentRaisesSection />
      <ProcessSection />
      <DeveloperSection />
      <CtaSection />
    </div>
  );
};

export default LandingPage;
