
import React, { useState } from "react";
import { ArrowLeft, Wallet, ArrowUpDown, Settings, ChevronDown, Plus, Minus, TrendingUp, Info, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";

const BetaUXPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('swap');
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showRemoveLiquidityModal, setShowRemoveLiquidityModal] = useState(false);
  const [tokenSelection, setTokenSelection] = useState<'from' | 'to'>('from');
  const [fromToken, setFromToken] = useState({ symbol: 'ETH', name: 'Ethereum', logo: '⚡', balance: '4.5' });
  const [toToken, setToToken] = useState({ symbol: 'SUPER', name: 'SuperToken', logo: '🚀', balance: '0' });
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [selectedPosition, setSelectedPosition] = useState<any>(null);
  const [removePercentage, setRemovePercentage] = useState([50]);

  const tokens = [
    { symbol: 'ETH', name: 'Ethereum', logo: '⚡', balance: '4.5' },
    { symbol: 'SUPER', name: 'SuperToken', logo: '🚀', balance: '0' },
    { symbol: 'USDC', name: 'USD Coin', logo: '💰', balance: '1,250.0' },
    { symbol: 'WBTC', name: 'Wrapped Bitcoin', logo: '₿', balance: '0.15' },
    { symbol: 'UNI', name: 'Uniswap', logo: '🦄', balance: '125.5' },
    { symbol: 'LINK', name: 'Chainlink', logo: '🔗', balance: '45.2' }
  ];

  const liquidityPositions = [
    {
      id: 1,
      pair: 'ETH / SUPER',
      feeTier: '0.3%',
      liquidity: '$5,000',
      status: 'In Range',
      statusColor: 'bg-green-500',
      uncollectedFees: '$12.50'
    },
    {
      id: 2,
      pair: 'ETH / USDC',
      feeTier: '0.05%',
      liquidity: '$2,500',
      status: 'Out of Range',
      statusColor: 'bg-red-500',
      uncollectedFees: '$3.25'
    }
  ];

  const handleTokenSelect = (token: any) => {
    if (tokenSelection === 'from') {
      setFromToken(token);
    } else {
      setToToken(token);
    }
    setShowTokenModal(false);
  };

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const calculateOutput = (input: string) => {
    if (!input || isNaN(Number(input))) return '';
    const rate = 1700; // 1 ETH = 1700 SUPER
    const output = fromToken.symbol === 'ETH' ? Number(input) * rate : Number(input) / rate;
    return output.toFixed(4);
  };

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    setToAmount(calculateOutput(value));
  };

  const TokenSelectionModal = () => (
    <Dialog open={showTokenModal} onOpenChange={setShowTokenModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select a Token</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="Search tokens..." className="w-full" />
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {tokens.map((token) => (
              <div
                key={token.symbol}
                className="flex items-center justify-between p-3 hover:bg-launchlayer-surface rounded-lg cursor-pointer transition-colors"
                onClick={() => handleTokenSelect(token)}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{token.logo}</div>
                  <div>
                    <p className="font-medium">{token.symbol}</p>
                    <p className="text-sm text-launchlayer-text-secondary">{token.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{token.balance}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );

  const ConfirmSwapModal = () => (
    <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Swap</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="bg-launchlayer-surface p-4 rounded-lg">
            <p className="text-center mb-4">
              You are swapping <strong>{fromAmount} {fromToken.symbol}</strong> for a minimum of{' '}
              <strong>{toAmount} {toToken.symbol}</strong>
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Price:</span>
                <span>1 {toToken.symbol} = 0.000588 {fromToken.symbol}</span>
              </div>
              <div className="flex justify-between">
                <span>Price Impact:</span>
                <span className="text-green-500">&lt;0.01%</span>
              </div>
              <div className="flex justify-between">
                <span>Fee (0.3%):</span>
                <span>{(Number(fromAmount) * 0.003).toFixed(4)} {fromToken.symbol}</span>
              </div>
              <div className="flex justify-between">
                <span>Route:</span>
                <span>{fromToken.symbol} → {toToken.symbol}</span>
              </div>
            </div>
          </div>
          <Button className="w-full" onClick={() => setShowConfirmModal(false)}>
            Confirm Swap
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const RemoveLiquidityModal = () => (
    <Dialog open={showRemoveLiquidityModal} onOpenChange={setShowRemoveLiquidityModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Remove Liquidity</DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-4">
              <span>Amount to Remove</span>
              <span className="text-2xl font-bold">{removePercentage[0]}%</span>
            </div>
            <Slider
              value={removePercentage}
              onValueChange={setRemovePercentage}
              max={100}
              step={1}
              className="mb-4"
            />
            <div className="flex space-x-2">
              {[25, 50, 75, 100].map((percent) => (
                <Button
                  key={percent}
                  variant="outline"
                  size="sm"
                  onClick={() => setRemovePercentage([percent])}
                >
                  {percent}%
                </Button>
              ))}
            </div>
          </div>
          
          <div className="bg-launchlayer-surface p-4 rounded-lg space-y-2">
            <h4 className="font-medium">You will receive:</h4>
            <div className="flex justify-between">
              <span>ETH:</span>
              <span>{((Number(selectedPosition?.liquidity.replace('$', '').replace(',', '')) / 2) * (removePercentage[0] / 100) / 1700).toFixed(4)}</span>
            </div>
            <div className="flex justify-between">
              <span>SUPER:</span>
              <span>{((Number(selectedPosition?.liquidity.replace('$', '').replace(',', '')) / 2) * (removePercentage[0] / 100)).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-launchlayer-accent">
              <span>Uncollected Fees:</span>
              <span>{selectedPosition?.uncollectedFees}</span>
            </div>
          </div>

          <Button 
            className="w-full" 
            onClick={() => setShowRemoveLiquidityModal(false)}
          >
            Confirm Removal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  const SwapInterface = () => (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Swap</span>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* You Pay Section */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>You Pay</span>
              <span className="text-launchlayer-text-secondary">Balance: {fromToken.balance} {fromToken.symbol}</span>
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="0.0"
                value={fromAmount}
                onChange={(e) => handleFromAmountChange(e.target.value)}
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={() => {
                  setTokenSelection('from');
                  setShowTokenModal(true);
                }}
                className="flex items-center space-x-2 px-3"
              >
                <span className="text-xl">{fromToken.logo}</span>
                <span>{fromToken.symbol}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Flip Icon */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSwapTokens}
              className="rounded-full"
            >
              <ArrowUpDown className="w-4 h-4" />
            </Button>
          </div>

          {/* You Receive Section */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>You Receive</span>
              <span className="text-launchlayer-text-secondary">Balance: {toToken.balance} {toToken.symbol}</span>
            </div>
            <div className="flex space-x-2">
              <Input
                placeholder="0.0"
                value={toAmount}
                readOnly
                className="flex-1 bg-launchlayer-surface"
              />
              <Button
                variant="outline"
                onClick={() => {
                  setTokenSelection('to');
                  setShowTokenModal(true);
                }}
                className="flex items-center space-x-2 px-3"
              >
                <span className="text-xl">{toToken.logo}</span>
                <span>{toToken.symbol}</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Transaction Details */}
          {fromAmount && (
            <div className="bg-launchlayer-surface p-3 rounded-lg space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Price:</span>
                <span>1 {toToken.symbol} = 0.000588 {fromToken.symbol}</span>
              </div>
              <div className="flex justify-between">
                <span>Price Impact:</span>
                <span className="text-green-500">&lt;0.01%</span>
              </div>
              <div className="flex justify-between">
                <span>Fee (0.3%):</span>
                <span>{(Number(fromAmount) * 0.003).toFixed(4)} {fromToken.symbol}</span>
              </div>
              <div className="flex justify-between">
                <span>Route:</span>
                <span>{fromToken.symbol} → {toToken.symbol}</span>
              </div>
            </div>
          )}

          {/* Swap Button */}
          <Button 
            className="w-full" 
            disabled={!fromAmount || Number(fromAmount) <= 0}
            onClick={() => setShowConfirmModal(true)}
          >
            {!fromAmount || Number(fromAmount) <= 0 ? 'Enter Amount' : 'Swap'}
          </Button>
        </CardContent>
      </Card>

      {/* Price Chart Placeholder */}
      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">{fromToken.symbol}/{toToken.symbol} Price Chart</h3>
            <div className="flex items-center space-x-2 text-sm text-launchlayer-accent">
              <TrendingUp className="w-4 h-4" />
              <span>+5.67%</span>
            </div>
          </div>
          <div className="h-32 bg-gradient-to-r from-launchlayer-accent/20 to-launchlayer-violet/20 rounded-lg flex items-center justify-center">
            <span className="text-launchlayer-text-secondary">Price Chart Placeholder</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const LiquidityInterface = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* My Positions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Your Liquidity Positions</span>
            <Button onClick={() => {}} className="flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Liquidity</span>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {liquidityPositions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-launchlayer-text-secondary mb-4">Your active liquidity positions will appear here.</p>
              <Button>+ Add Liquidity</Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {liquidityPositions.map((position) => (
                <Card key={position.id} className="border border-launchlayer-surface-light">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{position.pair}</h4>
                      <Badge variant="outline">{position.feeTier}</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Liquidity Value:</span>
                        <span className="font-medium">{position.liquidity}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Status:</span>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${position.statusColor}`}></div>
                          <span>{position.status}</span>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span>Uncollected Fees:</span>
                        <span className="text-launchlayer-accent">{position.uncollectedFees}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Plus className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => {
                          setSelectedPosition(position);
                          setShowRemoveLiquidityModal(true);
                        }}
                      >
                        <Minus className="w-3 h-3 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Liquidity Widget */}
      <Card>
        <CardHeader>
          <CardTitle>Add Liquidity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Select Pair */}
          <div className="space-y-3">
            <h4 className="font-medium">Select Pair</h4>
            <div className="flex space-x-2">
              <Button variant="outline" className="flex-1 flex items-center space-x-2">
                <span className="text-xl">⚡</span>
                <span>ETH</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
              <Button variant="outline" className="flex-1 flex items-center space-x-2">
                <span className="text-xl">🚀</span>
                <span>SUPER</span>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Step 2: Fee Tier */}
          <div className="space-y-3">
            <h4 className="font-medium">Fee Tier</h4>
            <div className="grid grid-cols-3 gap-2">
              {['0.05%', '0.3%', '1%'].map((fee) => (
                <Button key={fee} variant={fee === '0.3%' ? 'default' : 'outline'} size="sm">
                  {fee}
                </Button>
              ))}
            </div>
          </div>

          {/* Step 3: Price Range */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <h4 className="font-medium">Set Price Range</h4>
              <div className="flex items-center space-x-1 text-sm text-launchlayer-text-secondary">
                <Info className="w-3 h-3" />
                <span>Concentrated Liquidity</span>
              </div>
            </div>
            <div className="bg-launchlayer-surface p-4 rounded-lg">
              <p className="text-sm text-launchlayer-text-secondary mb-4">
                Current Price: 1,700 SUPER per ETH
              </p>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium">Min Price</label>
                  <Input placeholder="1,500" />
                </div>
                <div>
                  <label className="text-sm font-medium">Max Price</label>
                  <Input placeholder="2,000" />
                </div>
              </div>
              <div className="h-20 bg-gradient-to-r from-launchlayer-violet/20 via-launchlayer-accent/40 to-launchlayer-violet/20 rounded flex items-center justify-center">
                <span className="text-sm text-launchlayer-text-secondary">Price Range Visualization</span>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm">Full Range</Button>
              </div>
            </div>
          </div>

          {/* Step 4: Deposit Amounts */}
          <div className="space-y-3">
            <h4 className="font-medium">Deposit Amounts</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>ETH Amount</span>
                  <span>Balance: 4.5 ETH</span>
                </div>
                <Input placeholder="0.0" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>SUPER Amount</span>
                  <span>Balance: 0 SUPER</span>
                </div>
                <Input placeholder="0.0" />
              </div>
            </div>
          </div>

          {/* Add Liquidity Button */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              Approve Tokens
            </Button>
            <Button className="w-full">
              Add Liquidity
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-launchlayer-background text-launchlayer-text-primary">
      {/* Header */}
      <header className="bg-launchlayer-surface border-b border-launchlayer-surface-light p-4 sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")} 
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
            <div className="flex items-center space-x-4">
              <img 
                src="/lovable-uploads/c054fc20-c0d7-4c0c-9d55-8dc40e350c79.png" 
                alt="Launch Layer Logo" 
                className="h-8 w-auto" 
              />
              <h1 className="text-xl font-bold bg-gradient-to-r from-launchlayer-accent to-launchlayer-violet bg-clip-text text-transparent">
                Propulsion Finance DEX
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4 text-sm">
              <Button variant="ghost" size="sm">Dashboard</Button>
              <Button variant="ghost" size="sm">Airlocks</Button>
              <Button variant="ghost" size="sm">Launchpad</Button>
              <Button variant="accent" size="sm">Propulsion DEX</Button>
              <Button variant="ghost" size="sm">My Account</Button>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Wallet className="w-4 h-4" />
              <span>0x1234...5678</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 max-w-6xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-48 grid-cols-2 mx-auto">
            <TabsTrigger value="swap">Swap</TabsTrigger>
            <TabsTrigger value="liquidity">Liquidity</TabsTrigger>
          </TabsList>
          
          <TabsContent value="swap" className="space-y-6">
            <SwapInterface />
          </TabsContent>
          
          <TabsContent value="liquidity" className="space-y-6">
            <LiquidityInterface />
          </TabsContent>
        </Tabs>
      </main>

      {/* Modals */}
      <TokenSelectionModal />
      <ConfirmSwapModal />
      <RemoveLiquidityModal />
    </div>
  );
};

export default BetaUXPage;
