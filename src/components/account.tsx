import React from "react";
import { useWeb3React } from "@web3-react/core";
import { formatAddress } from "../utils";

export default function Account() {
  const { account } = useWeb3React();

  return (
    <span>
      <span>Address: </span>
      <span>{account === null ? "-" : formatAddress(account) || "-"}</span>
    </span>
  );
}
