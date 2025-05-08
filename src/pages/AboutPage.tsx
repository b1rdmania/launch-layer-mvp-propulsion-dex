
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileCode, Rocket, Terminal } from "lucide-react";

const AboutPage: React.FC = () => {
  return (
    <div className="bg-launchlayer-background">
      {/* Hero Section */}
      <section className="py-16 bg-launchlayer-surface">
        <div className="container mx-auto px-8 max-w-[1280px]">
          <h1 className="text-4xl font-bold mb-6 tracking-wider text-center">About Launch Layer</h1>
          <p className="text-launchlayer-text-secondary text-center mb-8 max-w-2xl mx-auto">
            The premier permissionless, tokenless launchpad for serious DeFi builders on Sonic Network.
          </p>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-launchlayer-background">
        <div className="container mx-auto px-8 max-w-[1280px]">
          <h2 className="text-3xl font-bold text-center mb-12 tracking-wider">
            Transparent On-Chain Process
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-launchlayer-surface p-6 rounded-lg border border-launchlayer-surface-light hover:border-launchlayer-accent/30 shadow-card transition-all duration-300 hover:translate-y-[-2px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-launchlayer-accent font-bold text-xl">01</span>
                <h3 className="text-xl font-bold">Configure</h3>
              </div>
              <p className="text-launchlayer-text-secondary">
                Set token details, precise sale parameters (fixed price, dates, caps, limits), fees, metadata, optional whitelist. Define vesting intent for Hedgey.
              </p>
            </div>
            
            <div className="bg-launchlayer-surface p-6 rounded-lg border border-launchlayer-surface-light hover:border-launchlayer-accent/30 shadow-card transition-all duration-300 hover:translate-y-[-2px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-launchlayer-accent font-bold text-xl">02</span>
                <h3 className="text-xl font-bold">Deploy via Factory</h3>
              </div>
              <p className="text-launchlayer-text-secondary">
                Launch your standardized Launch Layer Raise contract using the secure Launch Layer Factory. Pay standard gas; configurable fee applied on withdrawal.
              </p>
            </div>
            
            <div className="bg-launchlayer-surface p-6 rounded-lg border border-launchlayer-surface-light hover:border-launchlayer-accent/30 shadow-card transition-all duration-300 hover:translate-y-[-2px]">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-launchlayer-accent font-bold text-xl">03</span>
                <h3 className="text-xl font-bold">Finalize & Distribute</h3>
              </div>
              <p className="text-launchlayer-text-secondary">
                Monitor contributions on-chain. Finalize post-end, sweep funds, export data for vesting/claims via Hedgey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Developer Section */}
      <section className="py-16 bg-launchlayer-surface">
        <div className="container mx-auto px-8 max-w-[1280px]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4 tracking-wider">For Developers</h2>
              <p className="text-launchlayer-text-secondary mb-6">
                Launch Layer offers simple, easy-to-use smart contracts for token launches.
                Explore our documentation, try the testnet, or view the source code.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://github.com/b1rdmania/launchlayer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="accent" className="rounded-md flex items-center gap-2 shadow-button">
                    <FileCode size={18} /> View Source
                  </Button>
                </a>
                <a
                  href="https://github.com/b1rdmania/launchlayer"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="border-launchlayer-surface-light hover:bg-launchlayer-surface-light rounded-md flex items-center gap-2 shadow-sm hover:shadow-card transition-all hover:scale-[1.02]"
                  >
                    Try Testnet <ExternalLink size={16} />
                  </Button>
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-launchlayer-background p-6 rounded-xl border border-launchlayer-surface-light shadow-card card-hover">
                <pre className="text-sm font-mono text-launchlayer-text-secondary overflow-x-auto">
                  <code>
{`// Deploy a new token sale
const factory = await LaunchLayerFactory.connect();
const saleParams = {
  token: "0x...",
  price: ethers.utils.parseEther("0.01"),
  cap: ethers.utils.parseEther("100"),
  vesting: 30 * 24 * 60 * 60 // 30 days
};
await factory.createSale(saleParams);`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-launchlayer-background">
        <div className="container mx-auto px-8 max-w-[1280px] text-center">
          <h2 className="text-3xl font-bold mb-4 tracking-wider">Launch Your Way on Sonic</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-[0.95rem] leading-relaxed">
            UI-driven deployment via the Factory ensures consistency. Direct smart
            contract interaction offers flexibility. Built natively for Sonic.
          </p>
          <Link to="/admin">
            <Button
              variant="accent"
              size="lg"
              className="px-8 py-3 rounded-md text-lg flex items-center gap-2"
            >
              <Rocket size={20} />
              Start Your Raise
            </Button>
          </Link>
          <div className="mt-6 text-xs text-launchlayer-text-secondary">
            Built for Builders: Powered by Sonic
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
