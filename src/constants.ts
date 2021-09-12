import flashNftAbi from "./contract/flashNft.json";

// todo: Remove infura configuration
const infura = "199fffdf0b984fc38cad75f86542088c";

export const RpcUrls = {
  1: `https://mainnet.infura.io/v3/${infura}`,
  4: `https://rinkeby.infura.io/v3/${infura}`,
};

export const ConnectorNames = {
  Injected: "Injected",
  Network: "Network",
};

export const contractConf = {
  flashNft: "0x40Ff589092a59D565e8eC1B587700D7fb35cd9Fd",
  flashNftAbi,
};
