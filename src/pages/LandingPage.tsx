
import React from 'react';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import LaunchFlowSection from '@/components/landing/LaunchFlowSection';
import ProcessSection from '@/components/landing/ProcessSection';
import CtaSection from '@/components/landing/CtaSection';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-cradle-background">
      <HeroSection />
      <FeaturesSection />
      <LaunchFlowSection />
      <ProcessSection />
      <CtaSection />
    </div>
  );
};

export default LandingPage;
