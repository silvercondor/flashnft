import React from "react";

import Account from "../../components/account";
import Balance from "../../components/balance";
import ConnectWallet from "../../components/connectWallet";

export default function Header() {
  return (
    <div className="headerWrap">
      <div className="tip">
        Current network environment: eth-mainnet, please use it after connecting
        to the wallet.
      </div>
      <div className="header">
        <Account />
        <Balance />
        <ConnectWallet />
      </div>
    </div>
  );
}
