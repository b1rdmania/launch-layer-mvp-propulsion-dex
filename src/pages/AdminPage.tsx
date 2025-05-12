
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useWallet } from "@/contexts/WalletContext";
import { Check, Loader2 } from "lucide-react";

interface SocialLinks {
  twitter: string;
  telegram: string;
  discord: string;
  medium: string;
}

interface TokenMetadata {
  name: string;
  symbol: string;
  description: string;
  longDescription: string;
  websiteUrl: string;
  bannerUrl: string;
  logoUrl: string;
  socials: SocialLinks;
}

interface FormData {
  token: string;
  acceptedToken: string;
  pricePerToken: string;
  presaleStart: number;
  publicSaleStart: number;
  endTime: number;
  merkleRoot: string;
  raiseOwner: string;
  feeRecipient: string;
  feePercentBasisPoints: number;
  maxAcceptedTokenRaise: string;
  minTokenAllocation: string;
  maxTokenAllocation: string;
  metadata: TokenMetadata;
}

const initialState: FormData = {
  token: "",
  acceptedToken: "0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38",
  pricePerToken: "",
  presaleStart: 0,
  publicSaleStart: 0,
  endTime: 0,
  merkleRoot: "0x0000000000000000000000000000000000000000000000000000000000000000",
  raiseOwner: "",
  feeRecipient: "",
  feePercentBasisPoints: 250, // 2.5%
  maxAcceptedTokenRaise: "",
  minTokenAllocation: "",
  maxTokenAllocation: "",
  metadata: {
    name: "",
    symbol: "",
    description: "",
    longDescription: "",
    websiteUrl: "",
    bannerUrl: "",
    logoUrl: "",
    socials: {
      twitter: "",
      telegram: "",
      discord: "",
      medium: ""
    }
  }
};

// Steps configuration
const steps = [
  { id: 1, name: "Basic", description: "Project & token details" },
  { id: 2, name: "Structure", description: "Raise parameters" },
  { id: 3, name: "Timing", description: "Schedule settings" },
  { id: 4, name: "Whitelist", description: "Access control" },
  { id: 5, name: "Wallets", description: "Fee configuration" },
  { id: 6, name: "Review", description: "Deploy raise" }
];

const AdminPage: React.FC = () => {
  const { toast } = useToast();
  const { address, isConnected, connect } = useWallet();
  const [formValues, setFormValues] = useState<FormData>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      if (parent === 'metadata') {
        setFormValues(prev => ({
          ...prev,
          metadata: {
            ...prev.metadata,
            [child]: value
          }
        }));
      }
    } else {
      setFormValues(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSocialInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        socials: {
          ...prev.metadata.socials,
          [name]: value
        }
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isConnected) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to continue.",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate contract interaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Success!",
        description: "Your token raise has been created.",
        variant: "default"
      });
      
    } catch (error) {
      console.error("Error creating raise:", error);
      toast({
        title: "Error",
        description: "Failed to create token raise. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-8">
            <div>
              <div className="flex items-center mb-2 space-x-2">
                <div className="bg-launchlayer-violet/20 text-launchlayer-violet rounded-full w-7 h-7 flex items-center justify-center text-sm">1</div>
                <h2 className="text-xl font-bold text-launchlayer-violet">Basic Information</h2>
              </div>
              <p className="text-launchlayer-text-secondary ml-9">Enter the core details about your project and token</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="metadata.name" className="text-base text-launchlayer-text-primary">Project Name</Label>
                <Input
                  id="metadata.name"
                  name="metadata.name"
                  placeholder="e.g., Perpetual DEX"
                  value={formValues.metadata.name}
                  onChange={handleInputChange}
                  className="border-gray-700"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="token" className="text-base text-launchlayer-text-primary">Token Address</Label>
                <Input
                  id="token"
                  name="token"
                  placeholder="e.g., 0x1234..."
                  value={formValues.token}
                  onChange={handleInputChange}
                  className="font-mono border-gray-700"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="acceptedToken" className="text-base text-launchlayer-text-primary">Accepted Token Address (Default: WS)</Label>
                <Input
                  id="acceptedToken"
                  name="acceptedToken"
                  placeholder="0x..."
                  value={formValues.acceptedToken}
                  onChange={handleInputChange}
                  className="font-mono border-gray-700"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="metadata.description" className="text-base text-launchlayer-text-primary">Short Description</Label>
                <Input
                  id="metadata.description"
                  name="metadata.description"
                  placeholder="Brief description (max 150 chars)"
                  value={formValues.metadata.description}
                  onChange={handleInputChange}
                  className="border-gray-700"
                  maxLength={150}
                />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-8">
            <div>
              <div className="flex items-center mb-2 space-x-2">
                <div className="bg-launchlayer-violet/20 text-launchlayer-violet rounded-full w-7 h-7 flex items-center justify-center text-sm">2</div>
                <h2 className="text-xl font-bold text-launchlayer-violet">Raise Structure</h2>
              </div>
              <p className="text-launchlayer-text-secondary ml-9">Configure the token economics for your raise</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pricePerToken" className="text-base text-launchlayer-text-primary">Price Per Token</Label>
                <Input
                  id="pricePerToken"
                  name="pricePerToken"
                  placeholder="0.01"
                  value={formValues.pricePerToken}
                  onChange={handleInputChange}
                  className="border-gray-700"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maxAcceptedTokenRaise" className="text-base text-launchlayer-text-primary">Maximum Raise Amount (Hard Cap)</Label>
                <Input
                  id="maxAcceptedTokenRaise"
                  name="maxAcceptedTokenRaise"
                  placeholder="100000"
                  value={formValues.maxAcceptedTokenRaise}
                  onChange={handleInputChange}
                  className="border-gray-700"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minTokenAllocation" className="text-base text-launchlayer-text-primary">Minimum Allocation</Label>
                  <Input
                    id="minTokenAllocation"
                    name="minTokenAllocation"
                    placeholder="100"
                    value={formValues.minTokenAllocation}
                    onChange={handleInputChange}
                    className="border-gray-700"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxTokenAllocation" className="text-base text-launchlayer-text-primary">Maximum Allocation</Label>
                  <Input
                    id="maxTokenAllocation"
                    name="maxTokenAllocation"
                    placeholder="10000"
                    value={formValues.maxTokenAllocation}
                    onChange={handleInputChange}
                    className="border-gray-700"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-8">
            <div>
              <div className="flex items-center mb-2 space-x-2">
                <div className="bg-launchlayer-violet/20 text-launchlayer-violet rounded-full w-7 h-7 flex items-center justify-center text-sm">3</div>
                <h2 className="text-xl font-bold text-launchlayer-violet">Timing</h2>
              </div>
              <p className="text-launchlayer-text-secondary ml-9">Set up your raise schedule</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="presaleStart" className="text-base text-launchlayer-text-primary">Presale Start (Optional)</Label>
                <Input
                  id="presaleStart"
                  name="presaleStart"
                  type="datetime-local"
                  value={formValues.presaleStart ? new Date(formValues.presaleStart * 1000).toISOString().slice(0, 16) : ""}
                  onChange={(e) => {
                    const timestamp = new Date(e.target.value).getTime() / 1000;
                    setFormValues(prev => ({
                      ...prev,
                      presaleStart: timestamp
                    }));
                  }}
                  className="border-gray-700"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="publicSaleStart" className="text-base text-launchlayer-text-primary">Public Sale Start</Label>
                <Input
                  id="publicSaleStart"
                  name="publicSaleStart"
                  type="datetime-local"
                  value={formValues.publicSaleStart ? new Date(formValues.publicSaleStart * 1000).toISOString().slice(0, 16) : ""}
                  onChange={(e) => {
                    const timestamp = new Date(e.target.value).getTime() / 1000;
                    setFormValues(prev => ({
                      ...prev,
                      publicSaleStart: timestamp
                    }));
                  }}
                  required
                  className="border-gray-700"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="endTime" className="text-base text-launchlayer-text-primary">Sale End Time</Label>
                <Input
                  id="endTime"
                  name="endTime"
                  type="datetime-local"
                  value={formValues.endTime ? new Date(formValues.endTime * 1000).toISOString().slice(0, 16) : ""}
                  onChange={(e) => {
                    const timestamp = new Date(e.target.value).getTime() / 1000;
                    setFormValues(prev => ({
                      ...prev,
                      endTime: timestamp
                    }));
                  }}
                  required
                  className="border-gray-700"
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-8">
            <div>
              <div className="flex items-center mb-2 space-x-2">
                <div className="bg-launchlayer-violet/20 text-launchlayer-violet rounded-full w-7 h-7 flex items-center justify-center text-sm">4</div>
                <h2 className="text-xl font-bold text-launchlayer-violet">Whitelist</h2>
              </div>
              <p className="text-launchlayer-text-secondary ml-9">Configure whitelisted addresses for presale</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="merkleRoot" className="text-base text-launchlayer-text-primary">Whitelist Merkle Root (Optional)</Label>
                <Input
                  id="merkleRoot"
                  name="merkleRoot"
                  placeholder="0x..."
                  value={formValues.merkleRoot}
                  onChange={handleInputChange}
                  className="font-mono border-gray-700"
                />
                <p className="text-xs text-launchlayer-text-secondary">
                  Leave default (all zeros) for no whitelist. For a custom whitelist, generate a Merkle root from your addresses.
                </p>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-8">
            <div>
              <div className="flex items-center mb-2 space-x-2">
                <div className="bg-launchlayer-violet/20 text-launchlayer-violet rounded-full w-7 h-7 flex items-center justify-center text-sm">5</div>
                <h2 className="text-xl font-bold text-launchlayer-violet">Wallets</h2>
              </div>
              <p className="text-launchlayer-text-secondary ml-9">Configure wallet addresses and fees</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="raiseOwner" className="text-base text-launchlayer-text-primary">Raise Owner Address</Label>
                <Input
                  id="raiseOwner"
                  name="raiseOwner"
                  placeholder={address || "0x..."}
                  value={formValues.raiseOwner || address || ""}
                  onChange={handleInputChange}
                  className="font-mono border-gray-700"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="feeRecipient" className="text-base text-launchlayer-text-primary">Fee Recipient (Optional)</Label>
                <Input
                  id="feeRecipient"
                  name="feeRecipient"
                  placeholder="0x..."
                  value={formValues.feeRecipient}
                  onChange={handleInputChange}
                  className="font-mono border-gray-700"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="feePercentBasisPoints" className="text-base text-launchlayer-text-primary">Fee Percentage (basis points)</Label>
                <Input
                  id="feePercentBasisPoints"
                  name="feePercentBasisPoints"
                  type="number"
                  placeholder="250 (2.5%)"
                  value={formValues.feePercentBasisPoints}
                  onChange={(e) => setFormValues(prev => ({
                    ...prev,
                    feePercentBasisPoints: parseInt(e.target.value)
                  }))}
                  className="border-gray-700"
                />
                <p className="text-xs text-launchlayer-text-secondary">100 basis points = 1%</p>
              </div>
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-8">
            <div>
              <div className="flex items-center mb-2 space-x-2">
                <div className="bg-launchlayer-violet/20 text-launchlayer-violet rounded-full w-7 h-7 flex items-center justify-center text-sm">6</div>
                <h2 className="text-xl font-bold text-launchlayer-violet">Review & Launch</h2>
              </div>
              <p className="text-launchlayer-text-secondary ml-9">Review your settings and launch your token raise</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-1">
                <h3 className="font-medium text-launchlayer-text-primary">Project Name</h3>
                <p className="text-launchlayer-text-secondary">{formValues.metadata.name || "Not specified"}</p>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-medium text-launchlayer-text-primary">Token Address</h3>
                <p className="text-launchlayer-text-secondary font-mono">{formValues.token || "Not specified"}</p>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-medium text-launchlayer-text-primary">Price Per Token</h3>
                <p className="text-launchlayer-text-secondary">{formValues.pricePerToken || "Not specified"}</p>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-medium text-launchlayer-text-primary">Raise Amount</h3>
                <p className="text-launchlayer-text-secondary">{formValues.maxAcceptedTokenRaise || "Not specified"}</p>
              </div>
              
              <div className="space-y-1">
                <h3 className="font-medium text-launchlayer-text-primary">Schedule</h3>
                <p className="text-launchlayer-text-secondary">
                  {formValues.presaleStart ? `Presale: ${new Date(formValues.presaleStart * 1000).toLocaleString()}, ` : ""}
                  Public: {formValues.publicSaleStart ? new Date(formValues.publicSaleStart * 1000).toLocaleString() : "Not specified"},
                  End: {formValues.endTime ? new Date(formValues.endTime * 1000).toLocaleString() : "Not specified"}
                </p>
              </div>
            </div>

            <div className="!mt-12 py-4">
              {!isConnected ? (
                <Button 
                  type="button" 
                  onClick={connect} 
                  className="w-full bg-launchlayer-violet hover:bg-launchlayer-violet/90 text-white"
                >
                  Connect Wallet to Continue
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full bg-launchlayer-violet hover:bg-launchlayer-violet/90 text-white"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Raise...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Launch Token Raise
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-launchlayer-background">
      <div className="relative">
        {/* Premium header with gradient background */}
        <div className="absolute inset-0 w-full h-64 bg-gradient-to-b from-launchlayer-violet/30 to-transparent opacity-50 pointer-events-none" />
        
        {/* Premium animated floating shapes in background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-[10%] w-40 h-40 bg-launchlayer-accent/10 rounded-full filter blur-3xl animate-first"></div>
          <div className="absolute top-10 right-[15%] w-56 h-56 bg-launchlayer-violet/10 rounded-full filter blur-3xl animate-second"></div>
          <div className="absolute top-40 left-[30%] w-32 h-32 bg-launchlayer-mint/10 rounded-full filter blur-3xl animate-third"></div>
        </div>
      
        <div className="container mx-auto py-8 px-4 fade-in relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 space-y-3">
              <h4 className="section-header-violet text-sm uppercase tracking-wider font-medium">Launch Layer</h4>
              <h1 className="text-4xl font-bold mb-2 text-gradient-violet">Create New Raise</h1>
              <p className="text-launchlayer-text-secondary">
                Step {currentStep} of {steps.length} — {steps[currentStep - 1].name}
              </p>
              <p className="text-launchlayer-text-secondary/80 text-sm">
                {steps[currentStep - 1].description}
              </p>
            </div>

            {/* Step indicators with premium styling */}
            <div className="flex justify-between mb-10 bg-launchlayer-surface/80 backdrop-blur-sm border border-launchlayer-violet/20 rounded-xl p-6 shadow-lg">
              {steps.map((step, index) => (
                <React.Fragment key={step.id}>
                  <div 
                    className={`flex flex-col items-center ${index + 1 === currentStep ? 'text-launchlayer-violet' : 'text-gray-500'}`}
                  >
                    <div 
                      className={`rounded-full w-10 h-10 flex items-center justify-center mb-2 font-semibold transition-all duration-300
                                ${index + 1 === currentStep 
                                  ? 'bg-launchlayer-violet text-white shadow-violet' 
                                  : index + 1 < currentStep 
                                    ? 'bg-launchlayer-violet/30 text-white'
                                    : 'bg-[#1A1A1A] text-launchlayer-text-secondary border border-gray-700'
                                }`}
                    >
                      {index + 1}
                    </div>
                    <span className="text-sm hidden md:block">{step.name}</span>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="grow h-[1px] bg-gray-700 self-center mx-2 mt-[-20px]" />
                  )}
                </React.Fragment>
              ))}
            </div>
            
            <form onSubmit={handleSubmit} className="bg-gradient-blur border border-gray-700/50 p-6 sm:p-8 rounded-lg shadow-lg">
              {renderStepContent()}
              
              <Separator className="my-8 bg-gray-700" />
              
              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  variant="outline"
                  className={currentStep === 1 ? "opacity-50 border-gray-700 text-launchlayer-text-secondary" : "border-gray-700 text-launchlayer-text-secondary hover:bg-launchlayer-violet/10 hover:text-launchlayer-violet hover:border-launchlayer-violet/50"}
                >
                  Back
                </Button>
                
                {currentStep < steps.length ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    variant="default"
                    className="bg-launchlayer-violet hover:bg-launchlayer-violet/90 text-white shadow-violet"
                  >
                    Continue
                  </Button>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
