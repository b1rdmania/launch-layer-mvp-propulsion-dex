
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Info,
  Shield,
  Zap,
  BookOpen,
  Code,
  Database,
  CheckCircle2,
  Rocket,
  Github,
} from "lucide-react";
import MarkdownRenderer from "@/components/markdown/MarkdownRenderer";
import { Button } from "@/components/ui/button";

const DocsPage = () => {
  return (
    <div className="container max-w-5xl mx-auto py-12 px-4 md:px-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-cradle-text-primary bg-gradient-to-r from-cradle-accent to-blue-400 bg-clip-text text-transparent">
            Launch Layer Contracts Documentation
          </h1>
          <p className="text-xl text-cradle-text-secondary">
            Smart contracts powering the Launch Layer token launch
            infrastructure
          </p>
          <Separator className="my-6 bg-cradle-surface-light" />
        </div>

        {/* Overview Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <BookOpen className="text-cradle-accent" size={24} />
            <h2 className="text-2xl font-bold">Overview</h2>
          </div>
          <div className="pl-2 border-l-2 border-cradle-accent">
            <p className="text-cradle-text-secondary mb-4">
              Launch Layer is envisioned as a permissionless, tokenless launchpad
              built for clean, fixed-price token raises, initially targeting the
              Sonic network. It provides smart contracts, tooling, and aims to
              support frontend components for transparent public token sales,
              integrated with Hedgey Finance for post-sale vesting.
            </p>
            <a
              href="https://github.com/b1rdmania/cradleyolo"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="flex items-center gap-2 mb-4"
              >
                <Github size={18} />
                View Source Code on GitHub
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <Card className="bg-cradle-surface border-cradle-surface-light">
              <CardContent className="p-6 space-y-2">
                <h3 className="text-xl font-semibold flex items-center">
                  <Code className="mr-2 text-cradle-accent" size={20} />
                  LaunchFactory.sol
                </h3>
                <p className="text-cradle-text-secondary">
                  Deploys and manages instances of LaunchRaise contracts,
                  maintaining a registry of all deployed raises.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-cradle-surface border-cradle-surface-light">
              <CardContent className="p-6 space-y-2">
                <h3 className="text-xl font-semibold flex items-center">
                  <Code className="mr-2 text-cradle-accent" size={20} />
                  LaunchRaise.sol
                </h3>
                <p className="text-cradle-text-secondary">
                  Governs a single fixed-price token sale, handling
                  contributions, timings, limits, fees, and fund withdrawal.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-cradle-success" size={24} />
            <h2 className="text-2xl font-bold">
              V1.0 Achievements (as of 2025-04-02)
            </h2>
          </div>

          <div className="pl-8 space-y-4">
            <div className="relative">
              <div className="absolute -left-6 top-2 h-4 w-4 rounded-full bg-cradle-accent"></div>
              <h3 className="text-xl font-semibold">
                Core Contracts Developed & Tested
              </h3>
              <p className="text-cradle-text-secondary">
                <code>LaunchFactory.sol</code> and <code>LaunchRaise.sol</code>{" "}
                contracts implementing the full V1 specification (fixed-price
                sales, factory deployment, optional presale, min/max limits,
                hard cap, fee routing, pre-start cancel) have been written based
                on OpenZeppelin standards.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-2 h-4 w-4 rounded-full bg-cradle-accent"></div>
              <h3 className="text-xl font-semibold">
                Comprehensive Local Testing
              </h3>
              <p className="text-cradle-text-secondary">
                Developed and passed a detailed test suite using Foundry (
                <code>forge test --via-ir</code>), covering core logic, edge
                cases, constraints (caps, limits, time boundaries), presale
                Merkle proofs, lifecycle management (cancel, finalize, sweep),
                and event emissions for both contracts. (~39 passing tests).
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-2 h-4 w-4 rounded-full bg-cradle-accent"></div>
              <h3 className="text-xl font-semibold">
                Deployment Scripts Created & Verified
              </h3>
              <p className="text-cradle-text-secondary">
                Foundry scripts (<code>DeployMocks.s.sol</code>,{" "}
                <code>DeployFactory.s.sol</code>,{" "}
                <code>DeployRaiseViaFactory.s.sol</code>) created, parameterized
                using <code>.env</code> for configuration, and verified locally
                for deploying the contracts sequentially.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-2 h-4 w-4 rounded-full bg-cradle-accent"></div>
              <h3 className="text-xl font-semibold">
                Sonic Testnet Deployment
              </h3>
              <p className="text-cradle-text-secondary">
                Successfully deployed the full suite of V1 contracts to the
                Sonic Testnet (Chain ID 57054):
              </p>
              <ul className="list-disc ml-6 text-cradle-text-secondary">
                <li>
                  Deployed Mock ERC20s (mTKN @ 0x06...cD, mUSDC @ 0x1B...ed).
                </li>
                <li>Deployed LaunchFactory (0x8B...cF).</li>
                <li>
                  Deployed an example LaunchRaise instance (0x60...B102) via the
                  factory using testnet configuration.
                </li>
              </ul>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-2 h-4 w-4 rounded-full bg-cradle-accent"></div>
              <h3 className="text-xl font-semibold">
                Configuration & ABIs Ready
              </h3>
              <p className="text-cradle-text-secondary">
                Deployed contract addresses and necessary configuration captured
                (primarily in <code>.env</code> for scripts). Final contract
                ABIs generated (via <code>forge build --via-ir</code>) and
                available (e.g., in <code>abis/</code> directory) for frontend
                integration.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-2 h-4 w-4 rounded-full bg-cradle-accent"></div>
              <h3 className="text-xl font-semibold">Frontend UX Developed</h3>
              <p className="text-cradle-text-secondary">
                Created an initial frontend application integrating the V1
                design system and UX specification (Note: Awaiting full
                end-to-end testing against the deployed Sonic Testnet
                contracts).
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-2 h-4 w-4 rounded-full bg-cradle-accent"></div>
              <h3 className="text-xl font-semibold">Repository Updated</h3>
              <p className="text-cradle-text-secondary">
                All V1 contract code, tests, scripts, ABIs, and specification
                documents are organized and updated in the GitHub repository.
              </p>
            </div>
          </div>
        </section>

        {/* Current Deployments Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Rocket className="text-cradle-accent" size={24} />
            <h2 className="text-2xl font-bold">
              Current Sonic Testnet Deployments (as of 2025-04-02)
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left bg-cradle-surface">
                  <th className="p-4 border-b border-cradle-surface-light">
                    Contract
                  </th>
                  <th className="p-4 border-b border-cradle-surface-light">
                    Address
                  </th>
                  <th className="p-4 border-b border-cradle-surface-light">
                    Notes
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-cradle-surface/50">
                  <td className="p-4 border-b border-cradle-surface-light font-medium">
                    Mock Token Sold (mTKN)
                  </td>
                  <td className="p-4 border-b border-cradle-surface-light font-mono text-sm">
                    0x06726427c7326d9AB606D1E81A036D041CEcbdcD
                  </td>
                  <td className="p-4 border-b border-cradle-surface-light text-cradle-text-secondary">
                    18 decimals
                  </td>
                </tr>
                <tr className="hover:bg-cradle-surface/50">
                  <td className="p-4 border-b border-cradle-surface-light font-medium">
                    Wrapped Sonic (WS)
                  </td>
                  <td className="p-4 border-b border-cradle-surface-light font-mono text-sm">
                    0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38
                  </td>
                  <td className="p-4 border-b border-cradle-surface-light text-cradle-text-secondary">
                    18 decimals - Used as the accepted token
                  </td>
                </tr>
                <tr className="hover:bg-cradle-surface/50">
                  <td className="p-4 border-b border-cradle-surface-light font-medium">
                    Launch Factory
                  </td>
                  <td className="p-4 border-b border-cradle-surface-light font-mono text-sm">
                    0x8BAE780580c388f6F7eDA2d6a96D5cD6B0ebDbcF
                  </td>
                  <td className="p-4 border-b border-cradle-surface-light text-cradle-text-secondary"></td>
                </tr>
                <tr className="hover:bg-cradle-surface/50">
                  <td className="p-4 border-b border-cradle-surface-light font-medium">
                    Example Launch Raise
                  </td>
                  <td className="p-4 border-b border-cradle-surface-light font-mono text-sm">
                    0x6226356cA224cD55d5f4Fec2B51B89d57cf98060
                  </td>
                  <td className="p-4 border-b border-cradle-surface-light text-cradle-text-secondary">
                    Accepts WS
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <Alert className="bg-cradle-surface border-cradle-surface-light">
            <Info className="h-5 w-5 text-cradle-accent" />
            <AlertTitle>Note</AlertTitle>
            <AlertDescription className="text-cradle-text-secondary">
              These addresses are also reflected in the committed{" "}
              <code>.env</code> file, excluding the private key.
            </AlertDescription>
          </Alert>
        </section>

        {/* Contract ABIs Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Database className="text-cradle-accent" size={24} />
            <h2 className="text-2xl font-bold">Contract ABIs</h2>
          </div>

          <p className="text-cradle-text-secondary">
            The Application Binary Interfaces (ABIs) for the core contracts,
            needed for frontend integration, can be found in the{" "}
            <code>abis/</code> directory:
          </p>

          <ul className="list-disc pl-6 text-cradle-text-secondary space-y-2">
            <li>
              <code>abis/LaunchFactory.json</code>
            </li>
            <li>
              <code>abis/LaunchRaise.json</code>
            </li>
            <li>
              <code>abis/MockERC20.json</code>
            </li>
          </ul>
        </section>

        {/* Technical Specification Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Shield className="text-cradle-accent" size={24} />
            <h2 className="text-2xl font-bold">Technical Specification (V1)</h2>
          </div>

          <div className="pl-2 border-l-2 border-cradle-accent">
            <p className="text-cradle-text-secondary">
              Launch Layer is envisioned as a permissionless, tokenless launchpad
              built for clean, fixed-price token raises on the Sonic network. It
              provides smart contracts, tooling, and frontend components to
              launch transparent public token sales—integrated with Hedgey
              Finance for post-sale vesting.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem
              value="guiding-principles"
              className="border-cradle-surface-light"
            >
              <AccordionTrigger className="text-xl font-semibold text-cradle-text-primary">
                Guiding Principles
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-cradle-text-secondary">
                  Launch Layer aims to be a neutral infrastructure provider. It does
                  not hold user funds (post-sweep), offer investment advice, or
                  issue its own platform token. Responsibility for project
                  quality and outcomes rests with the project teams using the
                  platform.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="mvp-overview"
              className="border-cradle-surface-light"
            >
              <AccordionTrigger className="text-xl font-semibold text-cradle-text-primary">
                V1 MVP Overview
              </AccordionTrigger>
              <AccordionContent>
                <p className="font-semibold mb-2">
                  Goal: Enable teams to launch Sonic-native token sales via a
                  factory contract with the following core features:
                </p>
                <ul className="list-disc pl-6 text-cradle-text-secondary space-y-2">
                  <li>Fixed-price ERC20 contributions (e.g., USDC).</li>
                  <li>
                    Optional whitelist-based presale phase using a Merkle root.
                  </li>
                  <li>
                    Standard public raise phase following the presale (or as the
                    only phase).
                  </li>
                  <li>
                    Configurable fee routing (e.g., 5% = 500 basis points
                    suggested default) on withdrawal.
                  </li>
                  <li>
                    Exportable allocations for post-raise vesting (via Hedgey).
                  </li>
                  <li>
                    Enforceable Minimum and Maximum contribution limits per
                    wallet (denominated in the <code>token</code> being sold).
                  </li>
                  <li>
                    Owner-controlled ability to cancel the sale <em>before</em>{" "}
                    it starts.
                  </li>
                  <li>
                    Deployment of individual sale contracts via a central{" "}
                    <code>LaunchFactory</code> contract (owner-controlled for
                    V1).
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="cradle-raise"
              className="border-cradle-surface-light"
            >
              <AccordionTrigger className="text-xl font-semibold text-cradle-text-primary">
                LaunchRaise.sol
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div>
                  <h4 className="font-bold">Description:</h4>
                  <p className="text-cradle-text-secondary">
                    Immutable smart contract governing a single token sale
                    instance. Stores sale configuration, manages contribution
                    phases, tracks contributions, enforces hard caps and
                    per-wallet limits, and facilitates fund withdrawal with fee
                    application. Includes a pre-start cancellation mechanism.
                  </p>
                  <p className="text-cradle-text-secondary italic mt-2">
                    (Note: Uses dynamic decimal fetching via{" "}
                    <code>IERC20Metadata</code> for robust calculations
                    involving the token being sold.)
                  </p>
                </div>

                <div>
                  <h4 className="font-bold">Constructor Parameters:</h4>
                  <ul className="list-disc pl-6 text-cradle-text-secondary space-y-2">
                    <li>
                      <code>address _token</code>: The ERC20 token being sold.
                    </li>
                    <li>
                      <code>address _acceptedToken</code>: The ERC20 token used
                      for payment (e.g., USDC on Sonic).
                    </li>
                    <li>
                      <code>uint256 _pricePerToken</code>: Price defined as the
                      amount of <code>acceptedToken</code> base units required
                      per 1 <em>whole</em> <code>token</code> (e.g., 1e18 base
                      units). Must be pre-calculated correctly by deployer/UI
                      based on desired price and <code>acceptedToken</code>{" "}
                      decimals.
                    </li>
                    <li>
                      <code>uint256 _presaleStart</code>: Unix timestamp for
                      presale start.
                    </li>
                    <li>
                      <code>uint256 _publicSaleStart</code>: Unix timestamp for
                      public sale start (must be {">"}= presaleStart).
                    </li>
                    <li>
                      <code>uint256 _endTime</code>: Unix timestamp for sale end
                      (must be {">"}= publicSaleStart).
                    </li>
                    <li>
                      <code>bytes32 _merkleRoot</code>: Merkle root for presale
                      whitelist (provide <code>bytes32(0)</code> if no presale).
                    </li>
                    <li>
                      <code>address _owner</code>: The project&apos;s wallet
                      address receiving net funds after fee. Set as the contract
                      owner.
                    </li>
                    <li>
                      <code>address _feeRecipient</code>: Address receiving the
                      platform fee.
                    </li>
                    <li>
                      <code>uint16 _feePercentBasisPoints</code>: Fee percentage
                      in basis points (e.g., 500 = 5.00%). Max 10000.
                    </li>
                    <li>
                      <code>uint256 _maxAcceptedTokenRaise</code>: The hard cap
                      for the sale, denominated in <code>acceptedToken</code>{" "}
                      base units.
                    </li>
                    <li>
                      <code>uint256 _minTokenAllocation</code>: Minimum purchase
                      amount in <strong>base units</strong> of the{" "}
                      <code>token</code> being sold allowed per contribution
                      transaction. Must be {">"} 0.
                    </li>
                    <li>
                      <code>uint256 _maxTokenAllocation</code>: Maximum total
                      purchase amount in <strong>base units</strong> of the{" "}
                      <code>token</code> being sold allowed per contributor
                      wallet. Must be {">"}= <code>_minTokenAllocation</code>.
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold">Key Functions:</h4>
                  <ul className="list-disc pl-6 text-cradle-text-secondary space-y-2">
                    <li>
                      <code>
                        contribute(uint256 _tokenAmountToBuy, bytes32[] calldata
                        _proof)
                      </code>
                      : Allows users to contribute; verifies phase, time,
                      whitelist (if applicable), min/max limits, and hard cap.
                      Requires prior <code>acceptedToken</code> approval.
                    </li>
                    <li>
                      <code>finalizeRaise()</code>: Owner callable after{" "}
                      <code>endTime</code> to formally mark the sale as
                      finalized (if not cancelled).
                    </li>
                    <li>
                      <code>sweep()</code>: Owner callable after finalization;
                      transfers <code>acceptedToken</code> funds to{" "}
                      <code>owner</code> and <code>feeRecipient</code>.
                    </li>
                    <li>
                      <code>getContribution(address _account)</code>: View
                      function returning the total amount of <code>token</code>{" "}
                      purchased by an account (in base units).
                    </li>
                    <li>
                      <code>cancelSale()</code>: Owner callable{" "}
                      <em>only before</em> <code>presaleStart</code> to
                      irreversibly cancel the sale.
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold">Security:</h4>
                  <p className="text-cradle-text-secondary">
                    Inherits <code>Ownable</code>, <code>ReentrancyGuard</code>.
                    Uses <code>SafeERC20</code>. Implements Merkle proof
                    verification. State locked after finalization or
                    cancellation.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold">Custom Errors:</h4>
                  <p className="text-cradle-text-secondary">
                    Uses custom errors (defined in the source file) for gas
                    efficiency and clearer revert reasons instead of require
                    strings.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="cradle-factory"
              className="border-cradle-surface-light"
            >
              <AccordionTrigger className="text-xl font-semibold text-cradle-text-primary">
                LaunchFactory.sol
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div>
                  <h4 className="font-bold">Description:</h4>
                  <p className="text-cradle-text-secondary">
                    A factory contract used to deploy new{" "}
                    <code>LaunchRaise</code> instances. Maintains a registry of
                    deployed raises.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold">Key Functions:</h4>
                  <ul className="list-disc pl-6 text-cradle-text-secondary space-y-2">
                    <li>
                      <code>createRaise(...)</code>: Deploys a new{" "}
                      <code>LaunchRaise</code> instance with the specified
                      parameters. Restricted to the factory owner.
                    </li>
                    <li>
                      <code>getDeployedRaises()</code>: View function returning
                      an array of all deployed raise addresses.
                    </li>
                    <li>
                      <code>deployedRaisesCount()</code>: View function
                      returning the count of deployed raises.
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold">Security:</h4>
                  <p className="text-cradle-text-secondary">
                    Inherits <code>Ownable</code>.
                  </p>
                </div>

                <p className="text-cradle-text-secondary italic">
                  (See the source files in <code>src/</code> for full
                  implementation details and NatSpec comments.)
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </div>
  );
};

export default DocsPage;
