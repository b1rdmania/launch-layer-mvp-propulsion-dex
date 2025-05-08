
import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import LaunchFlowSection from "@/components/landing/LaunchFlowSection";
import ProcessSection from "@/components/landing/ProcessSection";
import CurrentRaisesSection from "@/components/landing/CurrentRaisesSection";
import MiniRaiseExample from "@/components/landing/MiniRaiseExample";
import CtaSection from "@/components/landing/CtaSection";
import DeveloperSection from "@/components/landing/DeveloperSection";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-cradle-background">
      <HeroSection />
      <SocialProofSection />
      <FeaturesSection />
      
      <section className="py-16 bg-cradle-background">
        <div className="container mx-auto px-8 max-w-[1280px]">
          <h2 className="text-3xl font-bold mb-4 text-center">What a Raise Looks Like</h2>
          <p className="text-cradle-text-secondary mb-10 text-center max-w-2xl mx-auto">
            Simple, transparent, and efficient. Launch Layer provides all the tools you need 
            to create and manage your token raise with minimal friction.
          </p>
          <MiniRaiseExample />
        </div>
      </section>
      
      <LaunchFlowSection />
      <CurrentRaisesSection />
      <ProcessSection />
      <DeveloperSection />
      <CtaSection />
    </div>
  );
};

export default LandingPage;
