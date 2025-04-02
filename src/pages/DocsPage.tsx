
import React from 'react';
import { 
  Alert,
  AlertTitle, 
  AlertDescription 
} from '@/components/ui/alert';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Info, Shield, Zap, BookOpen, Code, Database, CheckCircle2, Rocket } from 'lucide-react';
import MarkdownRenderer from '@/components/markdown/MarkdownRenderer';

const DocsPage = () => {
  return (
    <div className="container max-w-5xl mx-auto py-12 px-4 md:px-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-cradle-text-primary bg-gradient-to-r from-cradle-accent to-blue-400 bg-clip-text text-transparent">
            Cradle Contracts Documentation
          </h1>
          <p className="text-xl text-cradle-text-secondary">
            Smart contracts powering the Cradle.build V1 token launch infrastructure
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
            <p className="text-cradle-text-secondary">
              Cradle is envisioned as a permissionless, tokenless launchpad built for clean, fixed-price token raises, initially targeting the Sonic network. 
              It provides smart contracts, tooling, and aims to support frontend components for transparent public token sales, integrated with Hedgey Finance for post-sale vesting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            <Card className="bg-cradle-surface border-cradle-surface-light">
              <CardContent className="p-6 space-y-2">
                <h3 className="text-xl font-semibold flex items-center">
                  <Code className="mr-2 text-cradle-accent" size={20} />
                  CradleFactory.sol
                </h3>
                <p className="text-cradle-text-secondary">
                  Deploys and manages instances of CradleRaise contracts, maintaining a registry of all deployed raises.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-cradle-surface border-cradle-surface-light">
              <CardContent className="p-6 space-y-2">
                <h3 className="text-xl font-semibold flex items-center">
                  <Code className="mr-2 text-cradle-accent" size={20} />
                  CradleRaise.sol
                </h3>
                <p className="text-cradle-text-secondary">
                  Governs a single fixed-price token sale, handling contributions, timings, limits, fees, and fund withdrawal.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-cradle-success" size={24} />
            <h2 className="text-2xl font-bold">V1.0 Achievements (as of 2025-04-02)</h2>
          </div>

          <div className="pl-8 space-y-4">
            <div className="relative">
              <div className="absolute -left-6 top-2 h-4 w-4 rounded-full bg-cradle-accent"></div>
              <h3 className="text-xl font-semibold">Core Contracts Developed</h3>
              <p className="text-cradle-text-secondary">
                <code>CradleFactory</code> and <code>CradleRaise</code> contracts implementing the V1 specification 
                (fixed-price sales, optional presale, limits, fees) have been written and tested.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-2 h-4 w-4 rounded-full bg-cradle-accent"></div>
              <h3 className="text-xl font-semibold">Deployment Scripts</h3>
              <p className="text-cradle-text-secondary">
                Foundry scripts (<code>DeployMocks</code>, <code>DeployFactory</code>, <code>DeployRaiseViaFactory</code>) 
                created for deploying the contracts sequentially.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-2 h-4 w-4 rounded-full bg-cradle-accent"></div>
              <h3 className="text-xl font-semibold">Sonic Testnet Deployment</h3>
              <p className="text-cradle-text-secondary">
                Successfully deployed the full suite of contracts to the Sonic Testnet including Mock ERC20 tokens, CradleFactory, and an example CradleRaise instance.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-2 h-4 w-4 rounded-full bg-cradle-accent"></div>
              <h3 className="text-xl font-semibold">Configuration & ABIs</h3>
              <p className="text-cradle-text-secondary">
                Contract addresses saved to <code>.env</code>, and ABIs generated and organized in the <code>abis/</code> directory for frontend use.
              </p>
            </div>

            <div className="relative">
              <div className="absolute -left-6 top-2 h-4 w-4 rounded-full bg-cradle-accent"></div>
              <h3 className="text-xl font-semibold">Repository Updated</h3>
              <p className="text-cradle-text-secondary">
                All code, scripts, ABIs, and deployment artifacts pushed to the GitHub repository.
              </p>
            </div>
          </div>
        </section>

        {/* Current Deployments Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Rocket className="text-cradle-accent" size={24} />
            <h2 className="text-2xl font-bold">Current Sonic Testnet Deployments (as of 2025-04-02)</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left bg-cradle-surface">
                  <th className="p-4 border-b border-cradle-surface-light">Contract</th>
                  <th className="p-4 border-b border-cradle-surface-light">Address</th>
                  <th className="p-4 border-b border-cradle-surface-light">Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-cradle-surface/50">
                  <td className="p-4 border-b border-cradle-surface-light font-medium">Mock Token Sold (mTKN)</td>
                  <td className="p-4 border-b border-cradle-surface-light font-mono text-sm">0x06726427c7326d9AB606D1E81A036D041CEcbdcD</td>
                  <td className="p-4 border-b border-cradle-surface-light text-cradle-text-secondary">18 decimals</td>
                </tr>
                <tr className="hover:bg-cradle-surface/50">
                  <td className="p-4 border-b border-cradle-surface-light font-medium">Wrapped Sonic (WS)</td>
                  <td className="p-4 border-b border-cradle-surface-light font-mono text-sm">0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38</td>
                  <td className="p-4 border-b border-cradle-surface-light text-cradle-text-secondary">18 decimals - Used as the accepted token</td>
                </tr>
                <tr className="hover:bg-cradle-surface/50">
                  <td className="p-4 border-b border-cradle-surface-light font-medium">Cradle Factory</td>
                  <td className="p-4 border-b border-cradle-surface-light font-mono text-sm">0x8BAE780580c388f6F7eDA2d6a96D5cD6B0ebDbcF</td>
                  <td className="p-4 border-b border-cradle-surface-light text-cradle-text-secondary"></td>
                </tr>
                <tr className="hover:bg-cradle-surface/50">
                  <td className="p-4 border-b border-cradle-surface-light font-medium">Example Cradle Raise</td>
                  <td className="p-4 border-b border-cradle-surface-light font-mono text-sm">0x6226356cA224cD55d5f4Fec2B51B89d57cf98060</td>
                  <td className="p-4 border-b border-cradle-surface-light text-cradle-text-secondary">Accepts WS</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <Alert className="bg-cradle-surface border-cradle-surface-light">
            <Info className="h-5 w-5 text-cradle-accent" />
            <AlertTitle>Note</AlertTitle>
            <AlertDescription className="text-cradle-text-secondary">
              These addresses are also reflected in the committed <code>.env</code> file, excluding the private key.
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
            The Application Binary Interfaces (ABIs) for the core contracts, needed for frontend integration, can be found in the <code>abis/</code> directory:
          </p>
          
          <ul className="list-disc pl-6 text-cradle-text-secondary space-y-2">
            <li><code>abis/CradleFactory.json</code></li>
            <li><code>abis/CradleRaise.json</code></li>
            <li><code>abis/MockERC20.json</code></li>
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
              Cradle is envisioned as a permissionless, tokenless launchpad built for clean, fixed-price token raises on the Sonic network. 
              It provides smart contracts, tooling, and frontend components to launch transparent public token sales—integrated with 
              Hedgey Finance for post-sale vesting.
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="guiding-principles" className="border-cradle-surface-light">
              <AccordionTrigger className="text-xl font-semibold text-cradle-text-primary">Guiding Principles</AccordionTrigger>
              <AccordionContent>
                <p className="text-cradle-text-secondary">
                  Cradle aims to be a neutral infrastructure provider. It does not hold user funds (post-sweep), 
                  offer investment advice, or issue its own platform token. Responsibility for project quality 
                  and outcomes rests with the project teams using the platform.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="mvp-overview" className="border-cradle-surface-light">
              <AccordionTrigger className="text-xl font-semibold text-cradle-text-primary">V1 MVP Overview</AccordionTrigger>
              <AccordionContent>
                <p className="font-semibold mb-2">Goal: Enable teams to launch Sonic-native token sales via a factory contract with the following core features:</p>
                <ul className="list-disc pl-6 text-cradle-text-secondary space-y-2">
                  <li>Fixed-price ERC20 contributions (e.g., USDC).</li>
                  <li>Optional whitelist-based presale phase using a Merkle root.</li>
                  <li>Standard public raise phase following the presale (or as the only phase).</li>
                  <li>Configurable fee routing (e.g., 5% = 500 basis points suggested default) on withdrawal.</li>
                  <li>Exportable allocations for post-raise vesting (via Hedgey).</li>
                  <li>Enforceable Minimum and Maximum contribution limits per wallet (denominated in the <code>token</code> being sold).</li>
                  <li>Owner-controlled ability to cancel the sale <em>before</em> it starts.</li>
                  <li>Deployment of individual sale contracts via a central <code>CradleFactory</code> contract (owner-controlled for V1).</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cradle-raise" className="border-cradle-surface-light">
              <AccordionTrigger className="text-xl font-semibold text-cradle-text-primary">CradleRaise.sol</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div>
                  <h4 className="font-bold">Description:</h4>
                  <p className="text-cradle-text-secondary">
                    Immutable smart contract governing a single token sale instance. Stores sale configuration, manages contribution phases, 
                    tracks contributions, enforces hard caps and per-wallet limits, and facilitates fund withdrawal with fee application. 
                    Includes a pre-start cancellation mechanism.
                  </p>
                  <p className="text-cradle-text-secondary italic mt-2">
                    (Note: Uses dynamic decimal fetching via <code>IERC20Metadata</code> for robust calculations involving the token being sold.)
                  </p>
                </div>

                <div>
                  <h4 className="font-bold">Constructor Parameters:</h4>
                  <ul className="list-disc pl-6 text-cradle-text-secondary space-y-2">
                    <li><code>address _token</code>: The ERC20 token being sold.</li>
                    <li><code>address _acceptedToken</code>: The ERC20 token used for payment (e.g., USDC on Sonic).</li>
                    <li><code>uint256 _pricePerToken</code>: Price defined as the amount of <code>acceptedToken</code> base units required per 1 <em>whole</em> <code>token</code> (e.g., 1e18 base units). Must be pre-calculated correctly by deployer/UI based on desired price and <code>acceptedToken</code> decimals.</li>
                    <li><code>uint256 _presaleStart</code>: Unix timestamp for presale start.</li>
                    <li><code>uint256 _publicSaleStart</code>: Unix timestamp for public sale start (must be {'>'}= presaleStart).</li>
                    <li><code>uint256 _endTime</code>: Unix timestamp for sale end (must be {'>'}= publicSaleStart).</li>
                    <li><code>bytes32 _merkleRoot</code>: Merkle root for presale whitelist (provide <code>bytes32(0)</code> if no presale).</li>
                    <li><code>address _owner</code>: The project&apos;s wallet address receiving net funds after fee. Set as the contract owner.</li>
                    <li><code>address _feeRecipient</code>: Address receiving the platform fee.</li>
                    <li><code>uint16 _feePercentBasisPoints</code>: Fee percentage in basis points (e.g., 500 = 5.00%). Max 10000.</li>
                    <li><code>uint256 _maxAcceptedTokenRaise</code>: The hard cap for the sale, denominated in <code>acceptedToken</code> base units.</li>
                    <li><code>uint256 _minTokenAllocation</code>: Minimum purchase amount in <strong>base units</strong> of the <code>token</code> being sold allowed per contribution transaction. Must be {'>'} 0.</li>
                    <li><code>uint256 _maxTokenAllocation</code>: Maximum total purchase amount in <strong>base units</strong> of the <code>token</code> being sold allowed per contributor wallet. Must be {'>'}= <code>_minTokenAllocation</code>.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold">Key Functions:</h4>
                  <ul className="list-disc pl-6 text-cradle-text-secondary space-y-2">
                    <li><code>contribute(uint256 _tokenAmountToBuy, bytes32[] calldata _proof)</code>: Allows users to contribute; verifies phase, time, whitelist (if applicable), min/max limits, and hard cap. Requires prior <code>acceptedToken</code> approval.</li>
                    <li><code>finalizeRaise()</code>: Owner callable after <code>endTime</code> to formally mark the sale as finalized (if not cancelled).</li>
                    <li><code>sweep()</code>: Owner callable after finalization; transfers <code>acceptedToken</code> funds to <code>owner</code> and <code>feeRecipient</code>.</li>
                    <li><code>getContribution(address _account)</code>: View function returning the total amount of <code>token</code> purchased by an account (in base units).</li>
                    <li><code>cancelSale()</code>: Owner callable <em>only before</em> <code>presaleStart</code> to irreversibly cancel the sale.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold">Security:</h4>
                  <p className="text-cradle-text-secondary">
                    Inherits <code>Ownable</code>, <code>ReentrancyGuard</code>. Uses <code>SafeERC20</code>. 
                    Implements Merkle proof verification. State locked after finalization or cancellation.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold">Custom Errors:</h4>
                  <p className="text-cradle-text-secondary">
                    Uses custom errors (defined in the source file) for gas efficiency and clearer revert reasons instead of require strings.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cradle-factory" className="border-cradle-surface-light">
              <AccordionTrigger className="text-xl font-semibold text-cradle-text-primary">CradleFactory.sol</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div>
                  <h4 className="font-bold">Description:</h4>
                  <p className="text-cradle-text-secondary">
                    A factory contract used to deploy new <code>CradleRaise</code> instances. Maintains a registry of deployed raises.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold">Key Functions:</h4>
                  <ul className="list-disc pl-6 text-cradle-text-secondary space-y-2">
                    <li><code>createRaise(...)</code>: Deploys a new <code>CradleRaise</code> instance with the specified parameters. Restricted to the factory owner.</li>
                    <li><code>getDeployedRaises()</code>: View function returning an array of all deployed raise addresses.</li>
                    <li><code>deployedRaisesCount()</code>: View function returning the count of deployed raises.</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold">Security:</h4>
                  <p className="text-cradle-text-secondary">
                    Inherits <code>Ownable</code>.
                  </p>
                </div>

                <p className="text-cradle-text-secondary italic">
                  (See the source files in <code>src/</code> for full implementation details and NatSpec comments.)
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Deployment Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Rocket className="text-cradle-accent" size={24} />
            <h2 className="text-2xl font-bold">Deployment (Sonic Testnet)</h2>
          </div>

          <p className="text-cradle-text-secondary">
            Deployment uses Foundry scripts and requires the <code>.env</code> file to be correctly configured, 
            especially <code>TESTNET_PRIVATE_KEY</code> and <code>SONIC_TESTNET_RPC_URL</code>.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-cradle-accent text-cradle-accent mr-3">1</span>
                Deploy Mock Tokens (Optional but needed for Testnet)
              </h3>
              <p className="ml-11 text-cradle-text-secondary mb-2">
                Creates mock ERC20 tokens for <code>tokenSold</code> and <code>acceptedToken</code> since standard testnet tokens might be scarce. 
                Updates <code>.env</code> with their addresses.
              </p>
              <Card className="ml-11 bg-cradle-surface border-cradle-surface-light">
                <CardContent className="p-4">
                  <code className="text-sm font-mono block">
                    forge script script/DeployMocks.s.sol:DeployMocks --rpc-url $SONIC_TESTNET_RPC_URL --broadcast --via-ir -vvvv<br/>
                    # Manually update TOKEN_SOLD_ADDRESS and ACCEPTED_TOKEN_ADDRESS in .env with output
                  </code>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-cradle-accent text-cradle-accent mr-3">2</span>
                Deploy Factory
              </h3>
              <p className="ml-11 text-cradle-text-secondary mb-2">
                Deploys the <code>CradleFactory</code> contract. Updates <code>.env</code> with its address.
              </p>
              <Card className="ml-11 bg-cradle-surface border-cradle-surface-light">
                <CardContent className="p-4">
                  <code className="text-sm font-mono block">
                    forge script script/DeployFactory.s.sol:DeployFactory --rpc-url $SONIC_TESTNET_RPC_URL --broadcast --via-ir -vvvv<br/>
                    # Manually update FACTORY_ADDRESS in .env with output
                  </code>
                </CardContent>
              </Card>
            </div>

            <div>
              <h3 className="text-xl font-semibold flex items-center">
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-cradle-accent text-cradle-accent mr-3">3</span>
                Deploy Raise Instance via Factory
              </h3>
              <p className="ml-11 text-cradle-text-secondary mb-2">
                Deploys a <code>CradleRaise</code> instance using the factory and parameters from the <code>.env</code> file 
                (ensure mock token and factory addresses are updated in <code>.env</code> first).
              </p>
              <Card className="ml-11 bg-cradle-surface border-cradle-surface-light">
                <CardContent className="p-4">
                  <code className="text-sm font-mono block">
                    forge script script/DeployRaiseViaFactory.s.sol:DeployRaiseViaFactory --rpc-url $SONIC_TESTNET_RPC_URL --broadcast --via-ir -vvvv<br/>
                    # Manually update RAISE_ADDRESS in .env with output
                  </code>
                </CardContent>
              </Card>
            </div>
          </div>

          <Alert className="bg-cradle-surface border-cradle-surface-light">
            <Info className="h-5 w-5 text-cradle-accent" />
            <AlertDescription className="text-cradle-text-secondary">
              The scripts are designed to read the private key from the <code>TESTNET_PRIVATE_KEY</code> environment variable 
              when targeting Sonic Testnet (Chain ID 57054). Do not use the <code>--private-key</code> flag with these scripts.
            </AlertDescription>
          </Alert>
        </section>

        {/* Development & Testing Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="text-cradle-accent" size={24} />
            <h2 className="text-2xl font-bold">Development & Testing</h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="requirements" className="border-cradle-surface-light">
              <AccordionTrigger className="text-xl font-semibold text-cradle-text-primary">Requirements</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 text-cradle-text-secondary">
                  <li><a href="https://getfoundry.sh/" className="text-cradle-accent hover:underline">Foundry</a>: Smart contract development toolchain.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="setup" className="border-cradle-surface-light">
              <AccordionTrigger className="text-xl font-semibold text-cradle-text-primary">Setup</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <div>
                  <h4 className="font-bold">Clone the repository:</h4>
                  <Card className="bg-cradle-surface border-cradle-surface-light mt-2">
                    <CardContent className="p-4">
                      <code className="text-sm font-mono block">
                        git clone https://github.com/b1rdmania/cradleyolo.git<br/>
                        cd cradleyolo/cradle-contracts
                      </code>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h4 className="font-bold">Install dependencies:</h4>
                  <Card className="bg-cradle-surface border-cradle-surface-light mt-2">
                    <CardContent className="p-4">
                      <code className="text-sm font-mono block">
                        forge install
                      </code>
                    </CardContent>
                  </Card>
                </div>

                <div>
                  <h4 className="font-bold">Configure Environment Variables:</h4>
                  <ul className="list-disc pl-6 text-cradle-text-secondary space-y-2">
                    <li>
                      Copy the example environment file:
                      <Card className="bg-cradle-surface border-cradle-surface-light mt-2">
                        <CardContent className="p-4">
                          <code className="text-sm font-mono block">
                            cp .env.example .env
                          </code>
                        </CardContent>
                      </Card>
                    </li>
                    <li>
                      Edit the <code>.env</code> file and fill in the required values:
                      <ul className="list-disc pl-6 text-cradle-text-secondary space-y-2 mt-2">
                        <li><code>TESTNET_PRIVATE_KEY</code>: Your private key for deploying to Sonic Testnet (must start with <code>0x</code>). <strong>NEVER commit this file with your private key.</strong></li>
                        <li>Other parameters (RPC URLs, Raise parameters) can be adjusted as needed.</li>
                        <li>Deployed contract addresses (<code>FACTORY_ADDRESS</code>, <code>TOKEN_SOLD_ADDRESS</code>, etc.) will be populated during the deployment steps or can be filled in manually if interacting with existing deployments.</li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="compilation" className="border-cradle-surface-light">
              <AccordionTrigger className="text-xl font-semibold text-cradle-text-primary">Compilation</AccordionTrigger>
              <AccordionContent>
                <p className="text-cradle-text-secondary mb-2">To compile the contracts:</p>
                <Card className="bg-cradle-surface border-cradle-surface-light">
                  <CardContent className="p-4">
                    <code className="text-sm font-mono block">
                      forge build --via-ir
                    </code>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="testing" className="border-cradle-surface-light">
              <AccordionTrigger className="text-xl font-semibold text-cradle-text-primary">Testing</AccordionTrigger>
              <AccordionContent>
                <p className="text-cradle-text-secondary mb-2">To run the test suite:</p>
                <Card className="bg-cradle-surface border-cradle-surface-light">
                  <CardContent className="p-4">
                    <code className="text-sm font-mono block">
                      forge test
                    </code>
                  </CardContent>
                </Card>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </div>
    </div>
  );
};

export default DocsPage;
