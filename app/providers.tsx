"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { defineChain } from "viem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { 
  RainbowKitProvider, 
  getDefaultWallets,
  connectorsForWallets 
} from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';

const projectId = "1c6eba6fc7f6b210609dbd6cccef8199";

// Define Sonic mainnet
const sonic = defineChain({
  id: 146,
  name: 'Sonic',
  nativeCurrency: {
    decimals: 18,
    name: 'S',
    symbol: 'S',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.soniclabs.com'],
    },
    public: {
      http: ['https://rpc.soniclabs.com'],
    },
  },
  blockExplorers: {
    default: { name: 'SonicScan', url: 'https://sonicscan.org' },
  },
});

const { wallets } = getDefaultWallets({
  appName: 'Propulsion DEX',
  projectId,
});

const connectors = connectorsForWallets(wallets, {
  appName: 'Propulsion DEX',
  projectId,
});

const config = createConfig({
  chains: [sonic],
  transports: {
    [sonic.id]: http(),
  },
  connectors,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
} 