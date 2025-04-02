
import React from 'react';
import { Fingerprint, LineChart, Code, Settings, Workflow, Shield } from 'lucide-react';
import FeatureCard from './FeatureCard';

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 bg-cradle-surface">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <h2 className="text-3xl font-bold text-center mb-4">Built for Transparent & Fair Launches on Sonic</h2>
        <p className="text-cradle-text-secondary text-center mb-12 max-w-2xl mx-auto">
          Cradle's V1 platform provides everything you need for a successful token launch on Sonic Network
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Fingerprint size={32} className="text-cradle-accent" />}
            title="No Platform Token"
            description="Open access for participants and launchers. No need to buy or stake platform tokens."
          />
          <FeatureCard
            icon={<LineChart size={32} className="text-cradle-accent" />}
            title="Fixed-Price Predictability"
            description="Simple, clear pricing. Optional presale phase via Merkle Proof for controlled access."
          />
          <FeatureCard
            icon={<Code size={32} className="text-cradle-accent" />}
            title="Factory Deployed"
            description="Standardized, immutable contracts deployed via the CradleFactory ensure transparency and consistency."
          />
          <FeatureCard
            icon={<Settings size={32} className="text-cradle-accent" />}
            title="Configurable Limits"
            description="Fair distribution via project-set hard caps and per-wallet min/max contribution limits."
          />
          <FeatureCard
            icon={<Workflow size={32} className="text-cradle-accent" />}
            title="Hedgey Vesting Integration"
            description="Easy post-sale workflow. Export allocation data for seamless vesting schedule setup on Hedgey."
          />
          <FeatureCard
            icon={<Shield size={32} className="text-cradle-accent" />}
            title="Audited & Secure (Goal)"
            description="Built on standards, aiming for security best practices and a full V1 audit."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
