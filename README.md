# PropulsionDEX

A decentralized exchange (DEX) built for Sonic blockchain, powered by SilverSwap (Algebra Protocol). Trade tokens, provide liquidity, and earn fees in a professional, user-friendly interface.

## 🚀 Features

- **Token Swapping**: Trade between wS, WETH, USDC, and USDT with deep liquidity
- **Liquidity Provision**: Add liquidity to earn trading fees
- **Position Management**: Track and manage your LP NFT positions
- **Wallet Integration**: Support for MetaMask, WalletConnect, and more
- **Mobile Responsive**: Optimized for all devices
- **Real-time Quotes**: Live price updates powered by SilverSwap

## 🌐 Live Demo

**Production**: [https://launch-layer-mvp-propulsion-dex.vercel.app](https://launch-layer-mvp-propulsion-dex.vercel.app)

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Web3**: ethers.js, wagmi, RainbowKit
- **DEX Protocol**: SilverSwap (Algebra Protocol)
- **Blockchain**: Sonic Mainnet
- **Deployment**: Vercel

## 🔧 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MetaMask or compatible wallet

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/b1rdmania/launch-layer-mvp-propulsion-dex.git
   cd launch-layer-mvp-propulsion-dex
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🌊 Smart Contract Addresses

### Sonic Native Tokens
- **Wrapped S (wS)**: `0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38`
- **WETH**: `0x50c42dEAcD8Fc9773493ED674b675bE577f2634b`
- **USDC**: `0x29219dd400f2Bf60E5a23d13Be72B486D4038894`
- **USDT**: `0x6047828dc181963ba44974801ff68e538da5eaf9`

### SilverSwap (Algebra DEX) Contracts - LIVE!
Source: [SilverSwap Documentation](https://docs.silverswap.io/silverswap/technical-details/editor)

- **Quoter**: `0xe1181313a39d850d3A20F11FF1A6a94a29A09404`
- **Swap Router**: `0x4882198dd2064D1E35b24735e6B9E5e3B45AcD6b`
- **NFT Position Manager**: `0x5084E9fDF9264489A14E77c011073D757e572bB4`
- **Factory**: `0xb860200BD68dc39cEAfd6ebb82883f189f4CdA76`
- **Vault**: `0x5bE5f71bC89a2E5Fdbbb2D9Aeff1F4a38d5870F7`

## 🔄 Network Details

Add Sonic to your wallet:
- **Network Name**: Sonic
- **RPC URL**: https://rpc.soniclabs.com
- **Chain ID**: 146
- **Currency Symbol**: S
- **Block Explorer**: https://sonicscan.org

## 📚 Resources

- [Sonic Documentation](https://docs.soniclabs.com)
- [SilverSwap Documentation](https://docs.silverswap.io)
- [Algebra Protocol](https://algebra.finance)
- [RainbowKit Documentation](https://rainbowkit.com)

## 🎯 Usage Guide

### 1. Connect Your Wallet
1. Click "Connect Wallet" in the top right
2. Choose your preferred wallet (MetaMask recommended)
3. Ensure you're on Sonic Mainnet (Chain ID: 146)

### 2. Swap Tokens
1. Navigate to the "Swap" tab
2. Select input token and amount
3. Review the quote and exchange rate
4. Click "Swap Tokens" and confirm in your wallet

### 3. Add Liquidity
1. Go to the "Add Liquidity" tab
2. Enter amounts for both tokens
3. Review pool information
4. Click "Add Liquidity" and confirm transactions

### 4. Manage Positions
1. Visit the "My Positions" tab
2. View your LP NFT positions
3. Track earned fees
4. Remove liquidity when desired

## 🚀 Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy with default settings

3. **Configure Domain** (optional)
   - Add custom domain in Vercel dashboard
   - Update DNS records as instructed

## 🧪 Testing

```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🔗 Links

- **Live App**: https://launch-layer-mvp-propulsion-dex.vercel.app
- **GitHub**: https://github.com/b1rdmania/launch-layer-mvp-propulsion-dex
- **SilverSwap**: https://docs.silverswap.io
- **Sonic Labs**: https://soniclabs.com

---

**Built with ❤️ for the Sonic ecosystem**

> **📅 Latest Update (December 19, 2024):** Enhanced documentation and project overview. PropulsionDEX continues to grow as the premier DEX on Sonic blockchain!
