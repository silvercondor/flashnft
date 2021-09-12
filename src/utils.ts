// @ts-nocheck
import { UnsupportedChainIdError } from "@web3-react/core";
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorFrame } from "@web3-react/frame-connector";
import { Web3Provider } from "@ethersproject/providers";
import { RpcUrls } from "./constants";
import { defaultChainId } from "./connectors";
import store from "./store";

export const getLibrary = (provider: any): Web3Provider => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
};

export const getProvider = () => {
  let provider;
  if (typeof window.web3 !== "undefined") {
    provider = new Web3(window.web3.currentProvider);
  } else {
    provider = new Web3(
      new Web3.providers.HttpProvider(RpcUrls[defaultChainId])
    );
  }
  return provider;
};

export const getContract = (abi: any, addr: string) => {
  const provider = getProvider();
  return new provider.eth.Contract(abi, addr);
};

export const getErrorMessage = (error: Error) => {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  }
  if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  }
  if (
    error instanceof UserRejectedRequestErrorInjected ||
    error instanceof UserRejectedRequestErrorFrame
  ) {
    return "Please authorize this website to access your Ethereum account.";
  }
  return "An unknown error occurred. Check the console for more details.";
};

export const checkSum = (addr: string) => {
  const provider = getProvider();
  return provider.utils.toChecksumAddress(addr);
};

export const toWei = (amount: any) => {
  const provider = getProvider();
  return provider.utils.toWei(`${amount}`);
};

export const fromWei = (amount: any) => {
  const provider = getProvider();
  return provider.utils.fromWei(amount);
};

export const formatAddress = (address: string | undefined): string => {
  if (!address) {
    return "";
  }
  return `${address.substring(0, 4)}...${address.slice(-2)}`;
};

export const getBalance = async (contract: any, account?: string | null) => {
  try {
    if (!account || account == null) {
      return;
    }
    const balanceRes = await contract.methods.balanceOf(account).call();
    store.setState({ balance: fromWei(balanceRes) });
  } catch (error) {
    console.log(error);
  }
};

export const isNum = (num) => /^\d+$/.test(num);
