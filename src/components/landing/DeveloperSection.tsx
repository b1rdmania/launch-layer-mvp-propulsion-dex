
import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileCode, Book, Terminal } from "lucide-react";
import { Link } from "react-router-dom";

const DeveloperSection: React.FC = () => {
  return (
    <section className="py-24 md:py-32 bg-launchlayer-surface relative overflow-hidden">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-noise"></div>
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-launchlayer-violet/5 via-transparent to-launchlayer-accent/5"></div>
      {/* Mobile section indicator */}
      <div className="md:hidden absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-launchlayer-accent via-launchlayer-mint to-launchlayer-violet opacity-60"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1280px] relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block">
            <span className="text-sm font-medium text-launchlayer-violet bg-launchlayer-violet/10 px-3 py-1 rounded-full mb-4 inline-block">
              DEVELOPER RESOURCES
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-violet">
            For Developers
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-launchlayer-violet to-launchlayer-mint rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-launchlayer-text-secondary max-w-2xl mx-auto leading-relaxed">
            Launch Layer offers simple, easy-to-use smart contracts for token launches. 
            Explore our documentation, try the testnet, or view the source code.
          </p>
        </div>

        {/* Code Example */}
        <div className="mb-12">
          <div className="bg-[#0D1117] border border-launchlayer-surface-light rounded-2xl p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(167,139,250,0.15)] transition-all duration-300 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-launchlayer-text-secondary font-mono bg-launchlayer-surface px-2 py-1 rounded">
                JavaScript
              </span>
            </div>
            
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 flex flex-col text-launchlayer-text-secondary/40 pr-4 text-sm font-mono select-none min-w-[2rem]">
                {Array.from({ length: 11 }, (_, i) => (
                  <span key={i + 1} className="leading-6">{i + 1}</span>
                ))}
              </div>
              
              <pre className="pl-12 text-sm font-mono leading-6 overflow-x-auto">
                <code>
                  <span className="text-launchlayer-text-secondary">// Deploy a new token sale</span>{'\n'}
                  <span className="text-purple-400">const</span> <span className="text-blue-300">factory</span> <span className="text-white">=</span> <span className="text-purple-400">await</span> <span className="text-yellow-300">LaunchLayerFactory</span><span className="text-white">.</span><span className="text-blue-300">connect</span><span className="text-white">();</span>{'\n'}
                  <span className="text-purple-400">const</span> <span className="text-blue-300">saleParams</span> <span className="text-white">=</span> <span className="text-white">{'{'}</span>{'\n'}
                  <span className="text-white">  </span><span className="text-red-300">token</span><span className="text-white">:</span> <span className="text-green-300">"0x..."</span><span className="text-white">,</span>{'\n'}
                  <span className="text-white">  </span><span className="text-red-300">price</span><span className="text-white">:</span> <span className="text-blue-300">ethers</span><span className="text-white">.</span><span className="text-blue-300">utils</span><span className="text-white">.</span><span className="text-yellow-300">parseEther</span><span className="text-white">(</span><span className="text-green-300">"0.01"</span><span className="text-white">),</span>{'\n'}
                  <span className="text-white">  </span><span className="text-red-300">cap</span><span className="text-white">:</span> <span className="text-blue-300">ethers</span><span className="text-white">.</span><span className="text-blue-300">utils</span><span className="text-white">.</span><span className="text-yellow-300">parseEther</span><span className="text-white">(</span><span className="text-green-300">"100"</span><span className="text-white">),</span>{'\n'}
                  <span className="text-white">  </span><span className="text-red-300">vesting</span><span className="text-white">:</span> <span className="text-orange-300">30</span> <span className="text-white">*</span> <span className="text-orange-300">24</span> <span className="text-white">*</span> <span className="text-orange-300">60</span> <span className="text-white">*</span> <span className="text-orange-300">60</span> <span className="text-launchlayer-text-secondary">// 30 days</span>{'\n'}
                  <span className="text-white">{'};'}</span>{'\n'}
                  {'\n'}
                  <span className="text-purple-400">await</span> <span className="text-blue-300">factory</span><span className="text-white">.</span><span className="text-yellow-300">createSale</span><span className="text-white">(</span><span className="text-blue-300">saleParams</span><span className="text-white">);</span>
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <a
            href="https://github.com/b1rdmania/launchlayer"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Button 
              variant="outline" 
              className="h-12 md:h-14 px-6 md:px-8 bg-launchlayer-background/50 backdrop-blur-sm border-launchlayer-surface-light hover:bg-launchlayer-background hover:border-launchlayer-violet/50 transition-all duration-300 group-hover:shadow-[0_4px_20px_rgba(167,139,250,0.2)] group-hover:scale-[1.02]"
            >
              <Book className="w-5 h-5 mr-3 text-launchlayer-violet" />
              <span className="text-base font-medium">Documentation</span>
            </Button>
          </a>

          <Link to="/admin" className="group">
            <Button 
              variant="outline" 
              className="h-12 md:h-14 px-6 md:px-8 bg-launchlayer-background/50 backdrop-blur-sm border-launchlayer-surface-light hover:bg-launchlayer-background hover:border-launchlayer-accent/50 transition-all duration-300 group-hover:shadow-[0_4px_20px_rgba(50,119,245,0.2)] group-hover:scale-[1.02]"
            >
              <Terminal className="w-5 h-5 mr-3 text-launchlayer-accent" />
              <span className="text-base font-medium">Testnet Demo</span>
            </Button>
          </Link>

          <a
            href="https://github.com/b1rdmania/launchlayer"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <Button 
              variant="outline" 
              className="h-12 md:h-14 px-6 md:px-8 bg-launchlayer-background/50 backdrop-blur-sm border-launchlayer-surface-light hover:bg-launchlayer-background hover:border-launchlayer-mint/50 transition-all duration-300 group-hover:shadow-[0_4px_20px_rgba(99,206,198,0.2)] group-hover:scale-[1.02]"
            >
              <FileCode className="w-5 h-5 mr-3 text-launchlayer-mint" />
              <span className="text-base font-medium">GitHub Repo</span>
              <ExternalLink className="w-4 h-4 ml-2 opacity-60 group-hover:opacity-100 transition-opacity" />
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default DeveloperSection;
