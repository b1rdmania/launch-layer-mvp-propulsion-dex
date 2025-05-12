
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
        
        {/* Animated logos section before footer */}
        <div className="py-20 relative overflow-hidden">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Built on <span className="text-gradient">Sonic Network</span>
            </h2>
            <p className="text-launchlayer-text-secondary mb-12 max-w-2xl mx-auto">
              Launch Layer provides the most streamlined token launch experience with zero games and complete transparency.
            </p>
            
            {/* Animated logos */}
            <div className="relative h-60">
              <img 
                src="/lovable-uploads/c054fc20-c0d7-4c0c-9d55-8dc40e350c79.png" 
                alt="Launch Layer Logo"
                className="absolute w-16 h-16 left-1/4 top-0 floating-logo animate-first" 
              />
              <img 
                src="/lovable-uploads/c054fc20-c0d7-4c0c-9d55-8dc40e350c79.png" 
                alt="Launch Layer Logo"
                className="absolute w-20 h-20 left-1/2 top-1/4 transform -translate-x-1/2 floating-logo animate-second" 
              />
              <img 
                src="/lovable-uploads/c054fc20-c0d7-4c0c-9d55-8dc40e350c79.png" 
                alt="Launch Layer Logo"
                className="absolute w-28 h-28 left-2/3 top-1/3 transform -translate-y-1/2 floating-logo animate-third" 
              />
              {/* 3D rotating logo in center */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <img 
                  src="/lovable-uploads/c054fc20-c0d7-4c0c-9d55-8dc40e350c79.png" 
                  alt="Launch Layer Logo"
                  className="w-32 h-32 rotate-3d" 
                />
              </div>
            </div>
          </div>
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
