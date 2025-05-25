
import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import CurrentRaisesSection from "@/components/landing/CurrentRaisesSection";
import DeveloperSection from "@/components/landing/DeveloperSection";
import ResourcesSection from "@/components/landing/ResourcesSection";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-launchlayer-background via-launchlayer-background to-launchlayer-surface">
      <HeroSection />
      
      {/* Core Principles Section */}
      <section className="py-16 md:py-24 bg-launchlayer-background relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px]">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-launchlayer-text-primary">
              Built on <span className="text-launchlayer-accent">Simple Principles</span>
            </h2>
            <p className="text-lg text-launchlayer-text-secondary max-w-3xl mx-auto">
              No gimmicks, no platform tokens, no artificial barriers. Just transparent, efficient token launches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-launchlayer-surface p-6 rounded-xl border border-launchlayer-surface-light">
              <div className="w-12 h-12 bg-launchlayer-accent/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-launchlayer-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-launchlayer-text-primary">Permissionless</h3>
              <p className="text-launchlayer-text-secondary">
                Deploy your token sale without approval, KYC, or gatekeepers. Your project, your timeline.
              </p>
            </div>

            <div className="bg-launchlayer-surface p-6 rounded-xl border border-launchlayer-surface-light">
              <div className="w-12 h-12 bg-launchlayer-violet/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-launchlayer-violet" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-launchlayer-text-primary">Transparent</h3>
              <p className="text-launchlayer-text-secondary">
                All contracts are open source. No hidden fees, no surprise mechanics, no platform tokens required.
              </p>
            </div>

            <div className="bg-launchlayer-surface p-6 rounded-xl border border-launchlayer-surface-light">
              <div className="w-12 h-12 bg-launchlayer-mint/20 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-launchlayer-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-launchlayer-text-primary">Efficient</h3>
              <p className="text-launchlayer-text-secondary">
                Fixed-price sales with instant finalization. No bonding curves, no price discovery games.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CurrentRaisesSection />
      <DeveloperSection />
      <ResourcesSection />
    </div>
  );
};

export default LandingPage;
