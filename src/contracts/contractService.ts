
import { ethers } from 'ethers';
import { toast } from 'sonner';
import { CONTRACT_ADDRESSES, NETWORK_CONFIG } from './config';
import FactoryABI from './abis/CradleFactory.json';
import RaiseABI from './abis/CradleRaise.json';
import ERC20ABI from './abis/ERC20.json';

// Check if window.ethereum exists
const getProvider = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethers.BrowserProvider(window.ethereum);
  }
  throw new Error('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
};

// Request user to connect to MetaMask
export const connectWallet = async () => {
  try {
    const provider = getProvider();
    const accounts = await provider.send('eth_requestAccounts', []);
    
    // Check if connected to correct network
    await switchToSonicNetwork();
    
    return accounts[0];
  } catch (error) {
    console.error('Error connecting to wallet:', error);
    toast.error('Failed to connect wallet');
    throw error;
  }
};

// Switch to Sonic Testnet
export const switchToSonicNetwork = async () => {
  try {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        // Try to switch to the network
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: NETWORK_CONFIG.chainId }],
        });
      } catch (switchError: any) {
        // If the network doesn't exist, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [NETWORK_CONFIG],
          });
        } else {
          throw switchError;
        }
      }
    }
  } catch (error) {
    console.error('Error switching network:', error);
    toast.error('Failed to switch to Sonic Testnet');
    throw error;
  }
};

// Get user balance
export const getBalance = async (address: string) => {
  try {
    const provider = getProvider();
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance);
  } catch (error) {
    console.error('Error getting balance:', error);
    return '0';
  }
};

// Get factory contract
export const getFactoryContract = async (withSigner = false) => {
  try {
    const provider = getProvider();
    const factory = new ethers.Contract(
      CONTRACT_ADDRESSES.FACTORY,
      FactoryABI,
      withSigner ? await provider.getSigner() : provider
    );
    return factory;
  } catch (error) {
    console.error('Error getting factory contract:', error);
    throw error;
  }
};

// Get raise contract
export const getRaiseContract = async (raiseAddress: string, withSigner = false) => {
  try {
    const provider = getProvider();
    const raise = new ethers.Contract(
      raiseAddress,
      RaiseABI,
      withSigner ? await provider.getSigner() : provider
    );
    return raise;
  } catch (error) {
    console.error('Error getting raise contract:', error);
    throw error;
  }
};

// Get ERC20 contract
export const getERC20Contract = async (tokenAddress: string, withSigner = false) => {
  try {
    const provider = getProvider();
    const token = new ethers.Contract(
      tokenAddress,
      ERC20ABI,
      withSigner ? await provider.getSigner() : provider
    );
    return token;
  } catch (error) {
    console.error('Error getting token contract:', error);
    throw error;
  }
};

// Get all deployed raises
export const getAllRaises = async () => {
  try {
    const factory = await getFactoryContract();
    const raises = await factory.getDeployedRaises();
    return raises;
  } catch (error) {
    console.error('Error getting deployed raises:', error);
    return [];
  }
};

// Check if user is factory owner
export const isFactoryOwner = async (address: string) => {
  try {
    const factory = await getFactoryContract();
    const owner = await factory.owner();
    return owner.toLowerCase() === address.toLowerCase();
  } catch (error) {
    console.error('Error checking if user is factory owner:', error);
    return false;
  }
};

// Create a new raise
export const createRaise = async (raiseParams: {
  token: string;
  acceptedToken: string;
  pricePerToken: string;
  presaleStart: number;
  publicSaleStart: number;
  endTime: number;
  merkleRoot: string;
  raiseOwner: string;
  feeRecipient: string;
  feePercentBasisPoints: number;
  maxAcceptedTokenRaise: string;
  minTokenAllocation: string;
  maxTokenAllocation: string;
}) => {
  try {
    const factory = await getFactoryContract(true);
    
    const tx = await factory.createRaise(
      raiseParams.token,
      raiseParams.acceptedToken,
      ethers.parseUnits(raiseParams.pricePerToken, 18), // Adjust decimals as needed
      raiseParams.presaleStart,
      raiseParams.publicSaleStart,
      raiseParams.endTime,
      raiseParams.merkleRoot,
      raiseParams.raiseOwner,
      raiseParams.feeRecipient,
      raiseParams.feePercentBasisPoints,
      ethers.parseUnits(raiseParams.maxAcceptedTokenRaise, 18), // Adjust decimals as needed
      ethers.parseUnits(raiseParams.minTokenAllocation, 18), // Adjust decimals as needed
      ethers.parseUnits(raiseParams.maxTokenAllocation, 18) // Adjust decimals as needed
    );
    
    const receipt = await tx.wait();
    
    // Find the RaiseCreated event to get the new raise address
    const events = receipt.logs.filter((log: any) => {
      try {
        const parsedLog = factory.interface.parseLog(log);
        return parsedLog && parsedLog.name === 'RaiseCreated';
      } catch {
        return false;
      }
    });
    
    if (events && events.length > 0) {
      const parsedLog = factory.interface.parseLog(events[0]);
      return parsedLog.args.newRaiseAddress;
    }
    
    throw new Error('Failed to create raise: Could not find RaiseCreated event');
  } catch (error) {
    console.error('Error creating raise:', error);
    toast.error('Failed to create raise');
    throw error;
  }
};

// Check allowance for spending tokens
export const checkAllowance = async (tokenAddress: string, ownerAddress: string, spenderAddress: string) => {
  try {
    const tokenContract = await getERC20Contract(tokenAddress);
    const allowance = await tokenContract.allowance(ownerAddress, spenderAddress);
    return allowance.toString();
  } catch (error) {
    console.error('Error checking allowance:', error);
    return '0';
  }
};

// Approve tokens for spending
export const approveToken = async (tokenAddress: string, spenderAddress: string, amount: string) => {
  try {
    const tokenContract = await getERC20Contract(tokenAddress, true);
    const tx = await tokenContract.approve(spenderAddress, ethers.parseUnits(amount, 18)); // Adjust decimals as needed
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error approving token:', error);
    toast.error('Failed to approve token');
    return false;
  }
};

// Contribute to a raise
export const contribute = async (raiseAddress: string, tokenAmountToBuy: string, merkleProof: string[] = []) => {
  try {
    const raiseContract = await getRaiseContract(raiseAddress, true);
    const tx = await raiseContract.contribute(
      ethers.parseUnits(tokenAmountToBuy, 18), // Adjust decimals as needed
      merkleProof
    );
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error contributing to raise:', error);
    toast.error('Failed to contribute');
    return false;
  }
};

// Get user contribution for a raise
export const getUserContribution = async (raiseAddress: string, userAddress: string) => {
  try {
    const raiseContract = await getRaiseContract(raiseAddress);
    const contribution = await raiseContract.getContribution(userAddress);
    return ethers.formatUnits(contribution, 18); // Adjust decimals as needed
  } catch (error) {
    console.error('Error getting user contribution:', error);
    return '0';
  }
};

// Finalize a raise
export const finalizeRaise = async (raiseAddress: string) => {
  try {
    const raiseContract = await getRaiseContract(raiseAddress, true);
    const tx = await raiseContract.finalizeRaise();
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error finalizing raise:', error);
    toast.error('Failed to finalize raise');
    return false;
  }
};

// Cancel a raise
export const cancelRaise = async (raiseAddress: string) => {
  try {
    const raiseContract = await getRaiseContract(raiseAddress, true);
    const tx = await raiseContract.cancelSale();
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error cancelling raise:', error);
    toast.error('Failed to cancel raise');
    return false;
  }
};

// Sweep funds from a raise
export const sweepRaise = async (raiseAddress: string) => {
  try {
    const raiseContract = await getRaiseContract(raiseAddress, true);
    const tx = await raiseContract.sweep();
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error sweeping funds:', error);
    toast.error('Failed to sweep funds');
    return false;
  }
};

// Get details about a raise
export const getRaiseDetails = async (raiseAddress: string) => {
  try {
    const raiseContract = await getRaiseContract(raiseAddress);
    
    const tokenAddress = await raiseContract.token();
    const acceptedTokenAddress = await raiseContract.acceptedToken();
    const pricePerToken = await raiseContract.pricePerToken();
    const presaleStart = await raiseContract.presaleStart();
    const publicSaleStart = await raiseContract.publicSaleStart();
    const endTime = await raiseContract.endTime();
    const owner = await raiseContract.owner();
    const feeRecipient = await raiseContract.feeRecipient();
    const feePercentBasisPoints = await raiseContract.feePercentBasisPoints();
    const maxAcceptedTokenRaise = await raiseContract.maxAcceptedTokenRaise();
    const minTokenAllocation = await raiseContract.minTokenAllocation();
    const maxTokenAllocation = await raiseContract.maxTokenAllocation();
    const merkleRoot = await raiseContract.merkleRoot();
    const totalAcceptedTokenRaised = await raiseContract.totalAcceptedTokenRaised();
    const isFinalized = await raiseContract.isFinalized();
    const isCancelled = await raiseContract.isCancelled();
    
    // Get token details
    const tokenContract = await getERC20Contract(tokenAddress);
    const acceptedTokenContract = await getERC20Contract(acceptedTokenAddress);
    
    const tokenName = await tokenContract.name();
    const tokenSymbol = await tokenContract.symbol();
    const acceptedTokenSymbol = await acceptedTokenContract.symbol();
    
    // Determine status
    let status: 'upcoming' | 'presale' | 'public' | 'ended' | 'cancelled' | 'finalized' = 'upcoming';
    
    const now = Math.floor(Date.now() / 1000);
    
    if (isCancelled) {
      status = 'cancelled';
    } else if (isFinalized) {
      status = 'finalized';
    } else if (now >= presaleStart && now < publicSaleStart) {
      status = 'presale';
    } else if (now >= publicSaleStart && now < endTime) {
      status = 'public';
    } else if (now >= endTime) {
      status = 'ended';
    } else {
      status = 'upcoming';
    }
    
    return {
      address: raiseAddress,
      token: tokenAddress,
      tokenName,
      tokenSymbol,
      acceptedToken: acceptedTokenAddress,
      acceptedTokenSymbol,
      pricePerToken: ethers.formatUnits(pricePerToken, 18), // Adjust decimals as needed
      presaleStart: Number(presaleStart) * 1000, // Convert to milliseconds
      publicSaleStart: Number(publicSaleStart) * 1000, // Convert to milliseconds
      endTime: Number(endTime) * 1000, // Convert to milliseconds
      owner,
      feeRecipient,
      feePercentBasisPoints: Number(feePercentBasisPoints),
      maxAcceptedTokenRaise: ethers.formatUnits(maxAcceptedTokenRaise, 18), // Adjust decimals as needed
      minTokenAllocation: ethers.formatUnits(minTokenAllocation, 18), // Adjust decimals as needed
      maxTokenAllocation: ethers.formatUnits(maxTokenAllocation, 18), // Adjust decimals as needed
      merkleRoot,
      totalAcceptedTokenRaised: ethers.formatUnits(totalAcceptedTokenRaised, 18), // Adjust decimals as needed
      isFinalized,
      isCancelled,
      status,
    };
  } catch (error) {
    console.error('Error getting raise details:', error);
    throw error;
  }
};
