
import React, { useState } from "react";
import { ArrowLeft, Wallet, ExternalLink, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const BetaUXPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'chain' | 'personal'>('dashboard');
  const [selectedChain, setSelectedChain] = useState<string>('');
  const [showStakingModal, setShowStakingModal] = useState(false);
  const [selectedPool, setSelectedPool] = useState<any>(null);
  const [stakeAmount, setStakeAmount] = useState('');

  const chains = [
    { name: 'Base', logo: '🔵', tvl: '$4,100,000', pools: 2 },
    { name: 'HyperEVM', logo: '⚡', tvl: '$5,200,000', pools: 2 },
    { name: 'MegaETH', logo: '🚀', tvl: '$2,200,000', pools: 2 },
    { name: 'Monad', logo: '🔮', tvl: '$1,250,000', pools: 2 }
  ];

  const pools = {
    'HyperEVM': [
      {
        name: 'Core Yield ETH',
        strategy: 'Core Yield (Proprietary)',
        asset: 'ETH',
        apy: '18.5%',
        tvl: '$3,000,000',
        description: 'Our unique alpha strategy powered by Infrasingularity\'s validator and early-network operations.'
      },
      {
        name: 'Blue-Chip ETH',
        strategy: 'Blue-Chip Stable',
        asset: 'ETH',
        apy: '11.2%',
        tvl: '$2,200,000',
        description: 'A trusted strategy earning yield from top-tier protocols, powered by Beefy Finance.'
      }
    ]
  };

  const userPositions = [
    {
      pool: 'Core Yield ETH (on HyperEVM)',
      staked: '$10,000.00',
      yield: '$150.75'
    },
    {
      pool: 'Blue-Chip USDC (on Base)',
      staked: '$5,500.00',
      yield: '$61.75'
    }
  ];

  const upcomingTGEs = [
    {
      name: 'Project Alpha',
      logo: '🌟',
      allocation: '$75.00',
      tgeDate: 'July 15, 2025'
    },
    {
      name: 'Beta Protocol',
      logo: '🔥',
      allocation: '$45.50',
      tgeDate: 'August 2, 2025'
    }
  ];

  // Main Dashboard View
  const DashboardView = () => (
    <div className="space-y-8">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 bg-launchlayer-surface rounded-lg border border-launchlayer-surface-light">
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <img src="/lovable-uploads/c054fc20-c0d7-4c0c-9d55-8dc40e350c79.png" alt="Launch Layer" className="h-8 w-auto" />
            <span className="text-xl font-bold text-launchlayer-accent">Launch Layer</span>
          </div>
          <div className="hidden md:flex space-x-4 text-sm">
            <span className="text-launchlayer-accent font-medium">Dashboard</span>
            <span className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary cursor-pointer">Airlocks</span>
            <span className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary cursor-pointer">Launchpad</span>
            <span className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary cursor-pointer">Propulsion DEX</span>
            <span className="text-launchlayer-text-secondary hover:text-launchlayer-text-primary cursor-pointer">My Account</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Wallet className="w-4 h-4" />
          <span>0x1234...5678</span>
        </div>
      </nav>

      {/* High-Level Stats Banner */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-launchlayer-accent">$12,750,000</h3>
            <p className="text-launchlayer-text-secondary">Total Value Locked</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-launchlayer-violet">8</h3>
            <p className="text-launchlayer-text-secondary">Active Airlocks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-launchlayer-mint">6</h3>
            <p className="text-launchlayer-text-secondary">Upcoming Launches</p>
          </CardContent>
        </Card>
      </div>

      {/* Your Summary Section */}
      <Card>
        <CardHeader>
          <CardTitle>Your Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-launchlayer-text-secondary">Your Total Staked</p>
              <p className="text-2xl font-bold text-launchlayer-text-primary">$15,500</p>
            </div>
            <div>
              <p className="text-sm text-launchlayer-text-secondary">Your Accrued Yield (for TGEs)</p>
              <p className="text-2xl font-bold text-launchlayer-accent">$212.50</p>
            </div>
          </div>
          <Button onClick={() => setCurrentView('personal')} className="w-full">
            View My Airlocks
          </Button>
        </CardContent>
      </Card>

      {/* Airlock Chains Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Explore Airlocks</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {chains.map((chain) => (
            <Card key={chain.name} className="hover:border-launchlayer-accent transition-colors cursor-pointer">
              <CardContent className="p-6 text-center space-y-4">
                <div className="text-4xl">{chain.logo}</div>
                <h3 className="text-xl font-bold">{chain.name}</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-launchlayer-text-secondary">Chain TVL:</span> {chain.tvl}</p>
                  <p><span className="text-launchlayer-text-secondary">Available Pools:</span> {chain.pools}</p>
                </div>
                <Button 
                  onClick={() => {
                    setSelectedChain(chain.name);
                    setCurrentView('chain');
                  }}
                  className="w-full"
                >
                  Select Chain
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  // Chain-Specific Airlock View
  const ChainView = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          onClick={() => setCurrentView('dashboard')}
          className="p-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-3xl font-bold">{selectedChain} Airlocks</h1>
      </div>

      {/* Chain-Specific Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-xl font-bold text-launchlayer-accent">$5,200,000</h3>
            <p className="text-sm text-launchlayer-text-secondary">TVL on {selectedChain}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-xl font-bold text-launchlayer-violet">11.2% - 18.5%</h3>
            <p className="text-sm text-launchlayer-text-secondary">Current APY Range</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <h3 className="text-xl font-bold text-launchlayer-mint">2</h3>
            <p className="text-sm text-launchlayer-text-secondary">Available Pools</p>
          </CardContent>
        </Card>
      </div>

      {/* Available Pools */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Available Pools</h2>
        {pools[selectedChain as keyof typeof pools]?.map((pool, index) => (
          <Card key={index} className="hover:border-launchlayer-accent transition-colors">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold">{pool.name}</h3>
                  <p className="text-sm text-launchlayer-text-secondary">{pool.strategy}</p>
                  <p className="text-xs text-launchlayer-text-secondary">{pool.description}</p>
                </div>
                <div className="text-right space-y-2">
                  <div>
                    <p className="text-sm text-launchlayer-text-secondary">APY</p>
                    <p className="text-xl font-bold text-launchlayer-accent">{pool.apy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-launchlayer-text-secondary">Pool TVL</p>
                    <p className="font-medium">{pool.tvl}</p>
                  </div>
                  <Button 
                    onClick={() => {
                      setSelectedPool(pool);
                      setShowStakingModal(true);
                    }}
                    className="w-full"
                  >
                    Stake
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  // Personal Dashboard View
  const PersonalView = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          onClick={() => setCurrentView('dashboard')}
          className="p-2"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-3xl font-bold">My Airlocks</h1>
      </div>

      {/* Aggregated Summary */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-launchlayer-text-primary">$15,500.00</h3>
            <p className="text-launchlayer-text-secondary">Total Value Staked</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <h3 className="text-2xl font-bold text-launchlayer-accent">$212.50</h3>
            <p className="text-launchlayer-text-secondary">Total Accrued Yield (Value for TGEs)</p>
          </CardContent>
        </Card>
      </div>

      {/* Position Breakdown */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Your Positions</h2>
        {userPositions.map((position, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-bold">{position.pool}</h3>
                  <p className="text-sm text-launchlayer-text-secondary">Amount Staked: {position.staked}</p>
                  <p className="text-sm text-launchlayer-accent">Accrued Yield: {position.yield}</p>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Add Stake</Button>
                  <Button variant="outline" size="sm">Withdraw</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Allocations */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold">Your Upcoming TGE Allocations</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {upcomingTGEs.map((tge, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center space-y-2">
                <div className="text-3xl">{tge.logo}</div>
                <h3 className="font-bold">{tge.name}</h3>
                <p className="text-launchlayer-accent font-medium">~{tge.allocation}</p>
                <p className="text-sm text-launchlayer-text-secondary">TGE: {tge.tgeDate}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  // Staking Modal
  const StakingModal = () => (
    <Dialog open={showStakingModal} onOpenChange={setShowStakingModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Stake ETH in {selectedPool?.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-launchlayer-text-secondary">Your Wallet Balance</p>
            <p className="font-bold">4.5 ETH</p>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Amount to Stake</label>
            <Input 
              placeholder="0.0"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
            />
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={() => setStakeAmount('1.125')}>25%</Button>
              <Button variant="outline" size="sm" onClick={() => setStakeAmount('2.25')}>50%</Button>
              <Button variant="outline" size="sm" onClick={() => setStakeAmount('4.5')}>MAX</Button>
            </div>
          </div>

          <div className="bg-launchlayer-surface p-4 rounded-lg space-y-2">
            <h4 className="font-medium">Transaction Summary</h4>
            <div className="text-sm space-y-1">
              <p>You will receive: ~{stakeAmount || '0'} sCoreETH</p>
              <p>Current APY: {selectedPool?.apy}</p>
              <p>Gas Fee: ~$12.50</p>
            </div>
          </div>

          <div className="space-y-2">
            <Button className="w-full" variant="outline">
              Approve
            </Button>
            <Button className="w-full" disabled={!stakeAmount}>
              Confirm Stake
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="min-h-screen bg-launchlayer-background text-launchlayer-text-primary">
      {/* Header */}
      <header className="bg-launchlayer-surface border-b border-launchlayer-surface-light p-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/c054fc20-c0d7-4c0c-9d55-8dc40e350c79.png" 
              alt="Launch Layer Logo" 
              className="h-8 w-auto" 
            />
            <h1 className="text-xl font-bold bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet bg-clip-text text-transparent">
              Launch Layer - Beta UX Mockup
            </h1>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-launchlayer-text-secondary">
            <Button 
              variant={currentView === 'dashboard' ? 'accent' : 'ghost'} 
              size="sm"
              onClick={() => setCurrentView('dashboard')}
            >
              Dashboard
            </Button>
            <Button 
              variant={currentView === 'personal' ? 'accent' : 'ghost'} 
              size="sm"
              onClick={() => setCurrentView('personal')}
            >
              My Airlocks
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 max-w-6xl">
        {currentView === 'dashboard' && <DashboardView />}
        {currentView === 'chain' && <ChainView />}
        {currentView === 'personal' && <PersonalView />}
        <StakingModal />
      </main>
    </div>
  );
};

export default BetaUXPage;
