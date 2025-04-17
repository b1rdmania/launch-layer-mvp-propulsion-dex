interface RequestArguments {
  method: string;
  params?: unknown[] | object;
}

interface EthereumProvider {
  isMetaMask?: boolean;
  once(eventName: string | symbol, listener: (...args: any[]) => void): this;
  on(eventName: string | symbol, listener: (...args: any[]) => void): this;
  off(eventName: string | symbol, listener: (...args: any[]) => void): this;
  addListener(
    eventName: string | symbol,
    listener: (...args: any[]) => void,
  ): this;
  removeListener(
    eventName: string | symbol,
    listener: (...args: any[]) => void,
  ): this;
  removeAllListeners(event?: string | symbol): this;
  request(args: RequestArguments): Promise<unknown>;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

export {};
