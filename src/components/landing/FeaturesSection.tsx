
import React from "react";
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
  return (
    <section className="py-16 bg-launchlayer-surface">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <h2 className="text-3xl font-bold text-center mb-4 tracking-wider">
          Built for Transparent & Fair Launches on Sonic
        </h2>
        <p className="text-launchlayer-text-secondary text-center mb-12 max-w-2xl mx-auto">
          Launch Layer's V1 platform provides everything you need for a successful
          token launch on Sonic Network
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Fingerprint size={32} className="text-launchlayer-accent" />}
            title="No Platform Token"
            description="Open access for participants and launchers. No need to buy or stake platform tokens."
          />
          <FeatureCard
            icon={<LineChart size={32} className="text-launchlayer-accent" />}
            title="Fixed-Price Predictability"
            description="Simple, clear pricing. Optional presale phase via Merkle Proof for controlled access."
          />
          <FeatureCard
            icon={<Terminal size={32} className="text-launchlayer-accent" />}
            title="Factory Deployed"
            description="Standardized, immutable contracts deployed via the LaunchFactory ensure transparency and consistency."
          />
          <FeatureCard
            icon={<Settings size={32} className="text-launchlayer-accent" />}
            title="Configurable Limits"
            description="Fair distribution via project-set hard caps and per-wallet min/max contribution limits."
          />
          <FeatureCard
            icon={<Workflow size={32} className="text-launchlayer-accent" />}
            title="Hedgey Vesting Integration"
            description="Easy post-sale workflow. Export allocation data for seamless vesting schedule setup on Hedgey."
          />
          <FeatureCard
            icon={<Shield size={32} className="text-launchlayer-accent" />}
            title="Audited & Secure (Goal)"
            description="Built on standards, aiming for security best practices and a full V1 audit."
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
