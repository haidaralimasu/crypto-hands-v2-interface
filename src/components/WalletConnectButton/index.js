import React, { useEffect, useState } from "react";
import { useEthers, FantomTestnet } from "@usedapp/core";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Torus from "@toruslabs/torus-embed";
import { infuraId } from "../../config";

const WalletConnectButton = () => {
  const { account, activate, deactivate, chainId, switchNetwork } = useEthers();
  const [activateError, setActivateError] = useState("");
  const { error } = useEthers();
  useEffect(() => {
    if (error && account) {
      setActivateError(error.message);
      return;
    }
    setActivateError("");

    if (chainId != FantomTestnet.chainId) {
      switchNetwork(FantomTestnet.chainId);
    }
  }, [error, account]);

  console.log(process.env.INFURA_PROJECT_ID);

  const activateProvider = async () => {
    const providerOptions = {
      injected: {
        display: {
          name: "Metamask",
          description: "Connect with the provider in your Browser",
        },
        package: null,
      },
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          bridge: "https://bridge.walletconnect.org",
          infuraId: infuraId,
        },
      },
      coinbasewallet: {
        package: CoinbaseWalletSDK,
        options: {
          appName: "Rock Paper Scissors",
          infuraId: "",
          rpc: "https://rpc.ankr.com/fantom_testnet",
          chainId: FantomTestnet.chainId,
          darkMode: false,
        },
      },
      torus: {
        package: Torus,
        options: {
          networkParams: {
            host: `https://rpc.ankr.com/fantom_testnet`,
            chainId: FantomTestnet.chainId,
            networkId: FantomTestnet.chainId,
          },
          config: {
            buildEnv: "development",
          },
        },
      },
    };

    const web3Modal = new Web3Modal({
      providerOptions,
    });
    try {
      const provider = await web3Modal.connect();
      await activate(provider);
      setActivateError("");
    } catch (error) {
      setActivateError(error.message);
    }
  };

  return (
    <div>
      {account ? (
        <div className="btn btn-danger" onClick={() => deactivate()}>
          Disconnect
        </div>
      ) : (
        <button className="btn btn-success" onClick={activateProvider}>
          Connect
        </button>
      )}
    </div>
  );
};

export default WalletConnectButton;
