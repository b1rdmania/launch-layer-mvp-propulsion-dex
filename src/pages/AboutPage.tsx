
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileCode, Rocket, Terminal, Sparkles, Clipboard, Timer, CheckCircle, FileText, Settings, Star } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
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
  
  // Premium features for the about page
  const premiumFeatures = [
    {
      title: "Zero Platform Token",
      description: "No proprietary token required. Launch on Sonic without unnecessary token dependencies.",
      icon: <Star size={24} className="text-launchlayer-violet" />
    },
    {
      title: "Permissionless Design",
      description: "Anyone can launch without approval processes or gatekeeping.",
      icon: <CheckCircle size={24} className="text-launchlayer-violet" />
    },
    {
      title: "Fixed Price Mechanics",
      description: "Simple, transparent pricing for participants with no complex bonding curves.",
      icon: <FileCode size={24} className="text-launchlayer-violet" />
    }
  ];

  // Testimonial data
  const testimonials = [
    {
      quote: "Launch Layer streamlined our token sale process from weeks to days. The platform's simplicity is its greatest strength.",
      author: "Alex Thompson",
      position: "CTO, Sonic Finance"
    },
    {
      quote: "We were able to focus on building our product instead of figuring out complex launch mechanics. Highly recommended!",
      author: "Sarah Chen",
      position: "Founder, DecentralEdge"
    }
  ];
  
  return (
    <div className="bg-launchlayer-background overflow-hidden">
      {/* Hero Section with enhanced visuals */}
      <section className="py-24 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Abstract shapes */}
          <div className="absolute top-1/4 -left-20 w-60 h-60 rounded-full bg-launchlayer-accent/5 blur-[80px] animate-first"></div>
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 rounded-full bg-launchlayer-violet/5 blur-[100px] animate-second"></div>
          
          {/* Code snippet */}
          <div className="absolute top-1/4 right-[10%] text-launchlayer-text-secondary/10 font-mono text-xs hidden lg:block">
            {`contract LaunchLayer {`}<br />
            {`  function launch() external {`}<br />
            {`    // No fluff, just launches`}<br />
            {`  }`}<br />
            {`}`}
          </div>
        </div>

        <div className="container mx-auto px-8 max-w-[1280px] relative z-10">
          <div className="animate-on-scroll slide-in">
            <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-launchlayer-violet/10 text-launchlayer-violet mb-4">About Us</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl font-bold tracking-wider text-center animate-on-scroll slide-in" style={{transitionDelay: "0.1s"}}>
            About <span className="text-gradient-violet">Launch Layer</span>
          </h1>
          <p className="text-launchlayer-text-primary text-lg md:text-xl text-center mb-10 max-w-2xl mx-auto animate-on-scroll slide-in" style={{transitionDelay: "0.2s"}}>
            The premier permissionless, tokenless launchpad for serious DeFi builders on Sonic Network.
          </p>
          
          {/* Animated separator */}
          <div className="relative max-w-[200px] mx-auto overflow-hidden h-[2px] animate-on-scroll slide-in" style={{transitionDelay: "0.3s"}}>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-launchlayer-violet to-transparent animate-pulse-violet"></div>
          </div>
          
          {/* Scroll down indicator */}
          <div className="mt-16 text-center animate-on-scroll slide-in" style={{transitionDelay: "0.4s"}}>
            <div className="inline-block animate-bounce">
              <svg className="w-6 h-6 text-launchlayer-text-secondary" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Section - NEW */}
      <section className="py-16 bg-launchlayer-background relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-launchlayer-accent/5 blur-[80px] animate-third"></div>
        </div>
        
        <div className="container mx-auto px-8 max-w-[1280px]">
          <div className="text-center mb-12 animate-on-scroll slide-in">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-launchlayer-accent/10 text-launchlayer-accent mb-2 inline-block">Core Principles</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wider text-gradient-violet">
              Built For Serious Builders
            </h2>
            <p className="text-launchlayer-text-secondary max-w-2xl mx-auto">
              Launch Layer was designed with the core principles that matter most to DeFi projects
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="animate-on-scroll slide-in" style={{transitionDelay: `${0.1 * (index + 1)}s`}}>
                <Card className="h-full border border-launchlayer-surface-light bg-gradient-to-b from-launchlayer-surface to-launchlayer-surface/80 backdrop-blur-sm hover:border-launchlayer-violet/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(167,139,250,0.1)]">
                  <CardContent className="p-6 h-full">
                    <div className="flex flex-col h-full">
                      <div className="mb-4 p-3 rounded-full bg-launchlayer-surface-light w-fit">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-launchlayer-text-primary">{feature.title}</h3>
                      <p className="text-launchlayer-text-secondary">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What a Raise Looks Like section - enhanced */}
      <section className="py-16 bg-launchlayer-background relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-launchlayer-violet/5 blur-[90px] animate-fourth"></div>
        </div>
        
        <div className="container mx-auto px-8 max-w-[1280px]">
          <div className="text-center mb-12 animate-on-scroll slide-in">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-launchlayer-violet/10 text-launchlayer-violet mb-2 inline-block">Example</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wider text-gradient-violet">
              What a Raise Looks Like
            </h2>
            <p className="text-launchlayer-text-secondary mb-10 max-w-2xl mx-auto">
              Simple, transparent, and efficient. Launch Layer provides all the tools you need 
              to create and manage your token raise with minimal friction.
            </p>
          </div>
          
          <div className="bg-launchlayer-surface border border-launchlayer-surface-light rounded-xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.2)] animate-on-scroll slide-in">
            <MiniRaiseExample />
          </div>
        </div>
      </section>

      {/* Testimonials Section - NEW */}
      <section className="py-16 bg-launchlayer-surface/50 relative">
        <div className="absolute inset-0 pointer-events-none noise-overlay">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-launchlayer-violet/5 blur-[100px] animate-fifth"></div>
        </div>
        
        <div className="container mx-auto px-8 max-w-[1280px]">
          <div className="text-center mb-14 animate-on-scroll slide-in">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-launchlayer-accent/10 text-launchlayer-accent mb-2 inline-block">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wider text-gradient-violet">
              From Our Community
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="animate-on-scroll slide-in" style={{transitionDelay: `${0.1 * (index + 1)}s`}}>
                <Card className="h-full border border-launchlayer-surface-light bg-gradient-to-b from-launchlayer-surface to-launchlayer-surface/80 backdrop-blur-sm hover:border-launchlayer-violet/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_-5px_rgba(167,139,250,0.1)]">
                  <CardContent className="p-6 h-full">
                    <div className="flex flex-col h-full">
                      <div className="mb-6">
                        {/* Quote SVG */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-launchlayer-violet/40">
                          <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path>
                          <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path>
                        </svg>
                      </div>
                      <p className="text-launchlayer-text-secondary text-lg mb-6 italic">{testimonial.quote}</p>
                      <div className="mt-auto">
                        <p className="font-bold text-launchlayer-text-primary">{testimonial.author}</p>
                        <p className="text-launchlayer-text-secondary text-sm">{testimonial.position}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Launch Your Token in 5 Easy Steps section - enhanced styling */}
      <section className="py-16 bg-launchlayer-background">
        <div className="container mx-auto px-8 max-w-[1280px]">
          <div className="text-center mb-12 animate-on-scroll slide-in">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-launchlayer-accent/10 text-launchlayer-accent mb-2 inline-block">Process</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wider text-gradient-violet">
              Launch Your Token in 5 Easy Steps
            </h2>
            <p className="text-launchlayer-text-secondary max-w-2xl mx-auto">
              Launch Layer streamlines the entire token launch process
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-5 bg-gradient-to-r from-launchlayer-surface to-launchlayer-surface p-5 rounded-xl border border-launchlayer-surface-light hover:border-launchlayer-violet/50 transition-all hover:translate-y-[-2px] hover:shadow-[0_8px_20px_rgba(50,119,245,0.12)] animate-on-scroll slide-in group"
                style={{transitionDelay: `${0.1 * (index + 1)}s`}}
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-launchlayer-accent to-launchlayer-violet text-white font-bold mr-5 shadow-[0_2px_10px_rgba(112,99,248,0.25)] group-hover:shadow-[0_2px_15px_rgba(112,99,248,0.4)] transition-all duration-300">
                    {index + 1}
                  </div>
                  <span className="text-[1rem] font-medium">{step.text}</span>
                </div>
                {step.icon}
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Enhanced Process Section */}
      <section className="py-16 bg-launchlayer-surface/50 relative">
        <div className="absolute inset-0 pointer-events-none noise-overlay"></div>
        
        <div className="container mx-auto px-8 max-w-[1280px] relative z-10">
          <div className="text-center mb-12 animate-on-scroll slide-in">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-launchlayer-violet/10 text-launchlayer-violet mb-2 inline-block">Workflow</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wider text-gradient-violet">
              Transparent On-Chain Process
            </h2>
            <p className="text-launchlayer-text-secondary max-w-2xl mx-auto">
              Our streamlined process ensures maximum efficiency and transparency
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {/* Process Step 1 */}
            <div className="animate-on-scroll slide-in" style={{transitionDelay: "0.1s"}}>
              <div className="p-8 bg-launchlayer-surface border border-launchlayer-surface-light rounded-xl shadow-card hover:translate-y-[-4px] hover:shadow-[0_4px_20px_rgba(112,99,248,0.2)] transition-all duration-300 group relative overflow-hidden h-full">
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-launchlayer-violet/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="flex items-center mb-4 relative z-10">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-launchlayer-accent to-launchlayer-violet text-white font-bold mr-4 shadow-[0_2px_10px_rgba(112,99,248,0.25)] group-hover:shadow-[0_2px_15px_rgba(112,99,248,0.4)] transition-all duration-300">
                    01
                  </div>
                  <h3 className="text-xl font-bold tracking-wider">Configure</h3>
                </div>
                <p className="text-launchlayer-text-secondary text-[0.95rem] leading-[1.6]">Set token details, precise sale parameters (fixed price, dates, caps, limits), fees, metadata, optional whitelist. Define vesting intent for Hedgey.</p>
              </div>
            </div>
            
            {/* Process Step 2 */}
            <div className="animate-on-scroll slide-in" style={{transitionDelay: "0.2s"}}>
              <div className="p-8 bg-launchlayer-surface border border-launchlayer-surface-light rounded-xl shadow-card hover:translate-y-[-4px] hover:shadow-[0_4px_20px_rgba(112,99,248,0.2)] transition-all duration-300 group relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-launchlayer-violet/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="flex items-center mb-4 relative z-10">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-launchlayer-accent to-launchlayer-violet text-white font-bold mr-4 shadow-[0_2px_10px_rgba(112,99,248,0.25)] group-hover:shadow-[0_2px_15px_rgba(112,99,248,0.4)] transition-all duration-300">
                    02
                  </div>
                  <h3 className="text-xl font-bold tracking-wider">Deploy via Factory</h3>
                </div>
                <p className="text-launchlayer-text-secondary text-[0.95rem] leading-[1.6]">Launch your standardized Launch Layer Raise contract using the secure Launch Layer Factory. Pay standard gas; configurable fee applied on withdrawal.</p>
              </div>
            </div>
            
            {/* Process Step 3 */}
            <div className="animate-on-scroll slide-in" style={{transitionDelay: "0.3s"}}>
              <div className="p-8 bg-launchlayer-surface border border-launchlayer-surface-light rounded-xl shadow-card hover:translate-y-[-4px] hover:shadow-[0_4px_20px_rgba(112,99,248,0.2)] transition-all duration-300 group relative overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-launchlayer-violet/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="flex items-center mb-4 relative z-10">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-launchlayer-accent to-launchlayer-violet text-white font-bold mr-4 shadow-[0_2px_10px_rgba(112,99,248,0.25)] group-hover:shadow-[0_2px_15px_rgba(112,99,248,0.4)] transition-all duration-300">
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

      {/* Developer Section with Enhanced Styling */}
      <section className="py-16 bg-launchlayer-background">
        <div className="container mx-auto px-8 max-w-[1280px]">
          <div className="text-center mb-12 animate-on-scroll slide-in">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-launchlayer-violet/10 text-launchlayer-violet mb-2 inline-block">Resources</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wider text-gradient-violet">
              For Developers
            </h2>
            <p className="text-center text-launchlayer-text-secondary max-w-2xl mx-auto">
              Launch Layer offers simple, easy-to-use smart contracts for token launches. 
              Explore our documentation, try the testnet, or view the source code.
            </p>
          </div>
          
          {/* Enhanced Code Block */}
          <div className="max-w-3xl mx-auto mb-12 animate-on-scroll slide-in">
            <div className="bg-[#1E1E2A] rounded-lg border border-launchlayer-surface-light p-4 shadow-[0_8px_30px_rgba(0,0,0,0.12)] relative overflow-hidden group">
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
              
              {/* Animated glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-launchlayer-violet/5 to-launchlayer-accent/5 opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"></div>
            </div>
          </div>
          
          {/* Developer links - NEW */}
          <div className="flex flex-wrap justify-center gap-4 mb-8 animate-on-scroll slide-in">
            <a 
              href="#" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-launchlayer-surface border border-launchlayer-surface-light hover:border-launchlayer-accent/50 transition-all hover:translate-y-[-2px] hover:shadow-[0_4px_12px_rgba(50,119,245,0.15)]"
            >
              <FileCode size={16} className="text-launchlayer-accent" />
              <span className="text-sm">Documentation</span>
            </a>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-launchlayer-surface border border-launchlayer-surface-light hover:border-launchlayer-violet/50 transition-all hover:translate-y-[-2px] hover:shadow-[0_4px_12px_rgba(167,139,250,0.15)]"
            >
              <Terminal size={16} className="text-launchlayer-violet" />
              <span className="text-sm">Testnet Demo</span>
            </a>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-launchlayer-surface border border-launchlayer-surface-light hover:border-launchlayer-mint/50 transition-all hover:translate-y-[-2px] hover:shadow-[0_4px_12px_rgba(99,206,198,0.15)]"
            >
              <ExternalLink size={16} className="text-launchlayer-mint" />
              <span className="text-sm">GitHub Repo</span>
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section with Enhanced Styling */}
      <section className="py-20 bg-gradient-to-b from-launchlayer-surface/90 to-launchlayer-background relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          <div className="absolute w-[500px] h-[500px] rounded-full bg-launchlayer-accent/5 blur-[120px] -bottom-64 -right-64"></div>
          <div className="absolute w-[400px] h-[400px] rounded-full bg-launchlayer-violet/5 blur-[100px] -top-32 -left-32"></div>
          
          {/* Code-like background elements */}
          <div className="absolute top-10 left-10 text-launchlayer-text-secondary/5 font-mono text-xs hidden lg:block">
            {`function launch() {`}<br />
            {`  return success;`}<br />
            {`}`}
          </div>
          <div className="absolute bottom-10 right-10 text-launchlayer-text-secondary/5 font-mono text-xs hidden lg:block">
            {`// Built for Sonic`}
          </div>
          
          {/* Animated shapes */}
          <div className="absolute top-1/4 right-1/4 w-8 h-8 rounded-full border border-launchlayer-violet/20"></div>
          <div className="absolute bottom-1/3 left-1/3 w-16 h-16 rounded-full border border-launchlayer-accent/20"></div>
        </div>
        
        <div className="container mx-auto px-8 max-w-[1280px] text-center relative z-10">
          <div className="animate-on-scroll slide-in">
            <span className="px-3 py-1 text-xs font-medium rounded-full bg-launchlayer-accent/10 text-launchlayer-accent mb-2 inline-block">Get Started</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-wider text-gradient-violet animate-on-scroll slide-in" style={{transitionDelay: "0.1s"}}>
            Launch Your Way on Sonic
          </h2>
          
          <p className="text-xl mb-10 max-w-2xl mx-auto text-[0.95rem] leading-relaxed animate-on-scroll slide-in" style={{transitionDelay: "0.2s"}}>
            UI-driven deployment via the Factory ensures consistency. Direct smart
            contract interaction offers flexibility. Built natively for Sonic.
          </p>
          
          <div className="flex justify-center animate-on-scroll slide-in" style={{transitionDelay: "0.3s"}}>
            <Link to="/admin">
              <Button
                variant="accent"
                size="lg"
                className="px-8 py-6 rounded-md text-lg flex items-center gap-3 bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet hover:shadow-[0_0_25px_rgba(112,99,248,0.4)] hover:scale-105 transition-all duration-300"
              >
                <Rocket size={24} />
                Start Your Raise
              </Button>
            </Link>
          </div>
          
          <div className="mt-8 text-xs text-launchlayer-text-secondary animate-on-scroll slide-in" style={{transitionDelay: "0.4s"}}>
            Built for Builders: Powered by Sonic Network
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
