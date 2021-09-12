import { InjectedConnector } from "@web3-react/injected-connector";
import { NetworkConnector } from "@web3-react/network-connector";
import { ConnectorNames, RpcUrls } from "./constants";

export const injected = new InjectedConnector({
  supportedChainIds: [1, 4],
});

export const defaultChainId = 4;

export const network = new NetworkConnector({
  urls: { 1: RpcUrls[1], 4: RpcUrls[4] },
  defaultChainId,
});

export const connectorsByName = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.Network]: network,
};

export default connectorsByName;
