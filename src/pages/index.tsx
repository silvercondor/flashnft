import React from "react";
import { Web3ReactProvider } from "@web3-react/core";
import { getLibrary } from "../utils";
import Header from "./header";
import FindToken from "./findToken";
import Footer from "./footer";

import "./index.css";

function App() {
  return (
    <>
      <Header />
      <FindToken />
      <Footer />
    </>
  );
}

export default () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  );
};
