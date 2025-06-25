# PropulsionDEX - Sonic Mainnet

PropulsionDEX is a decentralized exchange built for Sonic blockchain, designed to work with the Algebra protocol and SwapX DEX.

## 🚀 Live Deployment

Currently configured for **Sonic Mainnet** with the following features:
- **Chain ID**: 146
- **RPC**: https://rpc.soniclabs.com
- **Explorer**: https://sonicscan.org
- **Native Token**: S (Sonic)

## 📋 Features

### Current Status
- ✅ **Sonic Network Configuration** - Connected to Sonic mainnet
- ✅ **Token Support** - wS, WETH, USDC, USDT
- ✅ **Wallet Integration** - RainbowKit with MetaMask, WalletConnect, etc.
- ⏳ **Algebra DEX Integration** - Ready for SwapX deployment

### Coming Soon
- 🔄 **Token Swapping** - Once SwapX (Algebra DEX) launches on Sonic
- 💰 **Liquidity Provision** - Concentrated liquidity positions
- 📊 **Position Management** - NFT-based liquidity tracking

## 🛠 Technical Stack

- **Frontend**: Next.js 14 with TypeScript
- **Blockchain**: Ethereum-compatible (Sonic)
- **Wallet**: RainbowKit + Wagmi + Viem
- **Styling**: Tailwind CSS
- **DEX Protocol**: Algebra (via SwapX)

## 🔧 Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### Environment Variables
The app uses the following configuration:
- **Project ID**: Already configured for RainbowKit
- **RPC URLs**: Built-in Sonic mainnet RPC
- **Contract Addresses**: Will be updated when SwapX deploys

## 🌐 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect Next.js and use the correct build settings
3. The app will be deployed with the existing `vercel.json` configuration

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📄 Smart Contracts

### Current Configuration
- **Wrapped S (wS)**: `0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38`
- **WETH**: `0x50c42dEAcD8Fc9773493ED674b675bE577f2634b`
- **USDC**: `0x29219dd400f2Bf60E5a23d13Be72B486D4038894`
- **USDT**: `0x6047828dc181963ba44974801ff68e538da5eaf9`

### Algebra/SwapX Contracts (Placeholder)
These will be updated when SwapX or other Algebra DEX launches on Sonic:
- **Quoter V2**: To be deployed
- **Swap Router**: To be deployed  
- **Position Manager**: To be deployed

## 🔄 Network Details

Add Sonic to your wallet:
- **Network Name**: Sonic
- **RPC URL**: https://rpc.soniclabs.com
- **Chain ID**: 146
- **Currency Symbol**: S
- **Block Explorer**: https://sonicscan.org

## 📚 Resources

- [Sonic Documentation](https://docs.soniclabs.com)
- [Algebra Protocol](https://algebra.finance)
- [SwapX DEX](https://swapx.finance) (Coming to Sonic)
- [RainbowKit Documentation](https://rainbowkit.com)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Note**: This DEX is currently in preview mode. Full trading functionality will be available once SwapX (Algebra protocol) is deployed on Sonic mainnet.
