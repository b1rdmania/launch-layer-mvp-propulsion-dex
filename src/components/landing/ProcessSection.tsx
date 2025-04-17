import React from "react";
import DetailCard from "./DetailCard";

const ProcessSection: React.FC = () => {
  return (
    <section className="py-16 bg-cradle-surface">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <h2 className="text-3xl font-bold text-center mb-12">
          Transparent On-Chain Process
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <DetailCard
            number="01"
            title="Configure"
            description="Set token details, precise sale parameters (fixed price, dates, caps, limits), fees, metadata, optional whitelist. Define vesting intent for Hedgey."
          />
          <DetailCard
            number="02"
            title="Deploy via Factory"
            description="Launch your standardized CradleRaise contract using the secure Cradle Factory. Pay standard gas; configurable fee applied on withdrawal."
          />
          <DetailCard
            number="03"
            title="Finalize & Distribute"
            description="Monitor contributions on-chain. Finalize post-end, sweep funds, export data for vesting/claims via Hedgey."
          />
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
