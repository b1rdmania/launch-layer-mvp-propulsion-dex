
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from "sonner";

type WalletContextType = {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  balance: string;
  network: string;
  connect: () => void;
  disconnect: () => void;
};

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnected: false,
  isConnecting: false,
  balance: '0',
  network: '',
  connect: () => {},
  disconnect: () => {},
});

export const useWallet = () => useContext(WalletContext);

// Mock wallet provider for the MVP
export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState('0');
  const [network, setNetwork] = useState('Sonic Testnet');

  // Mock connect function
  const connect = async () => {
    try {
      setIsConnecting(true);
      // In a real implementation, we would use a wallet provider like Wagmi
      // This is a placeholder for demo purposes
      setTimeout(() => {
        setAddress('0x123...abc');
        setIsConnected(true);
        setBalance('10000');
        setIsConnecting(false);
        toast.success("Wallet connected successfully");
      }, 1000);
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error("Failed to connect wallet");
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
    setBalance('0');
    toast.info("Wallet disconnected");
  };

  return (
    <WalletContext.Provider
      value={{
        address,
        isConnected,
        isConnecting,
        balance,
        network,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
