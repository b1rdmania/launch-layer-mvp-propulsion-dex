
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
            <h2 className="text-3xl font-bold mb-4 tracking-wider text-gradient-violet">For Developers</h2>
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
                <Button variant="accent" className="rounded-md flex items-center gap-2 shadow-button px-5 py-3 text-sm">
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
                  className="border-launchlayer-surface-light hover:bg-launchlayer-surface-light rounded-md flex items-center gap-2 shadow-sm hover:shadow-[0_2px_15px_rgba(112,99,248,0.15)] transition-all hover:scale-[1.02] px-5 py-3 text-sm"
                >
                  Try Testnet <ExternalLink size={16} />
                </Button>
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-[#1E1E2A] p-6 rounded-xl border-l-2 border-launchlayer-violet shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_25px_rgba(112,99,248,0.2)] hover:translate-y-[-2px] transition-all duration-300">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-launchlayer-mint font-mono">Factory.js</span>
                <span className="text-xs text-launchlayer-text-secondary">JavaScript</span>
              </div>
              <pre className="text-sm font-mono text-launchlayer-text-secondary overflow-x-auto relative">
                <div className="absolute left-0 top-0 bottom-0 flex flex-col text-gray-500 pr-3 text-xs select-none opacity-40">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                  <span>7</span>
                  <span>8</span>
                </div>
                <code className="pl-6">
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
              <div className="text-xs text-launchlayer-text-secondary mt-2 text-right">Handles deployment logic</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
