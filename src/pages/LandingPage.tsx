
import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CurrentRaisesSection from "@/components/landing/CurrentRaisesSection";
import MiniRaiseExample from "@/components/landing/MiniRaiseExample";

const LandingPage: React.FC = () => {
  return (
    <div className="bg-launchlayer-background">
      <HeroSection />
      <FeaturesSection />
      
      <section className="py-16 bg-launchlayer-background">
        <div className="container mx-auto px-8 max-w-[1280px]">
          <h2 className="text-3xl font-bold mb-4 text-center tracking-wider">What a Raise Looks Like</h2>
          <p className="text-launchlayer-text-secondary mb-10 text-center max-w-2xl mx-auto">
            Simple, transparent, and efficient. Launch Layer provides all the tools you need 
            to create and manage your token raise with minimal friction.
          </p>
          <MiniRaiseExample />
        </div>
      </section>
      
      <CurrentRaisesSection />
    </div>
  );
};

export default LandingPage;
