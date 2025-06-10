import React from "react";
import HeroSection from "@/components/landing/HeroSection";
import CurrentRaisesSection from "@/components/landing/CurrentRaisesSection";
import DeveloperSection from "@/components/landing/DeveloperSection";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, ArrowRight, BarChart3, TrendingUp } from "lucide-react";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-launchlayer-background via-launchlayer-background to-launchlayer-surface">
      <HeroSection />
      
      {/* Section Separator */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-launchlayer-accent/20 to-transparent h-px"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-launchlayer-violet/10 to-transparent h-px top-1"></div>
      </div>

      {/* Pitch Deck Section */}
      <section className="py-16 md:py-20 bg-launchlayer-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02] bg-noise"></div>
        <div className="md:hidden absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-launchlayer-violet via-launchlayer-accent to-launchlayer-mint"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] relative">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-medium text-launchlayer-violet bg-launchlayer-violet/10 px-3 py-1 rounded-full">
                INVESTOR MATERIALS
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-launchlayer-text-primary">
              <span className="text-launchlayer-violet">Pitch Deck</span> Available
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-launchlayer-violet to-launchlayer-accent rounded-full mx-auto mb-4"></div>
            <p className="text-lg text-launchlayer-text-secondary max-w-3xl mx-auto">
              Get a comprehensive overview of our vision, technology, and market opportunity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-launchlayer-surface/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-launchlayer-surface-light hover:shadow-[0_8px_30px_rgba(167,139,250,0.1)] transition-all duration-300">
              <div className="w-12 h-12 bg-launchlayer-violet/20 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-launchlayer-violet" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-launchlayer-text-primary">Interactive Pitch Deck</h3>
              <p className="text-launchlayer-text-secondary mb-6 leading-relaxed">
                Explore our comprehensive 7-slide presentation covering market opportunity, 
                technology architecture, revenue model, and team expertise.
              </p>
              <Link to="/pitch">
                <Button variant="outline" className="w-full border-launchlayer-violet/30 hover:bg-launchlayer-violet/10 group">
                  <span>View Pitch Deck</span>
                  <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            <div className="bg-launchlayer-surface/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-launchlayer-surface-light hover:shadow-[0_8px_30px_rgba(50,119,245,0.1)] transition-all duration-300">
              <div className="w-12 h-12 bg-launchlayer-accent/20 rounded-lg flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-launchlayer-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-launchlayer-text-primary">Key Highlights</h3>
              <ul className="space-y-3 text-launchlayer-text-secondary mb-6">
                <li className="flex items-start space-x-3">
                  <TrendingUp className="w-4 h-4 text-launchlayer-accent mt-1 flex-shrink-0" />
                  <span>Integrated flywheel: Yield + Launch + Liquidity</span>
                </li>
                <li className="flex items-start space-x-3">
                  <TrendingUp className="w-4 h-4 text-launchlayer-mint mt-1 flex-shrink-0" />
                  <span>Battle-tested team with proven track record</span>
                </li>
                <li className="flex items-start space-x-3">
                  <TrendingUp className="w-4 h-4 text-launchlayer-violet mt-1 flex-shrink-0" />
                  <span>Clear revenue model and market opportunity</span>
                </li>
              </ul>
              <div className="text-sm text-launchlayer-text-secondary bg-launchlayer-accent/10 p-3 rounded-lg border border-launchlayer-accent/20">
                <p className="font-medium text-launchlayer-accent mb-1">Beta Version</p>
                <p>This is an early version of our investor presentation, updated regularly with the latest developments.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section Separator */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-launchlayer-accent/20 to-transparent h-px"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-launchlayer-violet/10 to-transparent h-px top-1"></div>
      </div>
      
      {/* Core Principles Section - Alternating background */}
      <section className="py-16 md:py-24 bg-launchlayer-surface relative overflow-hidden">
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.02] bg-noise"></div>
        {/* Mobile section indicator */}
        <div className="md:hidden absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-launchlayer-accent via-launchlayer-violet to-launchlayer-mint"></div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] relative">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-block mb-4">
              <span className="text-sm font-medium text-launchlayer-accent bg-launchlayer-accent/10 px-3 py-1 rounded-full">
                CORE PRINCIPLES
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

      <CurrentRaisesSection />
      
      {/* Section Separator */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-launchlayer-mint/20 to-transparent h-px"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-launchlayer-accent/10 to-transparent h-px top-1"></div>
        {/* Mobile section indicator */}
        <div className="md:hidden absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-launchlayer-mint via-launchlayer-accent to-launchlayer-violet"></div>
      </div>
      
      <DeveloperSection />
    </div>
  );
};

export default LandingPage;
