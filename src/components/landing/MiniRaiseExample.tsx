
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Image, ArrowUp, Package, Rocket } from "lucide-react";

const MiniRaiseExample: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {/* First Example */}
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col">
          <div className="relative">
            <Card className="border border-launchlayer-surface-light bg-launchlayer-surface shadow-card hover:shadow-lg transition-all animate-float card-hover">
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-launchlayer-accent to-launchlayer-violet w-10 h-10 rounded-full flex items-center justify-center">
                      <Rocket size={20} className="text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">SonicToken</CardTitle>
                      <p className="text-xs text-launchlayer-text-secondary">$STK</p>
                    </div>
                  </div>
                  <div className="bg-green-500/20 text-green-500 text-xs font-semibold px-2 py-1 rounded-full">
                    Active
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-launchlayer-text-secondary">Raised</p>
                      <p className="font-medium">750,000 SONIC</p>
                    </div>
                    <div>
                      <p className="text-launchlayer-text-secondary">Goal</p>
                      <p className="font-medium">1,000,000 SONIC</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button className="w-full bg-launchlayer-accent hover:bg-launchlayer-accent/90 hover:brightness-110 hover:scale-[1.02] text-white py-2 rounded-md font-medium transition-all shadow-button">
                      View Raise
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center py-4">
            <ArrowUp className="text-launchlayer-violet animate-pulse-violet" size={24} />
          </div>
          
          <div className="bg-launchlayer-surface p-4 rounded-lg border border-launchlayer-surface-light card-hover shadow-card">
            <h4 className="font-mono text-sm mb-2 text-launchlayer-violet">SonicToken.raise</h4>
            <p className="text-xs text-launchlayer-text-secondary mb-2">
              Simple, transparent, on-chain token launches
            </p>
            <div className="bg-launchlayer-background p-2 rounded font-mono text-xs">
              <code>
                <span className="text-purple-500">factory</span>.
                <span className="text-blue-400">createRaise</span>(
                <span className="text-green-400">token</span>, 
                <span className="text-amber-400">1000000</span>, 
                <span className="text-red-400">settings</span>);
              </code>
            </div>
          </div>
        </div>
      </div>
      
      {/* Second Example */}
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col">
          <div className="relative">
            <Card className="border border-launchlayer-surface-light bg-launchlayer-surface shadow-card hover:shadow-lg transition-all animate-float card-hover">
              <CardHeader className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-green-400 to-blue-500 w-10 h-10 rounded-full flex items-center justify-center">
                      <Package size={20} className="text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">NexusDAO</CardTitle>
                      <p className="text-xs text-launchlayer-text-secondary">$NXS</p>
                    </div>
                  </div>
                  <div className="bg-amber-500/20 text-amber-500 text-xs font-semibold px-2 py-1 rounded-full">
                    Upcoming
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Starts in</span>
                      <span>2 days</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-launchlayer-text-secondary">Target Raise</p>
                      <p className="font-medium">500,000 SONIC</p>
                    </div>
                    <div>
                      <p className="text-launchlayer-text-secondary">Initial Price</p>
                      <p className="font-medium">0.05 SONIC</p>
                    </div>
                  </div>
                  <div className="pt-2">
                    <button className="w-full bg-launchlayer-violet hover:bg-launchlayer-violet/90 hover:brightness-110 hover:scale-[1.02] text-white py-2 rounded-md font-medium transition-all shadow-button">
                      Register Interest
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex justify-center py-4">
            <ArrowUp className="text-launchlayer-violet animate-pulse-violet" size={24} />
          </div>
          
          <div className="bg-launchlayer-surface p-4 rounded-lg border border-launchlayer-surface-light card-hover shadow-card">
            <h4 className="font-mono text-sm mb-2 text-launchlayer-violet">NexusDAO.raise</h4>
            <p className="text-xs text-launchlayer-text-secondary mb-2">
              Community-driven governance token launch
            </p>
            <div className="bg-launchlayer-background p-2 rounded font-mono text-xs">
              <code>
                <span className="text-purple-500">factory</span>.
                <span className="text-blue-400">createRaise</span>(
                <span className="text-green-400">token</span>, 
                <span className="text-amber-400">500000</span>, 
                <span className="text-red-400">settings</span>);
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniRaiseExample;
