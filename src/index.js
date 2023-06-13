import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DAppProvider, FantomTestnet } from "@usedapp/core";

const config = {
  readOnlyChainId: FantomTestnet.chainId,
  readOnlyUrls: {
    [FantomTestnet.chainId]: `https://rpc.ankr.com/fantom_testnet`,
  },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>
);
