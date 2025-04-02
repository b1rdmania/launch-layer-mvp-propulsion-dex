
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check, Code, Fingerprint, LineChart, Lock, Settings, Shield, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DESIGN_SYSTEM } from '@/contracts/config';

const LandingPage: React.FC = () => {
  return (
    <div className="bg-cradle-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-8 max-w-[1280px]">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cradle-accent to-blue-400 bg-clip-text text-transparent">
                Launch tokens on Sonic.
                <br />No friction. No hype.
              </h1>
              <p className="text-xl text-cradle-text-secondary mb-8">
                Cradle is a permissionless, tokenless launchpad for serious builders. Transparent raises deployed via factory contracts, seamless integration with Hedgey for vesting, and no platform token required.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/admin">
                  <Button className="bg-cradle-accent hover:bg-cradle-accent/90 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                    Deploy Raise <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link to="/">
                  <Button variant="outline" className="border-cradle-surface-light hover:bg-cradle-surface-light px-6 py-2 rounded-lg">
                    View Launches
                  </Button>
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="bg-gradient-to-br from-cradle-accent/20 to-purple-600/20 p-1 rounded-2xl">
                <div className="bg-cradle-surface p-8 rounded-xl flex items-center justify-center">
                  <LineChart size={240} className="text-cradle-accent/70" strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
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

      {/* Launch Flow Section */}
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

      {/* How It Works Section */}
      <section className="py-16 bg-cradle-surface">
        <div className="container mx-auto px-8 max-w-[1280px]">
          <h2 className="text-3xl font-bold text-center mb-12">Transparent On-Chain Process</h2>
          
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

      {/* Developer Tools Section */}
      <section className="py-16">
        <div className="container mx-auto px-8 max-w-[1280px]">
          <h2 className="text-3xl font-bold mb-8">Integrate & Build with Cradle V1</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-cradle-surface rounded-xl p-8">
              <ul className="space-y-4">
                <ToolItem text="Immutable CradleRaise Contracts (Deployed via Factory)" />
                <ToolItem text="Standardized & Audited V1 Contract Logic (Post-Audit)" />
                <ToolItem text="Public GitHub Repository & Documentation Access" />
                <ToolItem text="Direct Smart Contract Interaction (ABIs & Addresses provided)" />
                <ToolItem text="(Coming Soon): Raise-as-a-Service SDK" />
              </ul>
            </div>
            
            <div className="bg-cradle-surface rounded-xl p-8">
              <h3 className="text-xl font-bold mb-4">Start Building Today</h3>
              <p className="mb-4 text-cradle-text-secondary">
                Cradle's contracts are designed for developers. Interact directly with our factory contract or use our simplified UI.
              </p>
              <Link to="/admin">
                <Button className="bg-cradle-accent hover:bg-cradle-accent/90 text-white px-6 py-2 rounded-lg">
                  Deploy Your First Raise
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Project Launches Section */}
      <section className="py-16 bg-cradle-surface">
        <div className="container mx-auto px-8 max-w-[1280px]">
          <h2 className="text-3xl font-bold mb-4">Explore Launches on Cradle</h2>
          <p className="text-cradle-text-secondary mb-8">
            Discover upcoming and past fixed-price token launches powered by Cradle on Sonic.
          </p>
          
          <div className="text-center mb-8">
            <Link to="/">
              <Button className="bg-cradle-accent hover:bg-cradle-accent/90 text-white px-6 py-2 rounded-lg">
                Browse All Launches
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Developer Resources Section */}
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
            <h3 className="text-lg font-bold font-mono mb-2">Quick Start Example (Ethers.js - Factory Interaction)</h3>
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

      {/* Built for Builders Section */}
      <section className="py-16 bg-gradient-to-br from-cradle-accent/20 to-purple-600/20">
        <div className="container mx-auto px-8 max-w-[1280px] text-center">
          <h2 className="text-3xl font-bold mb-4">Launch Your Way on Sonic</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            UI-driven deployment via the Factory ensures consistency. Direct smart contract interaction offers flexibility. Built natively for Sonic.
          </p>
          <Link to="/admin">
            <Button size="lg" className="bg-cradle-accent hover:bg-cradle-accent/90 text-white px-8 py-3 rounded-lg text-lg">
              Start Your Raise
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

// Helper Components
const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => {
  return (
    <Card className="bg-cradle-surface-light border-cradle-surface hover:scale-[1.02] transition-transform duration-200">
      <CardContent className="p-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-cradle-text-secondary">{description}</p>
      </CardContent>
    </Card>
  );
};

const StepCard: React.FC<{ number: string; title: string; description: string }> = ({ number, title, description }) => {
  return (
    <Card className="bg-cradle-surface border-cradle-surface-light hover:border-cradle-accent/50 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cradle-accent text-white font-bold mb-4">
          {number}
        </div>
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-cradle-text-secondary text-sm">{description}</p>
      </CardContent>
    </Card>
  );
};

const DetailCard: React.FC<{ number: string; title: string; description: string }> = ({ number, title, description }) => {
  return (
    <div className="p-6 bg-cradle-surface-light rounded-xl">
      <div className="flex items-center mb-3">
        <span className="text-cradle-accent font-mono font-bold mr-2">{number}</span>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-cradle-text-secondary">{description}</p>
    </div>
  );
};

const ToolItem: React.FC<{ text: string }> = ({ text }) => {
  return (
    <li className="flex items-start">
      <Check size={20} className="text-cradle-accent mr-2 mt-1 flex-shrink-0" />
      <span>{text}</span>
    </li>
  );
};

const ResourceCard: React.FC<{ title: string; description: string; linkText: string; linkUrl: string }> = ({ title, description, linkText, linkUrl }) => {
  return (
    <Card className="bg-cradle-surface border-cradle-surface-light">
      <CardContent className="p-6">
        <h3 className="text-lg font-bold mb-2">{title}</h3>
        <p className="text-cradle-text-secondary mb-4">{description}</p>
        <a href={linkUrl} className="text-cradle-accent hover:text-cradle-accent/80 font-medium flex items-center gap-1">
          {linkText} <ArrowRight size={16} />
        </a>
      </CardContent>
    </Card>
  );
};

export default LandingPage;
