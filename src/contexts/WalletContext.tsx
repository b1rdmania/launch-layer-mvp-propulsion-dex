import React, { createContext, useState, useContext, useEffect } from "react";
import { toast } from "sonner";
import {
  connectWallet,
  getBalance,
  switchToSonicNetwork,
} from "@/contracts/contractService";
import { DESIGN_SYSTEM } from "@/contracts/config";

type WalletContextType = {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  balance: string;
  network: string;
  connect: () => Promise<void>;
  disconnect: () => void;
};

const WalletContext = createContext<WalletContextType>({
  address: null,
  isConnected: false,
  isConnecting: false,
  balance: "0",
  network: "Sonic Testnet",
  connect: async () => {},
  disconnect: () => {},
});

export const useWallet = () => useContext(WalletContext);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [balance, setBalance] = useState("0");
  const [network, setNetwork] = useState("Sonic Testnet");

  // Check if wallet is already connected
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          if (accounts.length > 0) {
            setAddress(accounts[0]);
            setIsConnected(true);
            const userBalance = await getBalance(accounts[0]);
            setBalance(userBalance);
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error);
        }
      }
    };

    checkConnection();
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected
          disconnect();
        } else if (accounts[0] !== address) {
          // User switched accounts
          setAddress(accounts[0]);
          setIsConnected(true);
          getBalance(accounts[0]).then(setBalance);
          toast.info("Account changed", {
            style: {
              background: DESIGN_SYSTEM.colors.secondaryBackground,
              color: DESIGN_SYSTEM.colors.primaryText,
              border: `1px solid ${DESIGN_SYSTEM.colors.secondaryText}`,
            },
          });
        }
      };

      const handleChainChanged = () => {
        // Refresh on chain change
        window.location.reload();
      };

      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", handleChainChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener(
            "accountsChanged",
            handleAccountsChanged,
          );
          window.ethereum.removeListener("chainChanged", handleChainChanged);
        }
      };
    }
  }, [address]);

  const connect = async () => {
    try {
      setIsConnecting(true);

      const userAddress = await connectWallet();

      setAddress(userAddress);
      setIsConnected(true);

      const userBalance = await getBalance(userAddress);
      setBalance(userBalance);

      setIsConnecting(false);
      toast.success("Wallet connected successfully", {
        style: {
          background: DESIGN_SYSTEM.colors.secondaryBackground,
          color: DESIGN_SYSTEM.colors.primaryText,
          border: `1px solid ${DESIGN_SYSTEM.colors.secondaryText}`,
        },
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
      toast.error("Failed to connect wallet", {
        style: {
          background: DESIGN_SYSTEM.colors.secondaryBackground,
          color: DESIGN_SYSTEM.colors.primaryText,
          border: `1px solid ${DESIGN_SYSTEM.colors.secondaryText}`,
        },
      });
      setIsConnecting(false);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setIsConnected(false);
    setBalance("0");
    toast.info("Wallet disconnected", {
      style: {
        background: DESIGN_SYSTEM.colors.secondaryBackground,
        color: DESIGN_SYSTEM.colors.primaryText,
        border: `1px solid ${DESIGN_SYSTEM.colors.secondaryText}`,
      },
    });
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

// Add type declarations for window.ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}
