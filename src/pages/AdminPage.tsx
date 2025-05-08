import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { useWallet } from "@/contexts/WalletContext";
import { ethers } from "ethers";
import { ArrowRight, Check, Info, Loader2 } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

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
  metadata: {
    name: string;
    symbol: string;
    description: string;
    longDescription: string;
    websiteUrl: string;
    bannerUrl: string;
    logoUrl: string;
    socials: {
      twitter: string;
      telegram: string;
      discord: string;
      medium: string;
    };
  };
}

const initialState: FormData = {
  token: "",
  acceptedToken: "",
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
    name: "SampleToken DEX",
    symbol: "SAMPLE",
    description: "A sample token for Launch Layer demonstration",
    longDescription: "This is a longer description about the sample token and its use cases within the ecosystem.",
    websiteUrl: "https://example.com",
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

const AdminPage: React.FC = () => {
  const { toast } = useToast();
  const { address, isConnected, connect } = useWallet();
  const [formValues, setFormValues] = useState<FormData>(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("token");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormValues(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof FormData],
          [child]: value
        }
      }));
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
      
      // Reset form or redirect
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

  const nextTab = () => {
    if (activeTab === "token") setActiveTab("sale");
    else if (activeTab === "sale") setActiveTab("metadata");
  };

  const prevTab = () => {
    if (activeTab === "metadata") setActiveTab("sale");
    else if (activeTab === "sale") setActiveTab("token");
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-[1280px]">
      <h1 className="text-3xl font-bold mb-2">Create Token Raise</h1>
      <p className="text-launchlayer-text-secondary mb-8">
        Configure and deploy your token raise on Sonic Network
      </p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="token">Token Details</TabsTrigger>
          <TabsTrigger value="sale">Sale Parameters</TabsTrigger>
          <TabsTrigger value="metadata">Metadata & Launch</TabsTrigger>
        </TabsList>
        
        <form onSubmit={handleSubmit}>
          <TabsContent value="token">
            <Card>
              <CardHeader>
                <CardTitle>Token Configuration</CardTitle>
                <CardDescription>
                  Set up the token details for your raise
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="token">Token Address</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="token"
                      name="token"
                      placeholder="0x..."
                      value={formValues.token}
                      onChange={handleInputChange}
                      className="font-mono"
                    />
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Info size={16} />
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <p className="text-sm">
                          The address of the ERC20 token you want to sell. This token must be deployed before creating a raise.
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="acceptedToken">Accepted Payment Token</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="acceptedToken"
                      name="acceptedToken"
                      placeholder="0x... (USDC, WETH, etc.)"
                      value={formValues.acceptedToken}
                      onChange={handleInputChange}
                      className="font-mono"
                    />
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Info size={16} />
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <p className="text-sm">
                          The token you want to accept as payment. Common choices are USDC, WETH, or other stablecoins.
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pricePerToken">Price Per Token</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="pricePerToken"
                      name="pricePerToken"
                      placeholder="0.01"
                      value={formValues.pricePerToken}
                      onChange={handleInputChange}
                    />
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Info size={16} />
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <p className="text-sm">
                          The price of one token in terms of the accepted payment token.
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div></div> {/* Empty div for spacing */}
                <Button type="button" onClick={nextTab}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="sale">
            <Card>
              <CardHeader>
                <CardTitle>Sale Parameters</CardTitle>
                <CardDescription>
                  Configure the timing and limits for your token sale
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="presaleStart">Presale Start (Optional)</Label>
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
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="publicSaleStart">Public Sale Start</Label>
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
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endTime">Sale End Time</Label>
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
                  />
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <Label htmlFor="maxAcceptedTokenRaise">Maximum Raise Amount</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="maxAcceptedTokenRaise"
                      name="maxAcceptedTokenRaise"
                      placeholder="100000"
                      value={formValues.maxAcceptedTokenRaise}
                      onChange={handleInputChange}
                    />
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Info size={16} />
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <p className="text-sm">
                          The maximum amount of accepted tokens to raise (hardcap).
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minTokenAllocation">Minimum Allocation</Label>
                    <Input
                      id="minTokenAllocation"
                      name="minTokenAllocation"
                      placeholder="100"
                      value={formValues.minTokenAllocation}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxTokenAllocation">Maximum Allocation</Label>
                    <Input
                      id="maxTokenAllocation"
                      name="maxTokenAllocation"
                      placeholder="10000"
                      value={formValues.maxTokenAllocation}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <Label htmlFor="merkleRoot">Whitelist Merkle Root (Optional)</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="merkleRoot"
                      name="merkleRoot"
                      placeholder="0x..."
                      value={formValues.merkleRoot}
                      onChange={handleInputChange}
                      className="font-mono"
                    />
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Info size={16} />
                        </Button>
                      </HoverCardTrigger>
                      <HoverCardContent className="w-80">
                        <p className="text-sm">
                          Optional Merkle root for whitelisted addresses. Leave as default (all zeros) for no whitelist.
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevTab}>
                  Back
                </Button>
                <Button type="button" onClick={nextTab}>
                  Next <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="metadata">
            <Card>
              <CardHeader>
                <CardTitle>Project Metadata & Launch</CardTitle>
                <CardDescription>
                  Add details about your project and launch your token sale
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="metadata.name">Project Name</Label>
                    <Input
                      id="metadata.name"
                      name="metadata.name"
                      placeholder="My Token Project"
                      value={formValues.metadata.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="metadata.symbol">Token Symbol</Label>
                    <Input
                      id="metadata.symbol"
                      name="metadata.symbol"
                      placeholder="TKN"
                      value={formValues.metadata.symbol}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metadata.description">Short Description</Label>
                  <Input
                    id="metadata.description"
                    name="metadata.description"
                    placeholder="A brief description of your project"
                    value={formValues.metadata.description}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metadata.longDescription">Long Description</Label>
                  <Textarea
                    id="metadata.longDescription"
                    name="metadata.longDescription"
                    placeholder="A detailed description of your project, its goals, and use cases"
                    value={formValues.metadata.longDescription}
                    onChange={handleInputChange}
                    rows={4}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metadata.websiteUrl">Website URL</Label>
                  <Input
                    id="metadata.websiteUrl"
                    name="metadata.websiteUrl"
                    placeholder="https://example.com"
                    value={formValues.metadata.websiteUrl}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="metadata.logoUrl">Logo URL</Label>
                    <Input
                      id="metadata.logoUrl"
                      name="metadata.logoUrl"
                      placeholder="https://example.com/logo.png"
                      value={formValues.metadata.logoUrl}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="metadata.bannerUrl">Banner URL</Label>
                    <Input
                      id="metadata.bannerUrl"
                      name="metadata.bannerUrl"
                      placeholder="https://example.com/banner.png"
                      value={formValues.metadata.bannerUrl}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <h3 className="text-lg font-medium">Social Media Links</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="twitter">Twitter</Label>
                    <Input
                      id="twitter"
                      name="twitter"
                      placeholder="https://twitter.com/username"
                      value={formValues.metadata.socials.twitter}
                      onChange={handleSocialInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="telegram">Telegram</Label>
                    <Input
                      id="telegram"
                      name="telegram"
                      placeholder="https://t.me/username"
                      value={formValues.metadata.socials.telegram}
                      onChange={handleSocialInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="discord">Discord</Label>
                    <Input
                      id="discord"
                      name="discord"
                      placeholder="https://discord.gg/invite"
                      value={formValues.metadata.socials.discord}
                      onChange={handleSocialInputChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="medium">Medium</Label>
                    <Input
                      id="medium"
                      name="medium"
                      placeholder="https://medium.com/@username"
                      value={formValues.metadata.socials.medium}
                      onChange={handleSocialInputChange}
                    />
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-2">
                  <Label htmlFor="raiseOwner">Raise Owner Address</Label>
                  <Input
                    id="raiseOwner"
                    name="raiseOwner"
                    placeholder={address || "0x..."}
                    value={formValues.raiseOwner || address || ""}
                    onChange={handleInputChange}
                    className="font-mono"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="feeRecipient">Fee Recipient (Optional)</Label>
                  <Input
                    id="feeRecipient"
                    name="feeRecipient"
                    placeholder="0x..."
                    value={formValues.feeRecipient}
                    onChange={handleInputChange}
                    className="font-mono"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="feePercentBasisPoints">Fee Percentage (basis points)</Label>
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
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" variant="outline" onClick={prevTab}>
                  Back
                </Button>
                {!isConnected ? (
                  <Button type="button" onClick={connect}>
                    Connect Wallet
                  </Button>
                ) : (
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deploying...
                      </>
                    ) : (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Deploy Raise
                      </>
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
        </form>
      </Tabs>
    </div>
  );
};

export default AdminPage;
