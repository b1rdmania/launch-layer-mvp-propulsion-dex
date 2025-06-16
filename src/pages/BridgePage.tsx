
import React, { useState } from "react";
import { ArrowLeft, Wallet, ArrowUpDown, ChevronDown, ExternalLink, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const BridgePage: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [fromChain, setFromChain] = useState({ name: 'Ethereum', symbol: 'ETH', logo: '⚡' });
  const [toChain, setToChain] = useState({ name: 'Sonic', symbol: 'SONIC', logo: '🚀' });
  const [selectedToken, setSelectedToken] = useState({ symbol: 'USDC', name: 'USD Coin', logo: '💰', balance: '1,250.00' });
  const [amount, setAmount] = useState('');
  const [showChainModal, setShowChainModal] = useState(false);
  const [chainSelection, setChainSelection] = useState<'from' | 'to'>('from');
  const [bridgeStatus, setBridgeStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle');

  const chains = [
    { name: 'Ethereum', symbol: 'ETH', logo: '⚡' },
    { name: 'Sonic', symbol: 'SONIC', logo: '🚀' },
    { name: 'Polygon', symbol: 'MATIC', logo: '🔮' },
    { name: 'Arbitrum', symbol: 'ARB', logo: '🌊' },
    { name: 'Optimism', symbol: 'OP', logo: '🔴' }
  ];

  const tokens = [
    { symbol: 'USDC', name: 'USD Coin', logo: '💰', balance: '1,250.00' },
    { symbol: 'USDT', name: 'Tether USD', logo: '💚', balance: '500.00' },
    { symbol: 'ETH', name: 'Ethereum', logo: '⚡', balance: '4.5' },
    { symbol: 'WBTC', name: 'Wrapped Bitcoin', logo: '₿', balance: '0.15' }
  ];

  const handleChainSelect = (chain: any) => {
    if (chainSelection === 'from') {
      setFromChain(chain);
    } else {
      setToChain(chain);
    }
    setShowChainModal(false);
  };

  const handleSwapChains = () => {
    const temp = fromChain;
    setFromChain(toChain);
    setToChain(temp);
  };

  const handleBridge = async () => {
    setBridgeStatus('pending');
    
    toast({
      title: "Bridge Transaction Initiated",
      description: `Bridging ${amount} ${selectedToken.symbol} from ${fromChain.name} to ${toChain.name}`,
    });

    // Simulate bridge transaction
    setTimeout(() => {
      setBridgeStatus('success');
      toast({
        title: "Bridge Successful!",
        description: `${amount} ${selectedToken.symbol} bridged successfully to ${toChain.name}`,
      });
    }, 3000);
  };

  const getEstimatedTime = () => {
    if (fromChain.name === 'Ethereum' || toChain.name === 'Ethereum') return '10-15 minutes';
    return '2-5 minutes';
  };

  const getBridgeFee = () => {
    const fee = Number(amount) * 0.001; // 0.1% fee
    return fee.toFixed(4);
  };

  const ChainSelectionModal = () => (
    <Dialog open={showChainModal} onOpenChange={setShowChainModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select Network</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          {chains.map((chain) => (
            <div
              key={chain.name}
              className="flex items-center justify-between p-3 hover:bg-launchlayer-surface rounded-lg cursor-pointer transition-colors"
              onClick={() => handleChainSelect(chain)}
            >
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{chain.logo}</div>
                <div>
                  <p className="font-medium">{chain.name}</p>
                  <p className="text-sm text-launchlayer-text-secondary">{chain.symbol}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
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
                Propulsion Bridge
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Wallet className="w-4 h-4" />
              <span>0x1234...5678</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto p-6 max-w-2xl">
        <div className="space-y-6">
          {/* Bridge Interface */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Cross-Chain Bridge</span>
                <Badge variant="outline" className="bg-launchlayer-accent/10 text-launchlayer-accent">
                  Powered by Rhino.fi
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* From Chain */}
              <div className="space-y-2">
                <label className="text-sm font-medium">From Network</label>
                <Button
                  variant="outline"
                  onClick={() => {
                    setChainSelection('from');
                    setShowChainModal(true);
                  }}
                  className="w-full flex items-center justify-between p-4 h-auto"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{fromChain.logo}</div>
                    <div className="text-left">
                      <p className="font-medium">{fromChain.name}</p>
                      <p className="text-sm text-launchlayer-text-secondary">{fromChain.symbol}</p>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>

              {/* Amount Input */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Amount</span>
                  <span className="text-launchlayer-text-secondary">Balance: {selectedToken.balance} {selectedToken.symbol}</span>
                </div>
                <div className="flex space-x-2">
                  <Input
                    placeholder="0.0"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" className="flex items-center space-x-2 px-3">
                    <span className="text-xl">{selectedToken.logo}</span>
                    <span>{selectedToken.symbol}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Swap Arrow */}
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSwapChains}
                  className="rounded-full"
                >
                  <ArrowUpDown className="w-4 h-4" />
                </Button>
              </div>

              {/* To Chain */}
              <div className="space-y-2">
                <label className="text-sm font-medium">To Network</label>
                <Button
                  variant="outline"
                  onClick={() => {
                    setChainSelection('to');
                    setShowChainModal(true);
                  }}
                  className="w-full flex items-center justify-between p-4 h-auto"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">{toChain.logo}</div>
                    <div className="text-left">
                      <p className="font-medium">{toChain.name}</p>
                      <p className="text-sm text-launchlayer-text-secondary">{toChain.symbol}</p>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </div>

              {/* Bridge Details */}
              {amount && (
                <div className="bg-launchlayer-surface p-4 rounded-lg space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>You will receive:</span>
                    <span className="font-medium">{amount} {selectedToken.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Bridge Fee:</span>
                    <span>{getBridgeFee()} {selectedToken.symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Time:</span>
                    <span>{getEstimatedTime()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Route:</span>
                    <span>{fromChain.name} → {toChain.name}</span>
                  </div>
                </div>
              )}

              {/* Bridge Button */}
              <Button 
                className="w-full" 
                disabled={!amount || Number(amount) <= 0 || bridgeStatus === 'pending'}
                onClick={handleBridge}
              >
                {bridgeStatus === 'pending' ? (
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 animate-spin" />
                    <span>Bridging...</span>
                  </div>
                ) : !amount || Number(amount) <= 0 ? (
                  'Enter Amount'
                ) : (
                  `Bridge ${amount || '0'} ${selectedToken.symbol}`
                )}
              </Button>

              {/* Status Messages */}
              {bridgeStatus === 'success' && (
                <div className="flex items-center space-x-2 text-green-500 bg-green-500/10 p-3 rounded-lg">
                  <CheckCircle className="w-4 h-4" />
                  <span>Bridge transaction completed successfully!</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bridge Info */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <h3 className="font-medium flex items-center space-x-2">
                  <ExternalLink className="w-4 h-4" />
                  <span>Bridge Information</span>
                </h3>
                <div className="space-y-2 text-sm text-launchlayer-text-secondary">
                  <p>• Cross-chain bridges enable asset transfers between different blockchains</p>
                  <p>• Bridge fees vary based on network congestion and transaction complexity</p>
                  <p>• Always verify the destination address before confirming transactions</p>
                  <p>• Large transfers may require additional confirmation time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Modals */}
      <ChainSelectionModal />
    </div>
  );
};

export default BridgePage;
