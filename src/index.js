import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { DAppProvider, Mumbai } from "@usedapp/core";
import { infuraId } from "./config";

const config = {
  readOnlyChainId: Mumbai.chainId,
  readOnlyUrls: {
    [Mumbai.chainId]: `https://polygon-mumbai.infura.io/v3/${infuraId}`,
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
