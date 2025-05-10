
import React, { useEffect } from "react";
import {
  Fingerprint,
  LineChart,
  Terminal,
  Settings,
  Workflow,
  Shield,
} from "lucide-react";
import FeatureCard from "./FeatureCard";

const FeaturesSection: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    document.querySelectorAll('.slide-in').forEach(element => {
      observer.observe(element);
    });
    
    return () => {
      document.querySelectorAll('.slide-in').forEach(element => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <section className="py-24 relative z-10 overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-launchlayer-violet/5 rounded-full blur-[100px]"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-launchlayer-accent/5 rounded-full blur-[100px]"></div>

      <div className="container mx-auto px-8 max-w-[1280px] relative z-10">
        <div className="flex flex-col items-center mb-16">
          <span className="px-4 py-1.5 rounded-full bg-launchlayer-violet/10 text-launchlayer-violet text-sm font-medium mb-6">
            OUR PLATFORM
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 tracking-tight">
            Built for Transparent & Fair Launches
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet rounded-full mb-6"></div>
          <p className="text-xl text-launchlayer-text-secondary text-center max-w-2xl">
            Launch Layer provides everything you need for a successful token launch on Sonic Network.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="slide-in" style={{transitionDelay: '100ms'}}>
            <FeatureCard
              icon={<Fingerprint size={32} className="text-launchlayer-violet" strokeWidth={1.5} />}
              title="No Platform Token"
              description="Open access for participants and launchers. No need to buy or stake platform tokens."
              borderColor="violet"
            />
          </div>
          <div className="slide-in" style={{transitionDelay: '200ms'}}>
            <FeatureCard
              icon={<LineChart size={32} className="text-launchlayer-mint" strokeWidth={1.5} />}
              title="Fixed-Price Predictability"
              description="Simple, clear pricing. Optional presale phase via Merkle Proof for controlled access."
              borderColor="mint"
            />
          </div>
          <div className="slide-in" style={{transitionDelay: '300ms'}}>
            <FeatureCard
              icon={<Terminal size={32} className="text-launchlayer-accent" strokeWidth={1.5} />}
              title="Factory Deployed"
              description="Standardized, immutable contracts deployed via the LaunchFactory ensure transparency and consistency."
              borderColor="accent"
            />
          </div>
          <div className="slide-in" style={{transitionDelay: '400ms'}}>
            <FeatureCard
              icon={<Settings size={32} className="text-launchlayer-mint" strokeWidth={1.5} />}
              title="Configurable Limits"
              description="Fair distribution via project-set hard caps and per-wallet min/max contribution limits."
              borderColor="mint"
            />
          </div>
          <div className="slide-in" style={{transitionDelay: '500ms'}}>
            <FeatureCard
              icon={<Workflow size={32} className="text-launchlayer-violet" strokeWidth={1.5} />}
              title="Hedgey Vesting Integration"
              description="Easy post-sale workflow. Export allocation data for seamless vesting schedule setup on Hedgey."
              borderColor="violet"
            />
          </div>
          <div className="slide-in" style={{transitionDelay: '600ms'}}>
            <FeatureCard
              icon={<Shield size={32} className="text-launchlayer-accent" strokeWidth={1.5} />}
              title="Audited & Secure (Goal)"
              description="Built on standards, aiming for security best practices and a full V1 audit."
              borderColor="accent"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
