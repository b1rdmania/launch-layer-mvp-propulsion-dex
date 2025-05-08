import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useWallet } from "@/contexts/WalletContext";
import { CheckCircle2, CircleCheck, Clock, UploadCloud } from "lucide-react";
import { createRaise } from "@/contracts/contractService";
import { toast } from "sonner";
import { DESIGN_SYSTEM } from "@/contracts/config";

// Define a schema for form validation using Zod
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Project name must be at least 2 characters.",
  }),
  tokenAddress: z.string().startsWith("0x", {
    message: "Must be a valid Ethereum address.",
  }),
  tokenSymbol: z.string().min(1, {
    message: "Token symbol must be at least 1 character.",
  }),
  description: z.string().max(500, {
    message: "Description must be less than 500 characters.",
  }),
  pricePerToken: z.string().refine(
    (value) => {
      try {
        // Attempt to convert the value to a number
        const numValue = Number(value);
        // Check if the conversion is successful and the number is positive
        return !isNaN(numValue) && numValue > 0;
      } catch (error) {
        return false;
      }
    },
    {
      message: "Price per token must be a valid positive number.",
    },
  ),
  totalTokens: z.string().refine(
    (value) => {
      try {
        // Attempt to convert the value to a number
        const numValue = Number(value);
        // Check if the conversion is successful and the number is positive
        return !isNaN(numValue) && numValue > 0;
      } catch (error) {
        return false;
      }
    },
    {
      message: "Total tokens must be a valid positive number.",
    },
  ),
  softCap: z.string().optional(),
  hardCap: z.string().refine(
    (value) => {
      try {
        // Attempt to convert the value to a number
        const numValue = Number(value);
        // Check if the conversion is successful and the number is positive
        return !isNaN(numValue) && numValue > 0;
      } catch (error) {
        return false;
      }
    },
    {
      message: "Hard cap must be a valid positive number.",
    },
  ),
  minContribution: z.string().optional(),
  maxContribution: z.string().optional(),
  durationInDays: z.string().refine(
    (value) => {
      try {
        // Attempt to convert the value to a number
        const numValue = Number(value);
        // Check if the conversion is successful and the number is an integer
        return !isNaN(numValue) && Number.isInteger(numValue) && numValue > 0;
      } catch (error) {
        return false;
      }
    },
    {
      message: "Duration must be a valid positive integer.",
    },
  ),
  whitelist: z.array(z.string()).optional(),
  paymentAddress: z.string().optional(),
  websiteUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  telegramUrl: z.string().optional(),
  discordUrl: z.string().optional(),
});

// Define a type for the form values based on the schema
type FormValues = z.infer<typeof formSchema>;

const AdminPage: React.FC = () => {
  // State for the active tab
  const [activeTab, setActiveTab] = useState("basic");
  const { toast: hookToast } = useToast();
  const { address, isConnected, balance, network, connect } = useWallet();

  // Form data state
  const [formData, setFormData] = useState({
    name: "",
    tokenAddress: "",
    tokenSymbol: "",
    description: "",
    pricePerToken: "",
    totalTokens: "",
    softCap: "",
    hardCap: "",
    minContribution: "",
    maxContribution: "",
    durationInDays: "",
    whitelist: [] as string[],
    paymentAddress: "",
    websiteUrl: "",
    twitterUrl: "",
    telegramUrl: "",
    discordUrl: "",
  });

  // Update form data
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (
      !formData.name ||
      !formData.tokenAddress ||
      !formData.tokenSymbol ||
      !formData.description ||
      !formData.pricePerToken ||
      !formData.totalTokens ||
      !formData.hardCap ||
      !formData.durationInDays
    ) {
      toast.error("Please fill in all required fields", {
        style: {
          background: DESIGN_SYSTEM.colors.secondaryBackground,
          color: DESIGN_SYSTEM.colors.primaryText,
          border: `1px solid ${DESIGN_SYSTEM.colors.secondaryText}`,
        },
      });
      return;
    }

    // Check if wallet is connected
    if (!isConnected) {
      toast.error("Please connect your wallet to continue", {
        style: {
          background: DESIGN_SYSTEM.colors.secondaryBackground,
          color: DESIGN_SYSTEM.colors.primaryText,
          border: `1px solid ${DESIGN_SYSTEM.colors.secondaryText}`,
        },
      });
      return;
    }

    try {
      // Show loading notification
      toast.loading("Creating your raise...", {
        id: "create-raise",
        style: {
          background: DESIGN_SYSTEM.colors.secondaryBackground,
          color: DESIGN_SYSTEM.colors.primaryText,
          border: `1px solid ${DESIGN_SYSTEM.colors.secondaryText}`,
        },
      });

      // Create raise
      const result = await createRaise({
        tokenAddress: formData.tokenAddress,
        tokenSymbol: formData.tokenSymbol,
        name: formData.name,
        description: formData.description,
        pricePerToken: formData.pricePerToken,
        totalTokens: formData.totalTokens,
        softCap: formData.softCap,
        hardCap: formData.hardCap,
        minContribution: formData.minContribution,
        maxContribution: formData.maxContribution,
        durationInDays: formData.durationInDays,
        whitelist: formData.whitelist,
        paymentAddress: formData.paymentAddress || address,
      });

      toast.dismiss("create-raise");

      if (result.success) {
        toast.success("Raise created successfully!", {
          style: {
            background: DESIGN_SYSTEM.colors.secondaryBackground,
            color: DESIGN_SYSTEM.colors.primaryText,
            border: `1px solid ${DESIGN_SYSTEM.colors.secondaryText}`,
          },
        });
        // Reset form data
        setFormData({
          name: "",
          tokenAddress: "",
          tokenSymbol: "",
          description: "",
          pricePerToken: "",
          totalTokens: "",
          softCap: "",
          hardCap: "",
          minContribution: "",
          maxContribution: "",
          durationInDays: "",
          whitelist: [],
          paymentAddress: "",
          websiteUrl: "",
          twitterUrl: "",
          telegramUrl: "",
          discordUrl: "",
        });
      } else {
        toast.error(result.error || "Failed to create raise", {
          style: {
            background: DESIGN_SYSTEM.colors.secondaryBackground,
            color: DESIGN_SYSTEM.colors.primaryText,
            border: `1px solid ${DESIGN_SYSTEM.colors.secondaryText}`,
          },
        });
      }
    } catch (error) {
      toast.dismiss("create-raise");
      toast.error("An error occurred while creating your raise", {
        style: {
          background: DESIGN_SYSTEM.colors.secondaryBackground,
          color: DESIGN_SYSTEM.colors.primaryText,
          border: `1px solid ${DESIGN_SYSTEM.colors.secondaryText}`,
        },
      });
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-launchlayer-background">
      <div className="container px-4 pt-8 pb-16 mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-launchlayer-text-primary font-satoshi">
            Create a New Sale
          </h1>
          <p className="text-launchlayer-text-secondary">
            Launch your token with a simple, transparent, and user-friendly
            interface
          </p>
        </div>

        {/* Step navigation */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-2 md:gap-4 overflow-x-auto py-2 px-4 rounded-xl bg-launchlayer-surface">
            <button
              onClick={() => handleTabChange("basic")}
              className={`px-4 py-2 rounded-full text-sm transition-all flex items-center gap-1.5 font-medium ${
                activeTab === "basic"
                  ? "bg-launchlayer-accent text-white"
                  : activeTab === "structure" ||
                    activeTab === "timing" ||
                    activeTab === "whitelist" ||
                    activeTab === "wallets" ||
                    activeTab === "review"
                  ? "bg-launchlayer-violet/20 text-launchlayer-violet border border-launchlayer-violet"
                  : "border border-gray-700 text-launchlayer-text-secondary hover:bg-launchlayer-surface-light"
              }`}
            >
              {activeTab === "structure" ||
              activeTab === "timing" ||
              activeTab === "whitelist" ||
              activeTab === "wallets" ||
              activeTab === "review" ? (
                <CircleCheck className="h-4 w-4" />
              ) : (
                "1"
              )}
              <span className="hidden sm:inline">Basic</span>
            </button>

            <button
              onClick={() => handleTabChange("structure")}
              className={`px-4 py-2 rounded-full text-sm transition-all flex items-center gap-1.5 font-medium ${
                activeTab === "structure"
                  ? "bg-launchlayer-accent text-white"
                  : activeTab === "timing" ||
                    activeTab === "whitelist" ||
                    activeTab === "wallets" ||
                    activeTab === "review"
                  ? "bg-launchlayer-violet/20 text-launchlayer-violet border border-launchlayer-violet"
                  : "border border-gray-700 text-launchlayer-text-secondary hover:bg-launchlayer-surface-light"
              }`}
            >
              {activeTab === "timing" ||
              activeTab === "whitelist" ||
              activeTab === "wallets" ||
              activeTab === "review" ? (
                <CircleCheck className="h-4 w-4" />
              ) : (
                "2"
              )}
              <span className="hidden sm:inline">Structure</span>
            </button>

            <button
              onClick={() => handleTabChange("timing")}
              className={`px-4 py-2 rounded-full text-sm transition-all flex items-center gap-1.5 font-medium ${
                activeTab === "timing"
                  ? "bg-launchlayer-accent text-white"
                  : activeTab === "whitelist" ||
                    activeTab === "wallets" ||
                    activeTab === "review"
                  ? "bg-launchlayer-violet/20 text-launchlayer-violet border border-launchlayer-violet"
                  : "border border-gray-700 text-launchlayer-text-secondary hover:bg-launchlayer-surface-light"
              }`}
            >
              {activeTab === "whitelist" ||
              activeTab === "wallets" ||
              activeTab === "review" ? (
                <CircleCheck className="h-4 w-4" />
              ) : (
                "3"
              )}
              <span className="hidden sm:inline">Timing</span>
            </button>

            <button
              onClick={() => handleTabChange("whitelist")}
              className={`px-4 py-2 rounded-full text-sm transition-all flex items-center gap-1.5 font-medium ${
                activeTab === "whitelist"
                  ? "bg-launchlayer-accent text-white"
                  : activeTab === "wallets" || activeTab === "review"
                  ? "bg-launchlayer-violet/20 text-launchlayer-violet border border-launchlayer-violet"
                  : "border border-gray-700 text-launchlayer-text-secondary hover:bg-launchlayer-surface-light"
              }`}
            >
              {activeTab === "wallets" || activeTab === "review" ? (
                <CircleCheck className="h-4 w-4" />
              ) : (
                "4"
              )}
              <span className="hidden sm:inline">Whitelist</span>
            </button>

            <button
              onClick={() => handleTabChange("wallets")}
              className={`px-4 py-2 rounded-full text-sm transition-all flex items-center gap-1.5 font-medium ${
                activeTab === "wallets"
                  ? "bg-launchlayer-accent text-white"
                  : activeTab === "review"
                  ? "bg-launchlayer-violet/20 text-launchlayer-violet border border-launchlayer-violet"
                  : "border border-gray-700 text-launchlayer-text-secondary hover:bg-launchlayer-surface-light"
              }`}
            >
              {activeTab === "review" ? <CircleCheck className="h-4 w-4" /> : "5"}
              <span className="hidden sm:inline">Wallets</span>
            </button>

            <button
              onClick={() => handleTabChange("review")}
              className={`px-4 py-2 rounded-full text-sm transition-all flex items-center gap-1.5 font-medium ${
                activeTab === "review"
                  ? "bg-launchlayer-accent text-white"
                  : "border border-gray-700 text-launchlayer-text-secondary hover:bg-launchlayer-surface-light"
              }`}
            >
              6
              <span className="hidden sm:inline">Review</span>
            </button>
          </div>
        </div>

        {activeTab === "basic" && (
          <div className="space-y-6">
            {/* Step header */}
            <div className="flex flex-col gap-1.5 mb-6">
              <span className="text-launchlayer-violet text-sm font-medium">
                Step 1 of 6 — Basic Info
              </span>
              <h2 className="text-2xl font-bold text-launchlayer-text-primary">
                Token & Project Details
              </h2>
              <p className="text-launchlayer-text-secondary">
                This is the core setup for your token sale: accepted token, name,
                and descriptions.
              </p>
            </div>

            <Card className="border-launchlayer-surface-light bg-launchlayer-surface shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-launchlayer-violet">
                  <UploadCloud className="h-5 w-5" />
                  Basic Information
                </CardTitle>
                <CardDescription>
                  Core details about your token and project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="name"
                          className="text-sm font-medium text-launchlayer-text-primary"
                        >
                          Project Name
                        </label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="SampleToken DEX"
                          value={formData.name}
                          onChange={handleChange}
                          className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-accent text-launchlayer-text-primary"
                        />
                        <p className="text-xs text-launchlayer-text-secondary">
                          The name of your project or token sale
                        </p>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="tokenSymbol"
                          className="text-sm font-medium text-launchlayer-text-primary"
                        >
                          Token Symbol
                        </label>
                        <Input
                          id="tokenSymbol"
                          name="tokenSymbol"
                          placeholder="BOOM"
                          value={formData.tokenSymbol}
                          onChange={handleChange}
                          className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-accent text-launchlayer-text-primary"
                        />
                        <p className="text-xs text-launchlayer-text-secondary">
                          The symbol used for your token (e.g., ETH, BTC)
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="tokenAddress"
                        className="text-sm font-medium text-launchlayer-text-primary"
                      >
                        Token Address
                      </label>
                      <Input
                        id="tokenAddress"
                        name="tokenAddress"
                        placeholder="0x..."
                        value={formData.tokenAddress}
                        onChange={handleChange}
                        className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-accent text-launchlayer-text-primary font-mono"
                      />
                      <p className="text-xs text-launchlayer-text-secondary">
                        The contract address of your token
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="description"
                        className="text-sm font-medium text-launchlayer-text-primary"
                      >
                        Description
                      </label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Tell us about your project and what makes it unique"
                        value={formData.description}
                        onChange={handleChange}
                        className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-accent text-launchlayer-text-primary min-h-[120px]"
                      />
                      <p className="text-xs text-launchlayer-text-secondary">
                        A brief description of your project (max 500 characters)
                      </p>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
            <Card className="border-launchlayer-surface-light bg-launchlayer-surface shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-launchlayer-violet">
                  <Clock className="h-5 w-5" />
                  Social Links
                </CardTitle>
                <CardDescription>
                  Help users find more information about your project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="websiteUrl"
                          className="text-sm font-medium text-launchlayer-text-primary"
                        >
                          Website URL
                        </label>
                        <Input
                          id="websiteUrl"
                          name="websiteUrl"
                          placeholder="https://example.com"
                          value={formData.websiteUrl}
                          onChange={handleChange}
                          className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-accent text-launchlayer-text-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="twitterUrl"
                          className="text-sm font-medium text-launchlayer-text-primary"
                        >
                          X (Twitter) URL
                        </label>
                        <Input
                          id="twitterUrl"
                          name="twitterUrl"
                          placeholder="https://x.com/yourhandle"
                          value={formData.twitterUrl}
                          onChange={handleChange}
                          className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-accent text-launchlayer-text-primary"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="telegramUrl"
                          className="text-sm font-medium text-launchlayer-text-primary"
                        >
                          Telegram URL
                        </label>
                        <Input
                          id="telegramUrl"
                          name="telegramUrl"
                          placeholder="https://t.me/yourgroup"
                          value={formData.telegramUrl}
                          onChange={handleChange}
                          className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-accent text-launchlayer-text-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="discordUrl"
                          className="text-sm font-medium text-launchlayer-text-primary"
                        >
                          Discord URL
                        </label>
                        <Input
                          id="discordUrl"
                          name="discordUrl"
                          placeholder="https://discord.gg/yourinvite"
                          value={formData.discordUrl}
                          onChange={handleChange}
                          className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-accent text-launchlayer-text-primary"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="flex justify-end mt-8">
              <Button
                onClick={() => handleTabChange("structure")}
                className="bg-launchlayer-accent hover:bg-launchlayer-accent/90 text-white"
              >
                Next Step
              </Button>
            </div>
          </div>
        )}

        {activeTab === "structure" && (
          <div className="space-y-6">
            {/* Step header */}
            <div className="flex flex-col gap-1.5 mb-6">
              <span className="text-launchlayer-violet text-sm font-medium">
                Step 2 of 6 — Structure
              </span>
              <h2 className="text-2xl font-bold text-launchlayer-text-primary">
                Sale Structure
              </h2>
              <p className="text-launchlayer-text-secondary">
                Define the economics of your token sale including price, caps, and
                allocations.
              </p>
            </div>

            <Card className="border-launchlayer-surface-light bg-launchlayer-surface shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-launchlayer-violet">
                  Token Economics
                </CardTitle>
                <CardDescription>
                  Define the price and allocation of your token
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="pricePerToken"
                          className="text-sm font-medium text-launchlayer-text-primary"
                        >
                          Price Per Token (SONIC)
                        </label>
                        <Input
                          id="pricePerToken"
                          name="pricePerToken"
                          placeholder="0.01"
                          value={formData.pricePerToken}
                          onChange={handleChange}
                          className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-accent text-launchlayer-text-primary"
                        />
                        <p className="text-xs text-launchlayer-text-secondary">
                          The price of each token in SONIC
                        </p>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="totalTokens"
                          className="text-sm font-medium text-launchlayer-text-primary"
                        >
                          Total Tokens For Sale
                        </label>
                        <Input
                          id="totalTokens"
                          name="totalTokens"
                          placeholder="1000000"
                          value={formData.totalTokens}
                          onChange={handleChange}
                          className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-accent text-launchlayer-text-primary"
                        />
                        <p className="text-xs text-launchlayer-text-secondary">
                          The total number of tokens available for sale
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="softCap"
                          className="text-sm font-medium text-launchlayer-text-primary"
                        >
                          Soft Cap (SONIC)
                        </label>
                        <Input
                          id="softCap"
                          name="softCap"
                          placeholder="10000"
                          value={formData.softCap}
                          onChange={handleChange}
                          className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-accent text-launchlayer-text-primary"
                        />
                        <p className="text-xs text-launchlayer-text-secondary">
                          Minimum funding goal (optional)
                        </p>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="hardCap"
                          className="text-sm font-medium text-launchlayer-text-primary"
                        >
                          Hard Cap (SONIC)
                        </label>
                        <Input
                          id="hardCap"
                          name="hardCap"
                          placeholder="100000"
                          value={formData.hardCap}
                          onChange={handleChange}
                          className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-accent text-launchlayer-text-primary"
                        />
                        <p className="text-xs text-launchlayer-text-secondary">
                          Maximum funding amount
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="minContribution"
                          className="text-sm font-medium text-launchlayer-text-primary"
                        >
                          Minimum Contribution (SONIC)
                        </label>
                        <Input
                          id="minContribution"
                          name="minContribution"
                          placeholder="100"
                          value={formData.minContribution}
                          onChange={handleChange}
                          className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-accent text-launchlayer-text-primary"
                        />
                        <p className="text-xs text-launchlayer-text-secondary">
                          Minimum contribution amount per user (optional)
                        </p>
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="maxContribution"
                          className="text-sm font-medium text-launchlayer-text-primary"
                        >
                          Maximum Contribution (SONIC)
                        </label>
                        <Input
                          id="maxContribution"
                          name="maxContribution"
                          placeholder="10000"
                          value={formData.maxContribution}
                          onChange={handleChange}
                          className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-accent text-launchlayer-text-primary"
                        />
                        <p className="text-xs text-launchlayer-text-secondary">
                          Maximum contribution amount per user (optional)
                        </p>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="flex justify-between mt-8">
              <Button
                onClick={() => handleTabChange("basic")}
                variant="outline"
                className="border-launchlayer-surface-light text-launchlayer-text-primary hover:bg-launchlayer-surface-light"
              >
                Previous Step
              </Button>
              <Button
                onClick={() => handleTabChange("timing")}
                className="bg-launchlayer-accent hover:bg-launchlayer-accent/90 text-white"
              >
                Next Step
              </Button>
            </div>
          </div>
        )}

        {activeTab === "timing" && (
          <div className="space-y-6">
            {/* Step header */}
            <div className="flex flex-col gap-1.5 mb-6">
              <span className="text-launchlayer-violet text-sm font-medium">
                Step 3 of 6 — Timing
              </span>
              <h2 className="text-2xl font-bold text-launchlayer-text-primary">
                Sale Schedule
              </h2>
              <p className="text-launchlayer-text-secondary">
                Set the timeline for your token sale
              </p>
            </div>

            <Card className="border-launchlayer-surface-light bg-launchlayer-surface shadow-card">
              <CardHeader>
                <CardTitle className="text-launchlayer-violet">Timeline</CardTitle>
                <CardDescription>
                  Define when your token sale starts and ends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="durationInDays"
                        className="text-sm font-medium text-launchlayer-text-primary"
                      >
                        Duration (days)
                      </label>
                      <Input
                        id="durationInDays"
                        name="durationInDays"
                        placeholder="7"
                        value={formData.durationInDays}
                        onChange={handleChange}
                        className="bg-launchlayer-background border-gray-700 focus:border-launchlayer-accent text-launchlayer-text-primary"
                      />
                      <p className="text-xs text-launchlayer-text-secondary">
                        How many days the sale will run for
                      </p>
                    </div>

                    <div className="pt-4 border-t border-gray-700">
                      <h3 className="text-sm font-semibold mb-4 text-launchlayer-text-primary">
                        Sale Timeline Preview
                      </h3>
                      <div className="flex flex-col items-center space-y-4">
                        <div className="w-full max-w-md bg-launchlayer-background p-4 rounded-md">
                          <div className="flex justify-between mb-2">
                            <span className="text-sm text-launchlayer-text-secondary">
                              Start Date:
                            </span>
                            <span className="text-sm font-medium">
                              Immediately after deployment
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-launchlayer-text-secondary">
                              End Date:
                            </span>
                            <span className="text-sm font-medium">
                              {formData.durationInDays
                                ? `${formData.durationInDays} days after deployment`
                                : "Not set"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <div className="flex justify-between mt-8">
              <Button
                onClick={() => handleTabChange("structure")}
                variant="outline"
                className="border-launchlayer-surface-light text-launchlayer-text-primary hover:bg-launchlayer-surface-light"
              >
                Previous Step
              </Button>
              <Button
                onClick={() => handleTabChange("whitelist")}
                className="bg-launchlayer-accent hover:bg-launchlayer-accent/90 text-white"
              >
                Next Step
              </Button>
            </div>
          </div>
        )}

        {activeTab === "whitelist" && (
          <div className="space-y-6">
            {/* Step header */}
            <div className="flex flex-col gap-1.5 mb-6">
              <span className="text-launchlayer-violet text-sm font-medium">
                Step 4 of 6 — Whitelist
              </span>
              <h2 className="text-2xl font-bold text-launchlayer-text-primary">
                Whitelist Settings
              </h2>
              <p className="text-launchlayer-text-secondary">
                Configure whitelist access for your token sale (optional)
              </p>
            </div>

            <Card className="border-launchlayer-surface-
