
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileCode, Terminal } from "lucide-react";

const DeveloperSection: React.FC = () => {
  return (
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
              <Link to="/docs">
                <Button variant="accent" className="rounded-md flex items-center gap-2 shadow-button">
                  <FileCode size={18} /> View Docs
                </Button>
              </Link>
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
  );
};

export default DeveloperSection;
