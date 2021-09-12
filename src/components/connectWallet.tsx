import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { useEagerConnect, useInactiveListener } from "../hooks";
import { connectorsByName } from "../connectors";
import { ConnectorNames } from "../constants";

export default function ConnectWallet() {
  const context = useWeb3React<Web3Provider>();
  const { connector, activate, deactivate } = context;
  const [activatingConnector, setActivatingConnector] = React.useState<any>();
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector);

  return (
    <>
      {[ConnectorNames.Injected].map((name) => {
        const currentConnector = connectorsByName[name];
        const connected = currentConnector === connector;

        return (
          <div
            key={name}
            onClick={() => {
              setActivatingConnector(currentConnector);
              activate(connectorsByName[name]);
            }}
          >
            <div style={{ cursor: "pointer" }}>
              {connected ? (
                <div onClick={deactivate}>Logout</div>
              ) : (
                <div>Connect</div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}
