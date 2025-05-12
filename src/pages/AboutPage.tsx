import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileCode, Rocket, Terminal, Sparkles, Clipboard, Timer, CheckCircle, FileText, Settings, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ProcessSection from "@/components/landing/ProcessSection";
import DeveloperSection from "@/components/landing/DeveloperSection";
import MiniRaiseExample from "@/components/landing/MiniRaiseExample";

const AboutPage: React.FC = () => {
  // Function to handle scroll animations
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll");
      
      elements.forEach(element => {
        const position = element.getBoundingClientRect();
        
        // If the element is in the viewport
        if (position.top < window.innerHeight - 100) {
          element.classList.add("in-view");
        }
      });
    };
    
    // Initial check
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener("scroll", animateOnScroll);
    
    return () => {
      window.removeEventListener("scroll", animateOnScroll);
    };
  }, []);
  
  // Define steps for the launch process section
  const steps = [
    { 
      text: "Configure your token sale parameters", 
      icon: <Settings size={18} className="text-launchlayer-mint" /> 
    },
    { 
      text: "Deploy your contract on Sonic", 
      icon: <Clipboard size={18} className="text-launchlayer-mint" /> 
    },
    { 
      text: "Community contributes during sale phases", 
      icon: <Timer size={18} className="text-launchlayer-mint" /> 
    },
    { 
      text: "Finalize and collect your funds", 
      icon: <CheckCircle size={18} className="text-launchlayer-mint" /> 
    },
    { 
      text: "Export data for vesting setup", 
      icon: <FileText size={18} className="text-launchlayer-mint" /> 
    },
  ];
  
  return (
    <div className="bg-launchlayer-background overflow-hidden">
      {/* Hero Section with enhanced visuals */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#0D1117] to-[#0A0D12]">
        {/* Background elements */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-launchlayer-violet/5 blur-[100px] top-0 left-1/2 -translate-x-1/2"></div>
          <div className="absolute w-[300px] h-[300px] rounded-full bg-launchlayer-accent/5 blur-[80px] bottom-0 left-1/4"></div>
          <div className="absolute top-1/4 right-[10%] text-launchlayer-text-secondary/10 font-mono text-xs hidden lg:block">
            {`contract LaunchLayer {`}<br />
            {`  function launch() external {`}<br />
            {`    // No fluff, just launches`}<br />
            {`  }`}<br />
            {`}`}
          </div>
        </div>

        <div className="container mx-auto px-8 max-w-[1280px] relative z-10">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-wider text-center animate-fade-in">
            About Launch Layer
          </h1>
          <p className="text-launchlayer-text-primary text-lg text-center mb-8 max-w-2xl mx-auto animate-fade-in" style={{animationDelay: "0.2s"}}>
            The premier permissionless, tokenless launchpad for serious DeFi builders on Sonic Network.
          </p>
          
          {/* Animated separator */}
          <div className="relative max-w-[200px] mx-auto overflow-hidden h-[2px]">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-launchlayer-violet to-transparent animate-pulse-violet"></div>
          </div>
          
          {/* Scroll down indicator */}
          <div className="mt-16 text-center">
            <div className="inline-block animate-bounce">
              <svg className="w-6 h-6 text-launchlayer-text-secondary" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* What a Raise Looks Like section - moved from landing page (without animation) */}
      <section className="py-16 bg-launchlayer-background">
        <div className="container mx-auto px-8 max-w-[1280px]">
          <h2 className="text-3xl font-bold mb-4 text-center tracking-wider animate-on-scroll slide-in">What a Raise Looks Like</h2>
          <p className="text-launchlayer-text-secondary mb-10 text-center max-w-2xl mx-auto animate-on-scroll slide-in">
            Simple, transparent, and efficient. Launch Layer provides all the tools you need 
            to create and manage your token raise with minimal friction.
          </p>
          <div className="animate-on-scroll slide-in">
            <MiniRaiseExample />
          </div>
        </div>
      </section>

      {/* Launch Your Token in 5 Easy Steps section (moved from landing page) */}
      <section className="py-16 bg-launchlayer-background">
        <div className="container mx-auto px-8 max-w-[1280px]">
          <h2 className="text-3xl font-bold text-center mb-4 tracking-wider text-gradient-violet animate-on-scroll slide-in">
            Launch Your Token in 5 Easy Steps
          </h2>
          <p className="text-launchlayer-text-secondary text-center mb-12 max-w-2xl mx-auto text-[0.95rem] leading-relaxed animate-on-scroll slide-in" style={{transitionDelay: "0.1s"}}>
            Launch Layer streamlines the entire token launch process
          </p>

          <div className="max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-4 bg-launchlayer-surface p-4 rounded-md border border-launchlayer-surface-light hover:border-launchlayer-accent/50 transition-all hover:translate-y-[-2px] hover:shadow-[0_2px_10px_rgba(50,119,245,0.12)] animate-on-scroll slide-in"
                style={{transitionDelay: `${0.1 * (index + 1)}s`}}
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-launchlayer-accent to-launchlayer-violet text-white font-bold mr-4 shadow-[0_2px_10px_rgba(112,99,248,0.25)] group-hover:shadow-[0_2px_15px_rgba(112,99,248,0.4)] transition-all duration-300">
                    {index + 1}
                  </div>
                  <span className="text-[0.95rem]">{step.text}</span>
                </div>
                {step.icon}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Enhanced Process Section */}
      <section className="py-16 bg-launchlayer-background">
        <div className="container mx-auto px-8 max-w-[1280px]">
          <h2 className="text-3xl font-bold text-center mb-3 tracking-wider text-gradient-violet animate-on-scroll slide-in">
            Transparent On-Chain Process
          </h2>
          
          <div className="relative max-w-[100px] mx-auto mb-12 overflow-hidden">
            <Separator className="bg-launchlayer-violet opacity-40" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-launchlayer-violet to-transparent animate-shimmer"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Process Step 1 */}
            <div className="animate-on-scroll slide-in" style={{transitionDelay: "0.1s"}}>
              <div className="p-6 bg-launchlayer-surface border border-launchlayer-surface-light rounded-xl shadow-card hover:translate-y-[-4px] hover:shadow-[0_4px_20px_rgba(112,99,248,0.2)] transition-all duration-300 group relative overflow-hidden">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-launchlayer-violet/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="flex items-center mb-3 relative z-10">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-launchlayer-accent to-launchlayer-violet text-white font-bold mr-3 shadow-[0_2px_10px_rgba(112,99,248,0.25)] group-hover:shadow-[0_2px_15px_rgba(112,99,248,0.4)] transition-all duration-300">
                    01
                  </div>
                  <h3 className="text-xl font-bold tracking-wider">Configure</h3>
                </div>
                <p className="text-launchlayer-text-secondary text-[0.95rem] leading-[1.6]">Set token details, precise sale parameters (fixed price, dates, caps, limits), fees, metadata, optional whitelist. Define vesting intent for Hedgey.</p>
              </div>
            </div>
            
            {/* Process Step 2 */}
            <div className="animate-on-scroll slide-in" style={{transitionDelay: "0.2s"}}>
              <div className="p-6 bg-launchlayer-surface border border-launchlayer-surface-light rounded-xl shadow-card hover:translate-y-[-4px] hover:shadow-[0_4px_20px_rgba(112,99,248,0.2)] transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-launchlayer-violet/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="flex items-center mb-3 relative z-10">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-launchlayer-accent to-launchlayer-violet text-white font-bold mr-3 shadow-[0_2px_10px_rgba(112,99,248,0.25)] group-hover:shadow-[0_2px_15px_rgba(112,99,248,0.4)] transition-all duration-300">
                    02
                  </div>
                  <h3 className="text-xl font-bold tracking-wider">Deploy via Factory</h3>
                </div>
                <p className="text-launchlayer-text-secondary text-[0.95rem] leading-[1.6]">Launch your standardized Launch Layer Raise contract using the secure Launch Layer Factory. Pay standard gas; configurable fee applied on withdrawal.</p>
              </div>
            </div>
            
            {/* Process Step 3 */}
            <div className="animate-on-scroll slide-in" style={{transitionDelay: "0.3s"}}>
              <div className="p-6 bg-launchlayer-surface border border-launchlayer-surface-light rounded-xl shadow-card hover:translate-y-[-4px] hover:shadow-[0_4px_20px_rgba(112,99,248,0.2)] transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-launchlayer-violet/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="flex items-center mb-3 relative z-10">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-launchlayer-accent to-launchlayer-violet text-white font-bold mr-3 shadow-[0_2px_10px_rgba(112,99,248,0.25)] group-hover:shadow-[0_2px_15px_rgba(112,99,248,0.4)] transition-all duration-300">
                    03
                  </div>
                  <h3 className="text-xl font-bold tracking-wider">Finalize & Distribute</h3>
                </div>
                <p className="text-launchlayer-text-secondary text-[0.95rem] leading-[1.6]">Monitor contributions on-chain. Finalize post-end, sweep funds, export data for vesting/claims via Hedgey.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Separator */}
      <div className="container mx-auto px-8 max-w-[1280px]">
        <Separator className="my-2 bg-launchlayer-surface-light opacity-40" />
      </div>

      {/* Developer Section with Enhanced Styling */}
      <section className="py-16 bg-launchlayer-background">
        <div className="container mx-auto px-8 max-w-[1280px]">
          <h2 className="text-3xl font-bold text-center mb-3 tracking-wider text-gradient-violet animate-on-scroll slide-in">
            For Developers
          </h2>
          
          <p className="text-center text-launchlayer-text-secondary mb-8 max-w-2xl mx-auto animate-on-scroll slide-in">
            Launch Layer offers simple, easy-to-use smart contracts for token launches. 
            Explore our documentation, try the testnet, or view the source code.
          </p>
          
          {/* Enhanced Code Block */}
          <div className="max-w-3xl mx-auto mb-10 animate-on-scroll slide-in">
            <div className="bg-[#1E1E2A] rounded-lg border border-launchlayer-surface-light p-4 shadow-[0_2px_15px_rgba(50,50,93,0.1)] relative overflow-hidden group">
              {/* Line numbers */}
              <div className="absolute left-0 top-0 bottom-0 w-10 flex flex-col items-end px-2 py-4 text-launchlayer-text-secondary/40 font-mono text-xs border-r border-launchlayer-surface-light">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
              </div>
              
              {/* Code content */}
              <pre className="font-mono text-sm pl-10 text-launchlayer-text-secondary overflow-x-auto">
                <code>
                  <span className="text-blue-400">// Deploy a new token sale</span><br/>
                  <span className="text-purple-400">const</span> <span className="text-green-400">factory</span> = <span className="text-blue-400">await</span> <span className="text-yellow-400">LaunchLayerFactory</span>.<span className="text-green-400">connect</span>();<br/>
                  <span className="text-purple-400">const</span> <span className="text-green-400">saleParams</span> = {'{'}<br/>
                  {'  '}<span className="text-blue-300">token</span>: <span className="text-orange-400">"0x..."</span>,<br/>
                  {'  '}<span className="text-blue-300">price</span>: <span className="text-yellow-400">ethers</span>.<span className="text-green-400">utils</span>.<span className="text-green-400">parseEther</span>(<span className="text-orange-400">"0.01"</span>),<br/>
                  {'  '}<span className="text-blue-300">cap</span>: <span className="text-yellow-400">ethers</span>.<span className="text-green-400">utils</span>.<span className="text-green-400">parseEther</span>(<span className="text-orange-400">"100"</span>),<br/>
                  {'  '}<span className="text-blue-300">vesting</span>: <span className="text-purple-400">30 * 24 * 60 * 60</span> <span className="text-blue-400">// 30 days</span><br/>
                  {'}'};<br/>
                  <span className="text-blue-400">await</span> <span className="text-green-400">factory</span>.<span className="text-green-400">createSale</span>(<span className="text-green-400">saleParams</span>);
                </code>
              </pre>
              
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-launchlayer-violet/5 to-launchlayer-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section with Enhanced Styling */}
      <section className="py-16 bg-launchlayer-surface relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute w-[400px] h-[400px] rounded-full bg-launchlayer-accent/5 blur-[100px] bottom-0 right-0"></div>
          <div className="absolute w-[300px] h-[300px] rounded-full bg-launchlayer-violet/5 blur-[80px] top-0 left-0"></div>
          
          {/* Code-like background elements */}
          <div className="absolute top-10 left-10 text-launchlayer-text-secondary/5 font-mono text-xs hidden lg:block">
            {`function launch() {`}<br />
            {`  return success;`}<br />
            {`}`}
          </div>
          <div className="absolute bottom-10 right-10 text-launchlayer-text-secondary/5 font-mono text-xs hidden lg:block">
            {`// Built for Sonic`}
          </div>
        </div>
        
        <div className="container mx-auto px-8 max-w-[1280px] text-center relative z-10">
          <h2 className="text-3xl font-bold mb-4 tracking-wider text-gradient-violet animate-on-scroll slide-in">Launch Your Way on Sonic</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-[0.95rem] leading-relaxed animate-on-scroll slide-in" style={{transitionDelay: "0.1s"}}>
            UI-driven deployment via the Factory ensures consistency. Direct smart
            contract interaction offers flexibility. Built natively for Sonic.
          </p>
          <div className="flex justify-center animate-on-scroll slide-in" style={{transitionDelay: "0.2s"}}>
            <Link to="/admin">
              <Button
                variant="accent"
                size="lg"
                className="px-8 py-3 rounded-md text-lg flex items-center gap-2 bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet hover:shadow-[0_0_15px_rgba(112,99,248,0.5)] hover:scale-105 transition-all duration-300"
              >
                <Rocket size={20} />
                Start Your Raise
              </Button>
            </Link>
          </div>
          <div className="mt-6 text-xs text-launchlayer-text-secondary animate-on-scroll slide-in" style={{transitionDelay: "0.3s"}}>
            Built for Builders: Powered by Sonic
          </div>
        </div>
      </section>
      
      {/* Trusted by builders across the Sonic ecosystem */}
      <section className="py-16 bg-launchlayer-background border-y border-launchlayer-surface-light">
        <div className="container mx-auto px-8 max-w-[1280px]">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-1 mb-4">
              <Star className="text-yellow-500 fill-yellow-500" size={16} />
              <Star className="text-yellow-500 fill-yellow-500" size={16} />
              <Star className="text-yellow-500 fill-yellow-500" size={16} />
              <Star className="text-yellow-500 fill-yellow-500" size={16} />
              <Star className="text-yellow-500 fill-yellow-500" size={16} />
            </div>
            <p className="text-lg md:text-xl font-medium text-center text-launchlayer-text-primary mb-6">
              Trusted by builders across the Sonic ecosystem
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
              <div className="flex flex-col items-center">
                <div className="bg-launchlayer-surface-light h-12 w-12 rounded-full flex items-center justify-center mb-2">
                  <span className="font-bold text-launchlayer-accent">SF</span>
                </div>
                <p className="text-xs text-launchlayer-text-secondary">Sonic Foundation</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-launchlayer-surface-light h-12 w-12 rounded-full flex items-center justify-center mb-2">
                  <span className="font-bold text-launchlayer-accent">DH</span>
                </div>
                <p className="text-xs text-launchlayer-text-secondary">DoraHacks</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-launchlayer-surface-light h-12 w-12 rounded-full flex items-center justify-center mb-2">
                  <span className="font-bold text-launchlayer-accent">LP</span>
                </div>
                <p className="text-xs text-launchlayer-text-secondary">LiquidPool</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="bg-launchlayer-surface-light h-12 w-12 rounded-full flex items-center justify-center mb-2">
                  <span className="font-bold text-launchlayer-accent">SL</span>
                </div>
                <p className="text-xs text-launchlayer-text-secondary">SonicLabs</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
