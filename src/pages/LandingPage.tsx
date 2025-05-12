
import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CurrentRaisesSection from "@/components/landing/CurrentRaisesSection";
import BackgroundPatternSection from "@/components/landing/BackgroundPatternSection";
import { useDeviceDetect } from "@/hooks/useDeviceDetect";

const LandingPage: React.FC = () => {
  const { isMobile, isIOS } = useDeviceDetect();
  
  // Add iOS-specific class if needed
  React.useEffect(() => {
    if (isIOS) {
      document.body.classList.add('ios-device');
    } else {
      document.body.classList.remove('ios-device');
    }
    
    return () => {
      document.body.classList.remove('ios-device');
    };
  }, [isIOS]);
  
  return (
    <div className="bg-launchlayer-background overflow-hidden">
      <BackgroundPatternSection />
      {/* Content */}
      <div className="relative z-10">
        <HeroSection />
        <CurrentRaisesSection />
        <FeaturesSection />
      </div>
      
      {/* iOS safe area bottom padding */}
      {isIOS && <div className="h-8 md:hidden"></div>}
    </div>
  );
};

export default LandingPage;
