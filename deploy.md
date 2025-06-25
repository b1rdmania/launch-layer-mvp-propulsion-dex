# PropulsionDEX Deployment Guide

## 🚀 Quick Deploy to Vercel

### Option 1: One-Click Deploy
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/PropulsionDEX)

### Option 2: Manual Deployment

#### Prerequisites
- GitHub account
- Vercel account (free)
- Git installed

#### Steps

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial PropulsionDEX deployment"
   git remote add origin https://github.com/yourusername/PropulsionDEX.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Configuration**
   - No additional environment variables needed
   - The app is pre-configured for Sonic mainnet
   - Domain will be: `your-app-name.vercel.app`

#### Build Commands (Auto-detected)
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## 🔧 Alternative Hosting Options

### Netlify
1. Connect GitHub repository
2. Build command: `npm run build && npm run export`
3. Publish directory: `out`

### Railway
1. Connect GitHub repository
2. Add environment variable: `PORT=3000`
3. Railway will auto-deploy

### Self-Hosted (VPS/Server)
```bash
# Install Node.js and PM2
npm install -g pm2

# Clone and build
git clone https://github.com/yourusername/PropulsionDEX.git
cd PropulsionDEX/launch-layer-mvp-propulsion-dex
npm install
npm run build

# Start with PM2
pm2 start npm --name "propulsion-dex" -- start
pm2 save
pm2 startup
```

## 🌐 Custom Domain Setup

### Vercel Custom Domain
1. Go to your Vercel project dashboard
2. Click "Domains"
3. Add your custom domain
4. Configure DNS records as shown

### DNS Configuration
```
Type: CNAME
Name: @ (or www)
Value: your-app-name.vercel.app
```

## 📱 Testing Deployment

After deployment, test these features:
- [ ] Wallet connection (MetaMask, WalletConnect)
- [ ] Sonic network detection
- [ ] UI responsiveness
- [ ] Error handling for missing contracts

## 🔄 Updating Contract Addresses

When SwapX deploys on Sonic:

1. Update `app/contracts.ts`:
   ```typescript
   export const QUOTER_V2_ADDRESS = "0x..."; // SwapX Quoter
   export const SWAP_ROUTER_ADDRESS = "0x..."; // SwapX Router
   export const NONFUNGIBLE_POSITION_MANAGER_ADDRESS = "0x..."; // SwapX Position Manager
   ```

2. Redeploy:
   ```bash
   git add app/contracts.ts
   git commit -m "Update SwapX contract addresses"
   git push origin main
   ```

3. Vercel will auto-deploy the updates

## 📊 Monitoring

### Vercel Analytics
- Enable in Vercel dashboard
- Monitor performance and usage
- Track user engagement

### Error Tracking
Consider adding:
- Sentry for error tracking
- LogRocket for user session recording
- Web3 error monitoring

## 🎯 Go Live Checklist

- [ ] Build completes successfully
- [ ] All wallet connections work
- [ ] Sonic network is properly configured
- [ ] UI is responsive on mobile/desktop
- [ ] Error states display properly
- [ ] README is updated
- [ ] Domain is configured (optional)
- [ ] SSL certificate is active
- [ ] Performance is optimized

## 📞 Support

If you encounter deployment issues:
1. Check Vercel build logs
2. Verify all dependencies are installed
3. Ensure Node.js version compatibility
4. Review error messages in browser console

---

🎉 **Your PropulsionDEX is ready to go live on Sonic!** 