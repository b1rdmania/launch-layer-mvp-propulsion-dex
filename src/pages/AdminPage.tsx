import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWallet } from "@/contexts/WalletContext";
import { createRaise } from "@/contracts/contractService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { DESIGN_SYSTEM, CONTRACT_ADDRESSES } from "@/contracts/config";
import { ethers } from "ethers";
import { Check, Info, ChevronRight, ChevronLeft } from "lucide-react";

const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { address, isConnected, connect } = useWallet();

  const [activeTab, setActiveTab] = useState("basic");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  // Form state
  const [formData, setFormData] = useState({
    // Basic info
    projectName: "SampleToken",
    tokenAddress: "",
    acceptedTokenAddress: CONTRACT_ADDRESSES.ACCEPTED_TOKEN, // Default to WS
    description: "",
    longDescription: "",

    // Sale structure
    pricePerToken: "",
    maxRaiseAmount: "",
    minAllocation: "",
    maxAllocation: "",

    // Timing
    presaleStart: "",
    publicSaleStart: "",
    endTime: "",

    // Whitelist
    enablePresale: false,
    merkleRoot: "",

    // Wallets and fees
    ownerWallet: "",
    feeRecipient: "",
    feeBps: "250", // Default 2.5%

    // URLs
    logoUrl: "",
    bannerUrl: "",
    websiteUrl: "",
    twitterUrl: "",
    telegramUrl: "",
    discordUrl: "",
  });

  // Step metadata for the stepper
  const steps = [
    { id: "basic", label: "Basic", description: "Project & token details" },
    { id: "structure", label: "Structure", description: "Sale economics & allocation" },
    { id: "timing", label: "Timing", description: "Schedule & deadlines" },
    { id: "whitelist", label: "Whitelist", description: "Access control" },
    { id: "wallets", label: "Wallets", description: "Recipient addresses" },
    { id: "review", label: "Review", description: "Deploy sale" },
  ];

  // Update form data
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle checkbox changes
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // Handle tab navigation
  const handleNextTab = () => {
    // Mark current step as completed
    setCompletedSteps(prev => ({
      ...prev,
      [activeTab]: true
    }));

    if (activeTab === "basic") setActiveTab("structure");
    else if (activeTab === "structure") setActiveTab("timing");
    else if (activeTab === "timing") setActiveTab("whitelist");
    else if (activeTab === "whitelist") setActiveTab("wallets");
    else if (activeTab === "wallets") setActiveTab("review");
    
    // Scroll to top
    window.scrollTo(0, 0);
  };

  const handlePrevTab = () => {
    if (activeTab === "structure") setActiveTab("basic");
    else if (activeTab === "timing") setActiveTab("structure");
    else if (activeTab === "whitelist") setActiveTab("timing");
    else if (activeTab === "wallets") setActiveTab("whitelist");
    else if (activeTab === "review") setActiveTab("wallets");
    
    // Scroll to top
    window.scrollTo(0, 0);
  };

  // Navigate directly to a step if it's completed or the current one
  const handleStepClick = (stepId: string) => {
    // Allow navigation to any step without validation
    setActiveTab(stepId);
    window.scrollTo(0, 0);
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Convert date strings to timestamps using standard JS Date
      const presaleDate = new Date(formData.presaleStart);
      const publicSaleDate = new Date(formData.publicSaleStart);
      const endDate = new Date(formData.endTime);

      // Convert to Unix timestamps (seconds) as BigInt to ensure numeric safety
      const presaleStartTime = Math.floor(presaleDate.getTime() / 1000);
      const publicSaleStartTime = Math.floor(publicSaleDate.getTime() / 1000);
      const endTimeStamp = Math.floor(endDate.getTime() / 1000);

      // Create the raise with BigInt timestamps
      const raiseAddress = await createRaise({
        token: formData.tokenAddress,
        acceptedToken: formData.acceptedTokenAddress,
        pricePerToken: formData.pricePerToken,
        presaleStart: presaleStartTime,
        publicSaleStart: publicSaleStartTime,
        endTime: endTimeStamp,
        merkleRoot: formData.merkleRoot || ethers.ZeroHash,
        raiseOwner: formData.ownerWallet,
        feeRecipient: formData.feeRecipient,
        feePercentBasisPoints: parseInt(formData.feeBps),
        maxAcceptedTokenRaise: formData.maxRaiseAmount,
        minTokenAllocation: formData.minAllocation,
        maxTokenAllocation: formData.maxAllocation,
        metadata: {
          logoUrl: formData.logoUrl,
          name: formData.projectName,
          tokenSymbol: formData.tokenAddress,
          description: formData.description,
          longDescription: formData.longDescription,
          bannerUrl: formData.bannerUrl,
          websiteUrl: formData.websiteUrl,
          socialLinks: {
            twitter: formData.twitterUrl,
            telegram: formData.telegramUrl,
            discord: formData.discordUrl,
          },
        },
      });

      toast.success(`Raise created successfully! Address: ${raiseAddress}`);
      // Redirect to the newly created raise
      navigate(`/raise/${raiseAddress}`);
    } catch (error) {
      console.error("Error creating raise:", error);
      toast.error("Failed to create raise");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get current step number (1-indexed)
  const getCurrentStepNumber = () => {
    return steps.findIndex(step => step.id === activeTab) + 1;
  };

  // Get current step description
  const getCurrentStepDescription = () => {
    const step = steps.find(step => step.id === activeTab);
    return step?.description || '';
  };

  // Render step status (active, completed, inactive)
  const getStepButtonVariant = (stepId: string) => {
    if (stepId === activeTab) return "stepActive";
    if (completedSteps[stepId]) return "stepCompleted";
    return "stepInactive";
  };

  return (
    <div
      className="container mx-auto px-4 md:px-8 py-8 max-w-[1280px] font-satoshi"
    >
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-launchlayer-text-primary">
          Create New Raise
        </h1>
        
        <div className="mb-8">
          <p className="text-launchlayer-violet font-medium">
            Step {getCurrentStepNumber()} of {steps.length} — {steps.find(s => s.id === activeTab)?.label}
          </p>
          <p className="text-launchlayer-mint">
            {getCurrentStepDescription()}
          </p>
        </div>

        {/* Step navigation (desktop) */}
        <div className="hidden md:flex mb-8 justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <Button
                variant={getStepButtonVariant(step.id)}
                onClick={() => handleStepClick(step.id)}
                className="relative"
              >
                {completedSteps[step.id] && <Check size={16} className="mr-1" />}
                {index + 1}. {step.label}
              </Button>
              {index < steps.length - 1 && (
                <div className="h-[1px] w-8 bg-gray-600 mx-1"></div>
              )}
            </div>
          ))}
        </div>

        {/* Step navigation (mobile) */}
        <div className="flex md:hidden mb-6 overflow-x-auto pb-2 gap-2">
          {steps.map((step, index) => (
            <Button
              key={step.id}
              variant={getStepButtonVariant(step.id)}
              onClick={() => handleStepClick(step.id)}
              className="whitespace-nowrap"
            >
              {completedSteps[step.id] && <Check size={16} />}
              {index + 1}
            </Button>
          ))}
        </div>

        <div className="space-y-6">
          {/* Basic Info Tab */}
          {activeTab === "basic" && (
            <div className="animate-fade-in">
              <Card className="bg-launchlayer-surface border-gray-700 shadow-md mb-6">
                <CardHeader>
                  <CardTitle className="text-launchlayer-violet flex items-center gap-2">
                    <Info size={18} />
                    Basic Information
                  </CardTitle>
                  <CardDescription>
                    Enter the core details about your project and token
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Project Name
                    </label>
                    <Input
                      name="projectName"
                      value={formData.projectName}
                      onChange={handleChange}
                      placeholder="e.g., SampleToken DEX"
                      className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-violet focus:ring-1 focus:ring-launchlayer-violet"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Token Address
                    </label>
                    <Input
                      name="tokenAddress"
                      value={formData.tokenAddress}
                      onChange={handleChange}
                      placeholder="e.g., 0x1234..."
                      className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-violet focus:ring-1 focus:ring-launchlayer-violet font-mono"
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
                      className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-violet focus:ring-1 focus:ring-launchlayer-violet font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Short Description
                    </label>
                    <Input
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Brief description (max 150 chars)"
                      className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-violet focus:ring-1 focus:ring-launchlayer-violet"
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
                      className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-violet focus:ring-1 focus:ring-launchlayer-violet"
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-launchlayer-surface border-gray-700 shadow-md mb-6">
                <CardHeader>
                  <CardTitle className="text-launchlayer-violet flex items-center gap-2">
                    <Info size={18} />
                    Project Links
                  </CardTitle>
                  <CardDescription>
                    Add external resources and social links
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Logo URL
                      </label>
                      <Input
                        name="logoUrl"
                        value={formData.logoUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/logo.png"
                        className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-violet focus:ring-1 focus:ring-launchlayer-violet"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Banner URL
                      </label>
                      <Input
                        name="bannerUrl"
                        value={formData.bannerUrl}
                        onChange={handleChange}
                        placeholder="https://example.com/banner.png"
                        className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-violet focus:ring-1 focus:ring-launchlayer-violet"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Website URL
                      </label>
                      <Input
                        name="websiteUrl"
                        value={formData.websiteUrl}
                        onChange={handleChange}
                        placeholder="https://yourproject.com"
                        className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-violet focus:ring-1 focus:ring-launchlayer-violet"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Twitter URL
                      </label>
                      <Input
                        name="twitterUrl"
                        value={formData.twitterUrl}
                        onChange={handleChange}
                        placeholder="https://twitter.com/yourproject"
                        className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-violet focus:ring-1 focus:ring-launchlayer-violet"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Telegram URL
                      </label>
                      <Input
                        name="telegramUrl"
                        value={formData.telegramUrl}
                        onChange={handleChange}
                        placeholder="https://t.me/yourproject"
                        className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-violet focus:ring-1 focus:ring-launchlayer-violet"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Discord URL
                      </label>
                      <Input
                        name="discordUrl"
                        value={formData.discordUrl}
                        onChange={handleChange}
                        placeholder="https://discord.gg/yourproject"
                        className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-violet focus:ring-1 focus:ring-launchlayer-violet"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 flex justify-end sticky bottom-0 pt-4 pb-6 bg-gradient-to-t from-launchlayer-background to-transparent md:static md:bg-none">
                <Button
                  onClick={handleNextTab}
                  variant="accent"
                  size="wide"
                  className="flex items-center gap-2"
                >
                  Next Step
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          )}

          {/* Sale Structure Tab */}
          {activeTab === "structure" && (
            <div className="animate-fade-in">
              <Card className="bg-launchlayer-surface border-gray-700 shadow-md mb-6">
                <CardHeader>
                  <CardTitle className="text-launchlayer-violet flex items-center gap-2">
                    <Info size={18} />
                    Sale Structure
                  </CardTitle>
                  <CardDescription>
                    Define the economics of your token sale
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Price Per Token
                      </label>
                      <div className="relative">
                        <Input
                          name="pricePerToken"
                          type="number"
                          value={formData.pricePerToken}
                          onChange={handleChange}
                          placeholder="e.g., 0.1"
                          className="pl-20 bg-launchlayer-background border-gray-700 focus:border-launchlayer-violet focus:ring-1 focus:ring-launchlayer-violet font-mono"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-gray-400 font-mono">
                          WS
                        </div>
                      </div>
                      <p className="text-xs mt-1 text-gray-400">
                        The price per token in WS
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Max Raise Amount
                      </label>
                      <div className="relative">
                        <Input
                          name="maxRaiseAmount"
                          type="number"
                          value={formData.maxRaiseAmount}
                          onChange={handleChange}
                          placeholder="e.g., 100000"
                          className="pl-20 bg-launchlayer-background border-gray-700 focus:border-launchlayer-violet focus:ring-1 focus:ring-launchlayer-violet font-mono"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-gray-400 font-mono">
                          WS
                        </div>
                      </div>
                      <p className="text-xs mt-1 text-gray-400">
                        Hard cap for the total raise
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Min Allocation
                      </label>
                      <div className="relative">
                        <Input
                          name="minAllocation"
                          type="number"
                          value={formData.minAllocation}
                          onChange={handleChange}
                          placeholder="e.g., 100"
                          className="pl-20 bg-launchlayer-background border-gray-700 focus:border-launchlayer-violet focus:ring-1 focus:ring-launchlayer-violet font-mono"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-gray-400 font-mono">
                          TOKEN
                        </div>
                      </div>
                      <p className="text-xs mt-1 text-gray-400">
                        Minimum amount of tokens a user can purchase
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Max Allocation
                      </label>
                      <div className="relative">
                        <Input
                          name="maxAllocation"
                          type="number"
                          value={formData.maxAllocation}
                          onChange={handleChange}
                          placeholder="e.g., 5000"
                          className="pl-20 bg-launchlayer-background border-gray-700 focus:border-launchlayer-violet focus:ring-1 focus:ring-launchlayer-violet font-mono"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center px-3 pointer-events-none text-gray-400 font-mono">
                          TOKEN
                        </div>
                      </div>
                      <p className="text-xs mt-1 text-gray-400">
                        Maximum amount of tokens a user can purchase
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 flex justify-between sticky bottom-0 pt-4 pb-6 bg-gradient-to-t from-launchlayer-background to-transparent md:static md:bg-none">
                <Button
                  onClick={handlePrevTab}
                  variant="back"
                  size="wide"
                  className="flex items-center gap-2"
                >
                  <ChevronLeft size={16} />
                  Back
                </Button>
                <Button
                  onClick={handleNextTab}
                  variant="accent"
                  size="wide"
                  className="flex items-center gap-2"
                >
                  Next Step
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          )}

          {/* Timing Tab */}
          {activeTab === "timing" && (
            <div className="animate-fade-in">
              <Card className="bg-launchlayer-surface border-gray-700 shadow-md mb-6">
                <CardHeader>
                  <CardTitle className="text-launchlayer-violet flex items-center gap-2">
                    <Info size={18} />
                    Sale Timing
                  </CardTitle>
                  <CardDescription>
                    Set the schedule for your presale and public sale
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Presale Start Date & Time
                    </label>
                    <Input
                      name="presaleStart"
                      type="datetime-local"
                      value={formData.presaleStart}
                      onChange={handleChange}
                      className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-violet focus:ring-1 focus:ring-launchlayer-violet font-mono"
                    />
                    <p className="text-xs mt-1 text-gray-400">
                      When the presale phase begins (only whitelisted users can
                      contribute)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Public Sale Start Date & Time
                    </label>
                    <Input
                      name="publicSaleStart"
                      type="datetime-local"
                      value={formData.publicSaleStart}
                      onChange={handleChange}
                      className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-violet focus:ring-1 focus:ring-launchlayer-violet font-mono"
                    />
                    <p className="text-xs mt-1 text-gray-400">
                      When the public sale phase begins (anyone can contribute)
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Sale End Date & Time
                    </label>
                    <Input
                      name="endTime"
                      type="datetime-local"
                      value={formData.endTime}
                      onChange={handleChange}
                      className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-violet focus:ring-1 focus:ring-launchlayer-violet font-mono"
                    />
                    <p className="text-xs mt-1 text-gray-400">
                      When the entire sale ends
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 flex justify-between sticky bottom-0 pt-4 pb-6 bg-gradient-to-t from-launchlayer-background to-transparent md:static md:bg-none">
                <Button
                  onClick={handlePrevTab}
                  variant="back"
                  size="wide"
                  className="flex items-center gap-2"
                >
                  <ChevronLeft size={16} />
                  Back
                </Button>
                <Button
                  onClick={handleNextTab}
                  variant="accent"
                  size="wide"
                  className="flex items-center gap-2"
                >
                  Next Step
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          )}

          {/* Whitelist Tab */}
          {activeTab === "whitelist" && (
            <div className="animate-fade-in">
              <Card className="bg-launchlayer-surface border-gray-700 shadow-md mb-6">
                <CardHeader>
                  <CardTitle className="text-launchlayer-violet flex items-center gap-2">
                    <Info size={18} />
                    Presale Whitelist
                  </CardTitle>
                  <CardDescription>
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
                      className="rounded bg-launchlayer-background border-gray-700"
                    />
                    <label
                      htmlFor="enablePresale"
                      className="text-sm font-medium"
                    >
                      Enable presale phase with whitelist
                    </label>
                  </div>

                  {formData.enablePresale && (
                    <>
                      <div>
                        <label
                          className="block text-sm font-medium mb-1"
                        >
                          Merkle Root
                        </label>
                        <Input
                          name="merkleRoot"
                          value={formData.merkleRoot}
                          onChange={handleChange}
                          placeholder="e.g., 0x1234..."
                          className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-violet focus:ring-1 focus:ring-launchlayer-violet font-mono"
                        />
                        <p
                          className="text-xs mt-1 text-gray-400"
                        >
                          The merkle root of your whitelist addresses
                        </p>
                      </div>

                      <div
                        className="p-4 rounded-md bg-launchlayer-background border-l-2 border-launchlayer-violet"
                      >
                        <h4
                          className="font-medium mb-2"
                        >
                          Generating a Merkle Root
                        </h4>
                        <p
                          className="text-sm mb-2 text-gray-400"
                        >
                          To generate a merkle root:
                        </p>
                        <ol
                          className="text-sm list-decimal ml-5 space-y-1 text-gray-400"
                        >
                          <li>
                            Prepare a CSV file with all whitelisted addresses
                          </li>
                          <li>
                            Use the whitelist tool to generate the merkle root
                          </li>
                          <li>Paste the generated merkle root above</li>
                        </ol>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              <div className="mt-8 flex justify-between sticky bottom-0 pt-4 pb-6 bg-gradient-to-t from-launchlayer-background to-transparent md:static md:bg-none">
                <Button
                  onClick={handlePrevTab}
                  variant="back"
                  size="wide"
                  className="flex items-center gap-2"
                >
                  <ChevronLeft size={16} />
                  Back
                </Button>
                <Button
                  onClick={handleNextTab}
                  variant="accent"
                  size="wide"
                  className="flex items-center gap-2"
                >
                  Next Step
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          )}

          {/* Wallets Tab */}
          {activeTab === "wallets" && (
            <div className="animate-fade-in">
              <Card className="bg-launchlayer-surface border-gray-700 shadow-md mb-6">
                <CardHeader>
                  <CardTitle className="text-launchlayer-violet flex items-center gap-2">
                    <Info size={18} />
                    Wallets & Fees
                  </CardTitle>
                  <CardDescription>
                    Configure wallet addresses and fee settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                    >
                      Raise Owner Wallet
                    </label>
                    <Input
                      name="ownerWallet"
                      value={formData.ownerWallet}
                      onChange={handleChange}
                      placeholder="e.g., 0x1234..."
                      className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-violet focus:ring-1 focus:ring-launchlayer-violet font-mono"
                    />
                    <p
                      className="text-xs mt-1 text-gray-400"
                    >
                      The wallet that will control the raise (can finalize,
                      cancel, sweep)
                    </p>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                    >
                      Fee Recipient
                    </label>
                    <Input
                      name="feeRecipient"
                      value={formData.feeRecipient}
                      onChange={handleChange}
                      placeholder="e.g., 0x1234..."
                      className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-violet focus:ring-1 focus:ring-launchlayer-violet font-mono"
                    />
                    <p
                      className="text-xs mt-1 text-gray-400"
                    >
                      The wallet that will receive the platform fee
                    </p>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                    >
                      Fee (Basis Points)
                    </label>
                    <div className="relative">
                      <Input
                        name="feeBps"
                        type="number"
                        value={formData.feeBps}
                        onChange={handleChange}
                        placeholder="e.g., 250"
                        className="pr-16 bg-launchlayer-background border-gray-700 focus:border-launchlayer-violet focus:ring-1 focus:ring-launchlayer-violet font-mono"
                      />
                      <div
                        className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400"
                      >
                        BPS
                      </div>
                    </div>
                    <p
                      className="text-xs mt-1 text-gray-400"
                    >
                      The platform fee in basis points (100 BPS = 1%)
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 flex justify-between sticky bottom-0 pt-4 pb-6 bg-gradient-to-t from-launchlayer-background to-transparent md:static md:bg-none">
                <Button
                  onClick={handlePrevTab}
                  variant="back"
                  size="wide"
                  className="flex items-center gap-2"
                >
                  <ChevronLeft size={16} />
                  Back
                </Button>
                <Button
                  onClick={handleNextTab}
                  variant="accent"
                  size="wide"
                  className="flex items-center gap-2"
                >
                  Review
                  <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          )}

          {/* Review Tab */}
          {activeTab === "review" && (
            <div className="animate-fade-in">
              <Card className="bg-launchlayer-surface border-gray-700 shadow-md mb-6 border-t-2 border-t-launchlayer-violet">
                <CardHeader>
                  <CardTitle className="text-launchlayer-violet flex items-center gap-2">
                    <Info size={18} />
                    Review & Deploy
                  </CardTitle>
                  <CardDescription>
                    Review your raise configuration before deployment
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="p-4 rounded-md bg-launchlayer-background">
                      <h4 className="font-medium mb-2 text-launchlayer-violet">
                        Basic Information
                      </h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex justify-between">
                          <span className="text-gray-400">
                            Project Name:
                          </span>
                          <span>
                            {formData.projectName || "SampleToken"}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-400">
                            Token Address:
                          </span>
                          <span className="truncate max-w-[280px]
