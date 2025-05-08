
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Image, ArrowUp } from "lucide-react";

const MiniRaiseExample: React.FC = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col">
        <div className="relative">
          <Card className="border border-launchlayer-surface-light bg-launchlayer-surface shadow-card hover:shadow-lg transition-all animate-float card-hover">
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-br from-launchlayer-accent to-launchlayer-violet w-10 h-10 rounded-full flex items-center justify-center">
                    <Image size={20} className="text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">SampleToken</CardTitle>
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
  );
};

export default MiniRaiseExample;
