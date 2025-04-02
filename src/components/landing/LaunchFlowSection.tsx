
import React from 'react';
import StepCard from './StepCard';

const LaunchFlowSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <h2 className="text-3xl font-bold text-center mb-4">Simple Steps to Launch Your Token</h2>
        <p className="text-cradle-text-secondary text-center mb-12 max-w-2xl mx-auto">
          From configuration to vesting, Cradle streamlines the entire token launch process
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StepCard
            number="1"
            title="Configure"
            description="Set sale parameters, metadata, & optional presale list via the Cradle interface."
          />
          <StepCard
            number="2"
            title="Deploy"
            description="Launch your unique CradleRaise contract onto Sonic via the CradleFactory."
          />
          <StepCard
            number="3"
            title="Contribute"
            description="Community contributes accepted token during active presale/public phases."
          />
          <StepCard
            number="4"
            title="Finalize & Sweep"
            description="Owner finalizes sale post-end & withdraws funds (fee applied)."
          />
          <StepCard
            number="5"
            title="Export & Vest"
            description="Export allocation data for easy vesting setup on Hedgey Finance."
          />
        </div>
      </div>
    </section>
  );
};

export default LaunchFlowSection;
