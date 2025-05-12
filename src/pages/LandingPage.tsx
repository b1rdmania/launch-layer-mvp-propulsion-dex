
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
      
      <style>
        {`
          /* Add any additional global styles for the landing page here */
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          
          .floating-logo {
            animation: float 6s infinite ease-in-out;
          }
          
          @keyframes rotate3d {
            0% { transform: rotateY(0deg); }
            100% { transform: rotateY(360deg); }
          }
          
          .rotate-3d {
            animation: rotate3d 8s infinite linear;
            transform-style: preserve-3d;
          }
        `}
      </style>
    </div>
  );
};

export default LandingPage;
