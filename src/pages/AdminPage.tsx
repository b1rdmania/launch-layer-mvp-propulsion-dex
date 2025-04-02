import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@/contexts/WalletContext';
import { createRaise } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { toast } from "sonner";

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { address, isConnected, connect } = useWallet();
  
  // Mock factory owner address for demo
  // const factoryOwner = '0x123...abc';
  // const isFactoryOwner = isConnected && address === factoryOwner;
  
  const [activeTab, setActiveTab] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    // Basic info
    projectName: '',
    tokenAddress: '',
    acceptedTokenAddress: '0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38', // Default to WS
    description: '',
    longDescription: '',
    
    // Sale structure
    pricePerToken: '',
    maxRaiseAmount: '',
    minAllocation: '',
    maxAllocation: '',
    
    // Timing
    presaleStart: '',
    publicSaleStart: '',
    endTime: '',
    
    // Whitelist
    enablePresale: false,
    merkleRoot: '',
    
    // Wallets and fees
    ownerWallet: '',
    feeRecipient: '',
    feeBps: '250', // Default 2.5%
    
    // URLs
    logoUrl: '',
    bannerUrl: '',
    websiteUrl: '',
    twitterUrl: '',
    telegramUrl: '',
    discordUrl: ''
  });
  
  // Update form data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };
  
  // Handle tab navigation
  const handleNextTab = () => {
    if (activeTab === 'basic') setActiveTab('structure');
    else if (activeTab === 'structure') setActiveTab('timing');
    else if (activeTab === 'timing') setActiveTab('whitelist');
    else if (activeTab === 'whitelist') setActiveTab('wallets');
    else if (activeTab === 'wallets') setActiveTab('review');
  };
  
  const handlePrevTab = () => {
    if (activeTab === 'structure') setActiveTab('basic');
    else if (activeTab === 'timing') setActiveTab('structure');
    else if (activeTab === 'whitelist') setActiveTab('timing');
    else if (activeTab === 'wallets') setActiveTab('whitelist');
    else if (activeTab === 'review') setActiveTab('wallets');
  };
  
  // Submit form
  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      
      // In a real implementation, we would validate the form data
      // and create the raise using the factory contract
      const raiseAddress = await createRaise(formData as any);
      
      toast.success('Raise created successfully!', {
        description: `Contract deployed at ${raiseAddress}`,
      });
      
      // Navigate to the raise page
      navigate(`/raise/${raiseAddress}`);
    } catch (error) {
      console.error('Failed to create raise:', error);
      toast.error('Failed to create raise');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Validation (simplified)
  const isCurrentTabValid = () => {
    switch (activeTab) {
      case 'basic':
        return formData.projectName && formData.tokenAddress && formData.description;
      case 'structure':
        return formData.pricePerToken && formData.maxRaiseAmount && formData.minAllocation && formData.maxAllocation;
      case 'timing':
        return formData.presaleStart && formData.publicSaleStart && formData.endTime;
      case 'whitelist':
        return !formData.enablePresale || formData.merkleRoot;
      case 'wallets':
        return formData.ownerWallet && formData.feeRecipient && formData.feeBps;
      default:
        return true;
    }
  };
  
  // Removed wallet connection check and unauthorized check
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Create New Raise</h1>
        <p className="text-cradle-text-secondary mb-6">
          Set up a new token sale by filling out the form below.
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-6 mb-6 bg-cradle-surface-light">
            <TabsTrigger value="basic">1. Basic</TabsTrigger>
            <TabsTrigger value="structure">2. Structure</TabsTrigger>
            <TabsTrigger value="timing">3. Timing</TabsTrigger>
            <TabsTrigger value="whitelist">4. Whitelist</TabsTrigger>
            <TabsTrigger value="wallets">5. Wallets</TabsTrigger>
            <TabsTrigger value="review">6. Review</TabsTrigger>
          </TabsList>
          
          {/* Basic Info Tab */}
          <TabsContent value="basic">
            <Card className="bg-cradle-surface border-cradle-surface-light">
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription className="text-cradle-text-secondary">
                  Enter the core details about your project and token
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Project Name</label>
                  <Input 
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    placeholder="e.g., BOOM Perpetual DEX"
                    className="bg-cradle-surface-light border-cradle-surface-light"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Token Address</label>
                  <Input 
                    name="tokenAddress"
                    value={formData.tokenAddress}
                    onChange={handleChange}
                    placeholder="e.g., 0x1234..."
                    className="bg-cradle-surface-light border-cradle-surface-light font-mono"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Accepted Token Address (Default: WS)
                  </label>
                  <Input 
                    name="acceptedTokenAddress"
                    value={formData.acceptedTokenAddress}
                    onChange={handleChange}
                    placeholder="e.g., 0x039e... (WS)"
                    className="bg-cradle-surface-light border-cradle-surface-light font-mono"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Short Description</label>
                  <Input 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Brief description (max 150 chars)"
                    className="bg-cradle-surface-light border-cradle-surface-light"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Long Description (Markdown supported)
                  </label>
                  <Textarea 
                    name="longDescription"
                    value={formData.longDescription}
                    onChange={handleChange}
                    placeholder="Detailed project description with markdown support"
                    rows={6}
                    className="bg-cradle-surface-light border-cradle-surface-light"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Logo URL</label>
                    <Input 
                      name="logoUrl"
                      value={formData.logoUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/logo.png"
                      className="bg-cradle-surface-light border-cradle-surface-light"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Banner URL</label>
                    <Input 
                      name="bannerUrl"
                      value={formData.bannerUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/banner.png"
                      className="bg-cradle-surface-light border-cradle-surface-light"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Website URL</label>
                    <Input 
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                      placeholder="https://yourproject.com"
                      className="bg-cradle-surface-light border-cradle-surface-light"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Twitter URL</label>
                    <Input 
                      name="twitterUrl"
                      value={formData.twitterUrl}
                      onChange={handleChange}
                      placeholder="https://twitter.com/yourproject"
                      className="bg-cradle-surface-light border-cradle-surface-light"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Telegram URL</label>
                    <Input 
                      name="telegramUrl"
                      value={formData.telegramUrl}
                      onChange={handleChange}
                      placeholder="https://t.me/yourproject"
                      className="bg-cradle-surface-light border-cradle-surface-light"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Discord URL</label>
                    <Input 
                      name="discordUrl"
                      value={formData.discordUrl}
                      onChange={handleChange}
                      placeholder="https://discord.gg/yourproject"
                      className="bg-cradle-surface-light border-cradle-surface-light"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4 flex justify-end">
              <Button
                onClick={handleNextTab}
                disabled={!isCurrentTabValid()}
                className="bg-cradle-accent hover:bg-cradle-accent/90"
              >
                Next: Sale Structure
              </Button>
            </div>
          </TabsContent>
          
          {/* Sale Structure Tab */}
          <TabsContent value="structure">
            <Card className="bg-cradle-surface border-cradle-surface-light">
              <CardHeader>
                <CardTitle>Sale Structure</CardTitle>
                <CardDescription className="text-cradle-text-secondary">
                  Define the economics of your token sale
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Price Per Token</label>
                    <div className="relative">
                      <Input 
                        name="pricePerToken"
                        type="number"
                        value={formData.pricePerToken}
                        onChange={handleChange}
                        placeholder="e.g., 0.1"
                        className="bg-cradle-surface-light border-cradle-surface-light font-mono pl-20"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-cradle-text-secondary font-mono">
                        mUSDC
                      </div>
                    </div>
                    <p className="text-xs text-cradle-text-secondary mt-1">
                      The price per token in mUSDC
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Max Raise Amount</label>
                    <div className="relative">
                      <Input 
                        name="maxRaiseAmount"
                        type="number"
                        value={formData.maxRaiseAmount}
                        onChange={handleChange}
                        placeholder="e.g., 100000"
                        className="bg-cradle-surface-light border-cradle-surface-light font-mono pl-20"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-cradle-text-secondary font-mono">
                        mUSDC
                      </div>
                    </div>
                    <p className="text-xs text-cradle-text-secondary mt-1">
                      Hard cap for the total raise
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Min Allocation</label>
                    <div className="relative">
                      <Input 
                        name="minAllocation"
                        type="number"
                        value={formData.minAllocation}
                        onChange={handleChange}
                        placeholder="e.g., 100"
                        className="bg-cradle-surface-light border-cradle-surface-light font-mono pl-20"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-cradle-text-secondary font-mono">
                        TOKEN
                      </div>
                    </div>
                    <p className="text-xs text-cradle-text-secondary mt-1">
                      Minimum amount of tokens a user can purchase
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Max Allocation</label>
                    <div className="relative">
                      <Input 
                        name="maxAllocation"
                        type="number"
                        value={formData.maxAllocation}
                        onChange={handleChange}
                        placeholder="e.g., 5000"
                        className="bg-cradle-surface-light border-cradle-surface-light font-mono pl-20"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-cradle-text-secondary font-mono">
                        TOKEN
                      </div>
                    </div>
                    <p className="text-xs text-cradle-text-secondary mt-1">
                      Maximum amount of tokens a user can purchase
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4 flex justify-between">
              <Button
                onClick={handlePrevTab}
                variant="outline"
                className="bg-transparent border-cradle-surface-light"
              >
                Back
              </Button>
              <Button
                onClick={handleNextTab}
                disabled={!isCurrentTabValid()}
                className="bg-cradle-accent hover:bg-cradle-accent/90"
              >
                Next: Timing
              </Button>
            </div>
          </TabsContent>
          
          {/* Timing Tab */}
          <TabsContent value="timing">
            <Card className="bg-cradle-surface border-cradle-surface-light">
              <CardHeader>
                <CardTitle>Sale Timing</CardTitle>
                <CardDescription className="text-cradle-text-secondary">
                  Set the schedule for your presale and public sale
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Presale Start Date & Time</label>
                  <Input 
                    name="presaleStart"
                    type="datetime-local"
                    value={formData.presaleStart}
                    onChange={handleChange}
                    className="bg-cradle-surface-light border-cradle-surface-light font-mono"
                  />
                  <p className="text-xs text-cradle-text-secondary mt-1">
                    When the presale phase begins (only whitelisted users can contribute)
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Public Sale Start Date & Time</label>
                  <Input 
                    name="publicSaleStart"
                    type="datetime-local"
                    value={formData.publicSaleStart}
                    onChange={handleChange}
                    className="bg-cradle-surface-light border-cradle-surface-light font-mono"
                  />
                  <p className="text-xs text-cradle-text-secondary mt-1">
                    When the public sale phase begins (anyone can contribute)
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Sale End Date & Time</label>
                  <Input 
                    name="endTime"
                    type="datetime-local"
                    value={formData.endTime}
                    onChange={handleChange}
                    className="bg-cradle-surface-light border-cradle-surface-light font-mono"
                  />
                  <p className="text-xs text-cradle-text-secondary mt-1">
                    When the entire sale ends
                  </p>
                </div>
                
              </CardContent>
            </Card>
            
            <div className="mt-4 flex justify-between">
              <Button
                onClick={handlePrevTab}
                variant="outline"
                className="bg-transparent border-cradle-surface-light"
              >
                Back
              </Button>
              <Button
                onClick={handleNextTab}
                disabled={!isCurrentTabValid()}
                className="bg-cradle-accent hover:bg-cradle-accent/90"
              >
                Next: Whitelist
              </Button>
            </div>
          </TabsContent>
          
          {/* Whitelist Tab */}
          <TabsContent value="whitelist">
            <Card className="bg-cradle-surface border-cradle-surface-light">
              <CardHeader>
                <CardTitle>Presale Whitelist</CardTitle>
                <CardDescription className="text-cradle-text-secondary">
                  Configure your presale whitelist settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="enablePresale"
                    name="enablePresale"
                    checked={formData.enablePresale}
                    onChange={handleCheckboxChange}
                    className="rounded bg-cradle-surface-light border-cradle-surface-light text-cradle-accent focus:ring-cradle-accent"
                  />
                  <label htmlFor="enablePresale" className="text-sm font-medium">
                    Enable presale phase with whitelist
                  </label>
                </div>
                
                {formData.enablePresale && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1">Merkle Root</label>
                      <Input 
                        name="merkleRoot"
                        value={formData.merkleRoot}
                        onChange={handleChange}
                        placeholder="e.g., 0x1234..."
                        className="bg-cradle-surface-light border-cradle-surface-light font-mono"
                      />
                      <p className="text-xs text-cradle-text-secondary mt-1">
                        The merkle root of your whitelist addresses
                      </p>
                    </div>
                    
                    <div className="bg-cradle-surface-light p-4 rounded-md">
                      <h4 className="font-medium mb-2">Generating a Merkle Root</h4>
                      <p className="text-sm text-cradle-text-secondary mb-2">
                        To generate a merkle root:
                      </p>
                      <ol className="text-sm text-cradle-text-secondary list-decimal ml-5 space-y-1">
                        <li>Prepare a CSV file with all whitelisted addresses</li>
                        <li>Use the whitelist tool to generate the merkle root</li>
                        <li>Paste the generated merkle root above</li>
                      </ol>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            
            <div className="mt-4 flex justify-between">
              <Button
                onClick={handlePrevTab}
                variant="outline"
                className="bg-transparent border-cradle-surface-light"
              >
                Back
              </Button>
              <Button
                onClick={handleNextTab}
                disabled={!isCurrentTabValid()}
                className="bg-cradle-accent hover:bg-cradle-accent/90"
              >
                Next: Wallets & Fees
              </Button>
            </div>
          </TabsContent>
          
          {/* Wallets Tab */}
          <TabsContent value="wallets">
            <Card className="bg-cradle-surface border-cradle-surface-light">
              <CardHeader>
                <CardTitle>Wallets & Fees</CardTitle>
                <CardDescription className="text-cradle-text-secondary">
                  Configure wallet addresses and fee settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Raise Owner Wallet</label>
                  <Input 
                    name="ownerWallet"
                    value={formData.ownerWallet}
                    onChange={handleChange}
                    placeholder="e.g., 0x1234..."
                    className="bg-cradle-surface-light border-cradle-surface-light font-mono"
                  />
                  <p className="text-xs text-cradle-text-secondary mt-1">
                    The wallet that will control the raise (can finalize, cancel, sweep)
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Fee Recipient</label>
                  <Input 
                    name="feeRecipient"
                    value={formData.feeRecipient}
                    onChange={handleChange}
                    placeholder="e.g., 0x1234..."
                    className="bg-cradle-surface-light border-cradle-surface-light font-mono"
                  />
                  <p className="text-xs text-cradle-text-secondary mt-1">
                    The wallet that will receive the platform fee
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Fee (Basis Points)</label>
                  <div className="relative">
                    <Input 
                      name="feeBps"
                      type="number"
                      value={formData.feeBps}
                      onChange={handleChange}
                      placeholder="e.g., 250"
                      className="bg-cradle-surface-light border-cradle-surface-light font-mono pr-16"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-cradle-text-secondary">
                      BPS
                    </div>
                  </div>
                  <p className="text-xs text-cradle-text-secondary mt-1">
                    The platform fee in basis points (100 BPS = 1%)
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4 flex justify-between">
              <Button
                onClick={handlePrevTab}
                variant="outline"
                className="bg-transparent border-cradle-surface-light"
              >
                Back
              </Button>
              <Button
                onClick={handleNextTab}
                disabled={!isCurrentTabValid()}
                className="bg-cradle-accent hover:bg-cradle-accent/90"
              >
                Next: Review
              </Button>
            </div>
          </TabsContent>
          
          {/* Review Tab */}
          <TabsContent value="review">
            <Card className="bg-cradle-surface border-cradle-surface-light">
              <CardHeader>
                <CardTitle>Review & Deploy</CardTitle>
                <CardDescription className="text-cradle-text-secondary">
                  Review your raise configuration before deployment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-cradle-surface-light p-4 rounded-md">
                    <h4 className="font-medium mb-2">Basic Information</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span className="text-cradle-text-secondary">Project Name:</span>
                        <span>{formData.projectName}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-cradle-text-secondary">Token Address:</span>
                        <span className="font-mono truncate max-w-[280px]">{formData.tokenAddress}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-cradle-surface-light p-4 rounded-md">
                    <h4 className="font-medium mb-2">Sale Structure</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span className="text-cradle-text-secondary">Price Per Token:</span>
                        <span>{formData.pricePerToken} mUSDC</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-cradle-text-secondary">Max Raise Amount:</span>
                        <span>{formData.maxRaiseAmount} mUSDC</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-cradle-text-secondary">Min/Max Allocation:</span>
                        <span>{formData.minAllocation} / {formData.maxAllocation} tokens</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-cradle-surface-light p-4 rounded-md">
                    <h4 className="font-medium mb-2">Timing</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span className="text-cradle-text-secondary">Presale Start:</span>
                        <span>{new Date(formData.presaleStart).toLocaleString()}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-cradle-text-secondary">Public Sale Start:</span>
                        <span>{new Date(formData.publicSaleStart).toLocaleString()}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-cradle-text-secondary">End Time:</span>
                        <span>{new Date(formData.endTime).toLocaleString()}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-cradle-surface-light p-4 rounded-md">
                    <h4 className="font-medium mb-2">Wallets & Fees</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span className="text-cradle-text-secondary">Owner:</span>
                        <span className="font-mono truncate max-w-[280px]">{formData.ownerWallet}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-cradle-text-secondary">Fee Recipient:</span>
                        <span className="font-mono truncate max-w-[280px]">{formData.feeRecipient}</span>
                      </li>
                      <li className="flex justify-between">
                        <span className="text-cradle-text-secondary">Fee:</span>
                        <span>{(parseFloat(formData.feeBps) / 100).toFixed(2)}%</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-cradle-surface-light p-4 rounded-md">
                    <h4 className="font-medium mb-2">Whitelist</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span className="text-cradle-text-secondary">Presale Enabled:</span>
                        <span>{formData.enablePresale ? 'Yes' : 'No'}</span>
                      </li>
                      {formData.enablePresale && (
                        <li className="flex justify-between">
                          <span className="text-cradle-text-secondary">Merkle Root:</span>
                          <span className="font-mono truncate max-w-[200px]">{formData.merkleRoot}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full bg-cradle-accent hover:bg-cradle-accent/90 py-6 text-lg"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <span className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></span>
                        <span>Deploying Raise...</span>
                      </div>
                    ) : (
                      'Deploy Raise'
                    )}
                  </Button>
                </div>
                
                <p className="mt-4 text-center text-sm text-cradle-text-secondary">
                  This will deploy a new CradleRaise contract using the provided parameters.
                  <br />
                  You'll need to approve the transaction in your wallet.
                </p>
              </CardContent>
            </Card>
            
            <div className="mt-4 flex justify-start">
              <Button
                onClick={handlePrevTab}
                variant="outline"
                className="bg-transparent border-cradle-surface-light"
                disabled={isSubmitting}
              >
                Back
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;
