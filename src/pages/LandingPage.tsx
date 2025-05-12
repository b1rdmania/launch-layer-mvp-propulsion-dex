
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
      
      {/* Logo particles effect */}
      <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden z-[1]">
        {Array.from({ length: 15 }).map((_, i) => (
          <img 
            key={i}
            src="/lovable-uploads/e117309c-add3-4b3f-b49b-ee89f91a2df3.png"
            alt=""
            className="absolute"
            style={{
              width: `${Math.random() * 30 + 15}px`,
              opacity: Math.random() * 0.1 + 0.02,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 15 + 15}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 10}s`
            }}
          />
        ))}
      </div>
      
      {/* Content with z-index to appear above the background */}
      <div className="relative z-10">
        <HeroSection />
        <div className="relative z-10">
          <CurrentRaisesSection />
          <FeaturesSection />
        </div>
      </div>
      
      {/* Add CSS for the animations */}
      <style jsx="true">{`
        @keyframes float {
          0% { transform: translate(0, 0); }
          50% { transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px); }
          100% { transform: translate(0, 0); }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
