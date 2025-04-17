import React from "react";
import ResourceCard from "./ResourceCard";

const ResourcesSection: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-8 max-w-[1280px]">
        <h2 className="text-3xl font-bold mb-8">Get Started Building</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <ResourceCard
            title="Documentation"
            description="Comprehensive guides for configuring raises, interacting with the Factory, Hedgey vesting setup, and V1 contracts."
            linkText="View Docs"
            linkUrl="#"
          />
          <ResourceCard
            title="Contract Interfaces (ABIs)"
            description="Interact directly with deployed contracts on Sonic. ABIs available in the GitHub repo (abis/)."
            linkText="Explore ABIs on GitHub"
            linkUrl="#"
          />
          <ResourceCard
            title="Example Code"
            description="Quick start guides and code examples to help you integrate with Cradle's contracts."
            linkText="View Examples"
            linkUrl="#"
          />
        </div>

        <div className="bg-cradle-surface rounded-xl p-6">
          <h3 className="text-lg font-bold font-mono mb-2">
            Quick Start Example (Ethers.js - Factory Interaction)
          </h3>
          <pre className="bg-black bg-opacity-50 p-4 rounded-lg overflow-x-auto">
            <code className="text-sm font-mono text-cradle-text-primary">
              {`// See GitHub README for full setup and parameter details
import { ethers } from "ethers";
import CradleFactoryAbi from "./abis/CradleFactory.json";
const factoryAddress = "0x8BAE..."; // Sonic Testnet Factory
// Assuming 'signer' is connected wallet provider.getSigner()
const factoryContract = new ethers.Contract(factoryAddress, CradleFactoryAbi, signer);
// Prepare ALL params for CradleRaise constructor...
// const tx = await factoryContract.createRaise(...params);
// const receipt = await tx.wait();
// Find new raise address from logs...`}
            </code>
          </pre>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
