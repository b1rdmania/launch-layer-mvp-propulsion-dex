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
import { DESIGN_SYSTEM, CONTRACT_ADDRESSES } from '@/contracts/config';

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { address, isConnected, connect } = useWallet();
  
  const [activeTab, setActiveTab] = useState('basic');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    // Basic info
    projectName: '',
    tokenAddress: '',
    acceptedTokenAddress: CONTRACT_ADDRESSES.ACCEPTED_TOKEN, // Default to WS
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
        style: {
          background: DESIGN_SYSTEM.colors.secondaryBackground,
          color: DESIGN_SYSTEM.colors.primaryText,
          border: `1px solid ${DESIGN_SYSTEM.colors.secondaryText}`
        }
      });
      
      // Navigate to the raise page
      navigate(`/raise/${raiseAddress}`);
    } catch (error) {
      console.error('Failed to create raise:', error);
      toast.error('Failed to create raise', {
        style: {
          background: DESIGN_SYSTEM.colors.secondaryBackground,
          color: DESIGN_SYSTEM.colors.primaryText,
          border: `1px solid ${DESIGN_SYSTEM.colors.secondaryText}`
        }
      });
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
  
  // Styling based on the design system
  const cardStyle = {
    background: DESIGN_SYSTEM.colors.secondaryBackground,
    border: `1px solid #333`,
    borderRadius: '12px',
  };
  
  const inputStyle = {
    background: DESIGN_SYSTEM.colors.primaryBackground,
    border: '1px solid #333',
    color: DESIGN_SYSTEM.colors.primaryText,
    fontFamily: DESIGN_SYSTEM.fonts.primary,
  };
  
  const buttonPrimaryStyle = {
    background: DESIGN_SYSTEM.colors.accentPrimary,
    color: DESIGN_SYSTEM.colors.primaryText,
  };
  
  const buttonOutlineStyle = {
    background: 'transparent',
    border: `1px solid #333`,
    color: DESIGN_SYSTEM.colors.primaryText,
  };
  
  return (
    <div className="container mx-auto px-8 py-8 max-w-[1280px]" style={{ fontFamily: DESIGN_SYSTEM.fonts.primary }}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Create New Raise</h1>
        <p className="mb-6" style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>
          Set up a new token sale by filling out the form below.
        </p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-6 mb-6" style={{ background: '#222' }}>
            <TabsTrigger value="basic">1. Basic</TabsTrigger>
            <TabsTrigger value="structure">2. Structure</TabsTrigger>
            <TabsTrigger value="timing">3. Timing</TabsTrigger>
            <TabsTrigger value="whitelist">4. Whitelist</TabsTrigger>
            <TabsTrigger value="wallets">5. Wallets</TabsTrigger>
            <TabsTrigger value="review">6. Review</TabsTrigger>
          </TabsList>
          
          {/* Basic Info Tab */}
          <TabsContent value="basic">
            <Card style={cardStyle}>
              <CardHeader>
                <CardTitle style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Basic Information</CardTitle>
                <CardDescription style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>
                  Enter the core details about your project and token
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Project Name</label>
                  <Input 
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleChange}
                    placeholder="e.g., BOOM Perpetual DEX"
                    style={inputStyle}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Token Address</label>
                  <Input 
                    name="tokenAddress"
                    value={formData.tokenAddress}
                    onChange={handleChange}
                    placeholder="e.g., 0x1234..."
                    style={{...inputStyle, fontFamily: DESIGN_SYSTEM.fonts.secondary}}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>
                    Accepted Token Address (Default: WS)
                  </label>
                  <Input 
                    name="acceptedTokenAddress"
                    value={formData.acceptedTokenAddress}
                    onChange={handleChange}
                    placeholder="e.g., 0x039e... (WS)"
                    style={{...inputStyle, fontFamily: DESIGN_SYSTEM.fonts.secondary}}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Short Description</label>
                  <Input 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Brief description (max 150 chars)"
                    style={inputStyle}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>
                    Long Description (Markdown supported)
                  </label>
                  <Textarea 
                    name="longDescription"
                    value={formData.longDescription}
                    onChange={handleChange}
                    placeholder="Detailed project description with markdown support"
                    rows={6}
                    style={inputStyle}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Logo URL</label>
                    <Input 
                      name="logoUrl"
                      value={formData.logoUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/logo.png"
                      style={inputStyle}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Banner URL</label>
                    <Input 
                      name="bannerUrl"
                      value={formData.bannerUrl}
                      onChange={handleChange}
                      placeholder="https://example.com/banner.png"
                      style={inputStyle}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Website URL</label>
                    <Input 
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                      placeholder="https://yourproject.com"
                      style={inputStyle}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Twitter URL</label>
                    <Input 
                      name="twitterUrl"
                      value={formData.twitterUrl}
                      onChange={handleChange}
                      placeholder="https://twitter.com/yourproject"
                      style={inputStyle}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Telegram URL</label>
                    <Input 
                      name="telegramUrl"
                      value={formData.telegramUrl}
                      onChange={handleChange}
                      placeholder="https://t.me/yourproject"
                      style={inputStyle}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Discord URL</label>
                    <Input 
                      name="discordUrl"
                      value={formData.discordUrl}
                      onChange={handleChange}
                      placeholder="https://discord.gg/yourproject"
                      style={inputStyle}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4 flex justify-end">
              <Button
                onClick={handleNextTab}
                disabled={!isCurrentTabValid()}
                style={buttonPrimaryStyle}
              >
                Next: Sale Structure
              </Button>
            </div>
          </TabsContent>
          
          {/* Sale Structure Tab */}
          <TabsContent value="structure">
            <Card style={cardStyle}>
              <CardHeader>
                <CardTitle style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Sale Structure</CardTitle>
                <CardDescription style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>
                  Define the economics of your token sale
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Price Per Token</label>
                    <div className="relative">
                      <Input 
                        name="pricePerToken"
                        type="number"
                        value={formData.pricePerToken}
                        onChange={handleChange}
                        placeholder="e.g., 0.1"
                        style={{...inputStyle, fontFamily: DESIGN_SYSTEM.fonts.secondary}}
                        className="pl-20"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none" style={{ color: DESIGN_SYSTEM.colors.secondaryText, fontFamily: DESIGN_SYSTEM.fonts.secondary }}>
                        WS
                      </div>
                    </div>
                    <p className="text-xs mt-1" style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>
                      The price per token in WS
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Max Raise Amount</label>
                    <div className="relative">
                      <Input 
                        name="maxRaiseAmount"
                        type="number"
                        value={formData.maxRaiseAmount}
                        onChange={handleChange}
                        placeholder="e.g., 100000"
                        style={{...inputStyle, fontFamily: DESIGN_SYSTEM.fonts.secondary}}
                        className="pl-20"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none" style={{ color: DESIGN_SYSTEM.colors.secondaryText, fontFamily: DESIGN_SYSTEM.fonts.secondary }}>
                        WS
                      </div>
                    </div>
                    <p className="text-xs mt-1" style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>
                      Hard cap for the total raise
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Min Allocation</label>
                    <div className="relative">
                      <Input 
                        name="minAllocation"
                        type="number"
                        value={formData.minAllocation}
                        onChange={handleChange}
                        placeholder="e.g., 100"
                        style={{...inputStyle, fontFamily: DESIGN_SYSTEM.fonts.secondary}}
                        className="pl-20"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none" style={{ color: DESIGN_SYSTEM.colors.secondaryText, fontFamily: DESIGN_SYSTEM.fonts.secondary }}>
                        TOKEN
                      </div>
                    </div>
                    <p className="text-xs mt-1" style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>
                      Minimum amount of tokens a user can purchase
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Max Allocation</label>
                    <div className="relative">
                      <Input 
                        name="maxAllocation"
                        type="number"
                        value={formData.maxAllocation}
                        onChange={handleChange}
                        placeholder="e.g., 5000"
                        style={{...inputStyle, fontFamily: DESIGN_SYSTEM.fonts.secondary}}
                        className="pl-20"
                      />
                      <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none" style={{ color: DESIGN_SYSTEM.colors.secondaryText, fontFamily: DESIGN_SYSTEM.fonts.secondary }}>
                        TOKEN
                      </div>
                    </div>
                    <p className="text-xs mt-1" style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>
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
                style={buttonOutlineStyle}
              >
                Back
              </Button>
              <Button
                onClick={handleNextTab}
                disabled={!isCurrentTabValid()}
                style={buttonPrimaryStyle}
              >
                Next: Timing
              </Button>
            </div>
          </TabsContent>
          
          {/* Timing Tab */}
          <TabsContent value="timing">
            <Card style={cardStyle}>
              <CardHeader>
                <CardTitle style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Sale Timing</CardTitle>
                <CardDescription style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>
                  Set the schedule for your presale and public sale
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Presale Start Date & Time</label>
                  <Input 
                    name="presaleStart"
                    type="datetime-local"
                    value={formData.presaleStart}
                    onChange={handleChange}
                    style={{...inputStyle, fontFamily: DESIGN_SYSTEM.fonts.secondary}}
                  />
                  <p className="text-xs mt-1" style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>
                    When the presale phase begins (only whitelisted users can contribute)
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Public Sale Start Date & Time</label>
                  <Input 
                    name="publicSaleStart"
                    type="datetime-local"
                    value={formData.publicSaleStart}
                    onChange={handleChange}
                    style={{...inputStyle, fontFamily: DESIGN_SYSTEM.fonts.secondary}}
                  />
                  <p className="text-xs mt-1" style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>
                    When the public sale phase begins (anyone can contribute)
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Sale End Date & Time</label>
                  <Input 
                    name="endTime"
                    type="datetime-local"
                    value={formData.endTime}
                    onChange={handleChange}
                    style={{...inputStyle, fontFamily: DESIGN_SYSTEM.fonts.secondary}}
                  />
                  <p className="text-xs mt-1" style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>
                    When the entire sale ends
                  </p>
                </div>
                
              </CardContent>
            </Card>
            
            <div className="mt-4 flex justify-between">
              <Button
                onClick={handlePrevTab}
                variant="outline"
                style={buttonOutlineStyle}
              >
                Back
              </Button>
              <Button
                onClick={handleNextTab}
                disabled={!isCurrentTabValid()}
                style={buttonPrimaryStyle}
              >
                Next: Whitelist
              </Button>
            </div>
          </TabsContent>
          
          {/* Whitelist Tab */}
          <TabsContent value="whitelist">
            <Card style={cardStyle}>
              <CardHeader>
                <CardTitle style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Presale Whitelist</CardTitle>
                <CardDescription style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>
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
                    className="rounded"
                  />
                  <label htmlFor="enablePresale" className="text-sm font-medium" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>
                    Enable presale phase with whitelist
                  </label>
                </div>
                
                {formData.enablePresale && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-1" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Merkle Root</label>
                      <Input 
                        name="merkleRoot"
                        value={formData.merkleRoot}
                        onChange={handleChange}
                        placeholder="e.g., 0x1234..."
                        style={{...inputStyle, fontFamily: DESIGN_SYSTEM.fonts.secondary}}
                      />
                      <p className="text-xs mt-1" style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>
                        The merkle root of your whitelist addresses
                      </p>
                    </div>
                    
                    <div style={{ background: DESIGN_SYSTEM.colors.primaryBackground }} className="p-4 rounded-md">
                      <h4 className="font-medium mb-2" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Generating a Merkle Root</h4>
                      <p className="text-sm mb-2" style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>
                        To generate a merkle root:
                      </p>
                      <ol className="text-sm list-decimal ml-5 space-y-1" style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>
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
                style={buttonOutlineStyle}
              >
                Back
              </Button>
              <Button
                onClick={handleNextTab}
                disabled={!isCurrentTabValid()}
                style={buttonPrimaryStyle}
              >
                Next: Wallets & Fees
              </Button>
            </div>
          </TabsContent>
          
          {/* Wallets Tab */}
          <TabsContent value="wallets">
            <Card style={cardStyle}>
              <CardHeader>
                <CardTitle style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Wallets & Fees</CardTitle>
                <CardDescription style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>
                  Configure wallet addresses and fee settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Raise Owner Wallet</label>
                  <Input 
                    name="ownerWallet"
                    value={formData.ownerWallet}
                    onChange={handleChange}
                    placeholder="e.g., 0x1234..."
                    style={{...inputStyle, fontFamily: DESIGN_SYSTEM.fonts.secondary}}
                  />
                  <p className="text-xs mt-1" style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>
                    The wallet that will control the raise (can finalize, cancel, sweep)
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Fee Recipient</label>
                  <Input 
                    name="feeRecipient"
                    value={formData.feeRecipient}
                    onChange={handleChange}
                    placeholder="e.g., 0x1234..."
                    style={{...inputStyle, fontFamily: DESIGN_SYSTEM.fonts.secondary}}
                  />
                  <p className="text-xs mt-1" style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>
                    The wallet that will receive the platform fee
                  </p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Fee (Basis Points)</label>
                  <div className="relative">
                    <Input 
                      name="feeBps"
                      type="number"
                      value={formData.feeBps}
                      onChange={handleChange}
                      placeholder="e.g., 250"
                      style={{...inputStyle, fontFamily: DESIGN_SYSTEM.fonts.secondary}}
                      className="pr-16"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none" style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>
                      BPS
                    </div>
                  </div>
                  <p className="text-xs mt-1" style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>
                    The platform fee in basis points (100 BPS = 1%)
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4 flex justify-between">
              <Button
                onClick={handlePrevTab}
                variant="outline"
                style={buttonOutlineStyle}
              >
                Back
              </Button>
              <Button
                onClick={handleNextTab}
                disabled={!isCurrentTabValid()}
                style={buttonPrimaryStyle}
              >
                Next: Review
              </Button>
            </div>
          </TabsContent>
          
          {/* Review Tab */}
          <TabsContent value="review">
            <Card style={cardStyle}>
              <CardHeader>
                <CardTitle style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Review & Deploy</CardTitle>
                <CardDescription style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>
                  Review your raise configuration before deployment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div style={{ background: DESIGN_SYSTEM.colors.primaryBackground }} className="p-4 rounded-md">
                    <h4 className="font-medium mb-2" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Basic Information</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>Project Name:</span>
                        <span style={{ color: DESIGN_SYSTEM.colors.primaryText }}>{formData.projectName}</span>
                      </li>
                      <li className="flex justify-between">
                        <span style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>Token Address:</span>
                        <span style={{ color: DESIGN_SYSTEM.colors.primaryText, fontFamily: DESIGN_SYSTEM.fonts.secondary }} className="truncate max-w-[280px]">{formData.tokenAddress}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div style={{ background: DESIGN_SYSTEM.colors.primaryBackground }} className="p-4 rounded-md">
                    <h4 className="font-medium mb-2" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Sale Structure</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>Price Per Token:</span>
                        <span style={{ color: DESIGN_SYSTEM.colors.primaryText }}>{formData.pricePerToken} WS</span>
                      </li>
                      <li className="flex justify-between">
                        <span style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>Max Raise Amount:</span>
                        <span style={{ color: DESIGN_SYSTEM.colors.primaryText }}>{formData.maxRaiseAmount} WS</span>
                      </li>
                      <li className="flex justify-between">
                        <span style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>Min/Max Allocation:</span>
                        <span style={{ color: DESIGN_SYSTEM.colors.primaryText }}>{formData.minAllocation} / {formData.maxAllocation} tokens</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div style={{ background: DESIGN_SYSTEM.colors.primaryBackground }} className="p-4 rounded-md">
                    <h4 className="font-medium mb-2" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Timing</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>Presale Start:</span>
                        <span style={{ color: DESIGN_SYSTEM.colors.primaryText }}>{new Date(formData.presaleStart).toLocaleString()}</span>
                      </li>
                      <li className="flex justify-between">
                        <span style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>Public Sale Start:</span>
                        <span style={{ color: DESIGN_SYSTEM.colors.primaryText }}>{new Date(formData.publicSaleStart).toLocaleString()}</span>
                      </li>
                      <li className="flex justify-between">
                        <span style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>End Time:</span>
                        <span style={{ color: DESIGN_SYSTEM.colors.primaryText }}>{new Date(formData.endTime).toLocaleString()}</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div style={{ background: DESIGN_SYSTEM.colors.primaryBackground }} className="p-4 rounded-md">
                    <h4 className="font-medium mb-2" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Wallets & Fees</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>Owner:</span>
                        <span style={{ color: DESIGN_SYSTEM.colors.primaryText, fontFamily: DESIGN_SYSTEM.fonts.secondary }} className="truncate max-w-[280px]">{formData.ownerWallet}</span>
                      </li>
                      <li className="flex justify-between">
                        <span style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>Fee Recipient:</span>
                        <span style={{ color: DESIGN_SYSTEM.colors.primaryText, fontFamily: DESIGN_SYSTEM.fonts.secondary }} className="truncate max-w-[280px]">{formData.feeRecipient}</span>
                      </li>
                      <li className="flex justify-between">
                        <span style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>Fee:</span>
                        <span style={{ color: DESIGN_SYSTEM.colors.primaryText }}>{(parseFloat(formData.feeBps) / 100).toFixed(2)}%</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div style={{ background: DESIGN_SYSTEM.colors.primaryBackground }} className="p-4 rounded-md">
                    <h4 className="font-medium mb-2" style={{ color: DESIGN_SYSTEM.colors.primaryText }}>Whitelist</h4>
                    <ul className="space-y-1 text-sm">
                      <li className="flex justify-between">
                        <span style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>Presale Enabled:</span>
                        <span style={{ color: DESIGN_SYSTEM.colors.primaryText }}>{formData.enablePresale ? 'Yes' : 'No'}</span>
                      </li>
                      {formData.enablePresale && (
                        <li className="flex justify-between">
                          <span style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>Merkle Root:</span>
                          <span style={{ color: DESIGN_SYSTEM.colors.primaryText, fontFamily: DESIGN_SYSTEM.fonts.secondary }} className="truncate max-w-[200px]">{formData.merkleRoot}</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="w-full py-6 text-lg"
                    style={buttonPrimaryStyle}
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
                
                <p className="mt-4 text-center text-sm" style={{ color: DESIGN_SYSTEM.colors.secondaryText }}>
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
                style={buttonOutlineStyle}
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
