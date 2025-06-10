
import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import CurrentRaisesSection from "@/components/landing/CurrentRaisesSection";
import DeveloperSection from "@/components/landing/DeveloperSection";
import { Link } from "react-router-dom";
import { FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-launchlayer-background via-launchlayer-background to-launchlayer-surface">
      {/* Page Header with Beta Badge */}
      <div className="bg-launchlayer-surface border-b border-launchlayer-surface-light">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-launchlayer-accent bg-launchlayer-accent/10 px-3 py-1 rounded-full">
              PAGE 1
            </span>
            <h1 className="text-lg font-bold text-launchlayer-text-primary">
              Pitch Deck (Beta Version)
            </h1>
          </div>
          <Link to="/whitepaper">
            <Button variant="outline" size="sm" className="flex items-center space-x-2">
              <FileText size={16} />
              <span>Technical White Paper</span>
              <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </div>

      <HeroSection />
      
      {/* Section Separator */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-launchlayer-accent/20 to-transparent h-px"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-launchlayer-violet/10 to-transparent h-px top-1"></div>
      </div>
      
      {/* Core Principles Section - Page 2 */}
      <section className="py-16 md:py-24 bg-launchlayer-surface relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-noise"></div>
        {/* Mobile section indicator */}
        <div className="md:hidden absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-launchlayer-accent via-launchlayer-violet to-launchlayer-mint"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] relative">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-medium text-launchlayer-accent bg-launchlayer-accent/10 px-3 py-1 rounded-full">
                PAGE 2 - CORE PRINCIPLES
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-launchlayer-text-primary">
              Built on <span className="text-launchlayer-accent">Simple Principles</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet rounded-full mx-auto mb-4"></div>
            <p className="text-lg text-launchlayer-text-secondary max-w-3xl mx-auto">
              No gimmicks, no platform tokens, no artificial barriers. Just transparent, efficient token launches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-launchlayer-background/50 backdrop-blur-sm p-6 rounded-xl border border-launchlayer-surface-light hover:shadow-[0_8px_30px_rgba(50,119,245,0.1)] transition-all duration-300">
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

            <div className="bg-launchlayer-background/50 backdrop-blur-sm p-6 rounded-xl border border-launchlayer-surface-light hover:shadow-[0_8px_30px_rgba(167,139,250,0.1)] transition-all duration-300">
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

            <div className="bg-launchlayer-background/50 backdrop-blur-sm p-6 rounded-xl border border-launchlayer-surface-light hover:shadow-[0_8px_30px_rgba(99,206,198,0.1)] transition-all duration-300">
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

      {/* Section Separator */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-launchlayer-violet/20 to-transparent h-px"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-launchlayer-mint/10 to-transparent h-px top-1"></div>
        {/* Mobile dotted indicator */}
        <div className="md:hidden flex justify-center py-6">
          <div className="flex space-x-2">
            <div className="w-2 h-2 rounded-full bg-launchlayer-accent/40"></div>
            <div className="w-2 h-2 rounded-full bg-launchlayer-violet/40"></div>
            <div className="w-2 h-2 rounded-full bg-launchlayer-mint/40"></div>
          </div>
        </div>
      </div>

      {/* Page 3 - Current Raises */}
      <div className="bg-launchlayer-background py-4">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <span className="text-sm font-medium text-launchlayer-violet bg-launchlayer-violet/10 px-3 py-1 rounded-full">
              PAGE 3 - CURRENT RAISES
            </span>
          </div>
        </div>
      </div>
      <CurrentRaisesSection />
      
      {/* Section Separator */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-launchlayer-mint/20 to-transparent h-px"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-launchlayer-accent/10 to-transparent h-px top-1"></div>
        {/* Mobile section indicator */}
        <div className="md:hidden absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-launchlayer-mint via-launchlayer-accent to-launchlayer-violet"></div>
      </div>
      
      {/* Page 4 - Developer Section */}
      <div className="bg-launchlayer-background py-4">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <span className="text-sm font-medium text-launchlayer-mint bg-launchlayer-mint/10 px-3 py-1 rounded-full">
              PAGE 4 - DEVELOPER RESOURCES
            </span>
          </div>
        </div>
      </div>
      <DeveloperSection />
    </div>
  );
};

export default LandingPage;
