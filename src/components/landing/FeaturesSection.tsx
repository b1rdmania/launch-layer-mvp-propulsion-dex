
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
    <section className="py-16 bg-launchlayer-surface">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <h2 className="text-3xl font-bold text-center mb-2 tracking-wider slide-in">
          Built for Transparent & Fair Launches on Sonic
        </h2>
        <p className="text-launchlayer-violet font-medium text-center mb-4 slide-in">Simplified Token Launches</p>
        <p className="text-launchlayer-text-secondary text-center mb-12 max-w-2xl mx-auto slide-in">
          Launch Layer's V1 platform provides everything you need for a successful
          token launch on Sonic Network
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="slide-in" style={{transitionDelay: '100ms'}}>
            <FeatureCard
              icon={<Fingerprint size={32} className="text-launchlayer-violet" strokeWidth={1.5} />}
              title="No Platform Token"
              description="Open access for participants and launchers. No need to buy or stake platform tokens."
            />
          </div>
          <div className="slide-in" style={{transitionDelay: '200ms'}}>
            <FeatureCard
              icon={<LineChart size={32} className="text-launchlayer-mint" strokeWidth={1.5} />}
              title="Fixed-Price Predictability"
              description="Simple, clear pricing. Optional presale phase via Merkle Proof for controlled access."
            />
          </div>
          <div className="slide-in" style={{transitionDelay: '300ms'}}>
            <FeatureCard
              icon={<Terminal size={32} className="text-launchlayer-accent" strokeWidth={1.5} />}
              title="Factory Deployed"
              description="Standardized, immutable contracts deployed via the LaunchFactory ensure transparency and consistency."
            />
          </div>
          <div className="slide-in" style={{transitionDelay: '400ms'}}>
            <FeatureCard
              icon={<Settings size={32} className="text-launchlayer-mint" strokeWidth={1.5} />}
              title="Configurable Limits"
              description="Fair distribution via project-set hard caps and per-wallet min/max contribution limits."
            />
          </div>
          <div className="slide-in" style={{transitionDelay: '500ms'}}>
            <FeatureCard
              icon={<Workflow size={32} className="text-launchlayer-violet" strokeWidth={1.5} />}
              title="Hedgey Vesting Integration"
              description="Easy post-sale workflow. Export allocation data for seamless vesting schedule setup on Hedgey."
            />
          </div>
          <div className="slide-in" style={{transitionDelay: '600ms'}}>
            <FeatureCard
              icon={<Shield size={32} className="text-launchlayer-accent" strokeWidth={1.5} />}
              title="Audited & Secure (Goal)"
              description="Built on standards, aiming for security best practices and a full V1 audit."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
