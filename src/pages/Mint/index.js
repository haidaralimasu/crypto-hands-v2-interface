import React, { useState } from "react";
import {
  useMaxSupply,
  useTotalSupply,
  useCost,
  useMaxPerAccount,
  useMaxPerTransaction,
} from "../../hooks";
import { useEthers } from "@usedapp/core";
import { formatEther } from "ethers/lib/utils";
import { ethers } from "ethers";
import { notify } from "../../helpers/alerts";
import { cryptoHandsAddress } from "../../config";
import { cryptoHandsInterface } from "../../sdk";

const Mint = () => {
  const { account } = useEthers();
  const [amount, setAmount] = useState(1);

  const totalSupply = useTotalSupply();
  const maxSupply = useMaxSupply();
  const cost = useCost();
  const maxPerAcc = useMaxPerAccount();
  const maxPerTx = useMaxPerTransaction();

  const formattedTotalSupply = totalSupply ? totalSupply.toNumber() : 0;
  const formattedMaxSupply = maxSupply ? maxSupply.toNumber() : 0;
  const formattedCost = cost ? cost.toString() : 0;
  const formattedPerAcc = maxPerAcc ? maxPerAcc.toNumber() : 0;
  const formattedMaxPerTx = maxPerTx ? maxPerTx.toNumber() : 0;

  const increase = () => {
    if (amount < formattedMaxPerTx) {
      setAmount(amount + 1);
    }
  };

  const decrease = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const mint = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const txCost = amount * Number(formattedCost);
      const formattedTxCost = txCost.toString();

      const contract = new ethers.Contract(
        cryptoHandsAddress,
        cryptoHandsInterface,
        signer
      );

      let tx = await contract.mintHands(amount, { value: formattedTxCost });
      await notify(
        "Waiting for Confirmation",
        "Please Wait while confirmation of transaction",
        "info"
      );
      await tx.wait();

      await notify(
        "Bet Successfull",
        "You have successfully minted",
        "success"
      );
    } catch (error) {
      // notify("Error", "Something Went Wrong While Minting", "error");
      notify(error);
      console.log(error);
    }
  };

  return (
    <div>
      <div
        style={{ flexDirection: "column" }}
        className="d-flex justify-content-center  align-items-center"
      >
        <h1 className="my-4">
          {formattedTotalSupply}/{formattedMaxSupply}
        </h1>
        <h3 className="my-2">
          Price Per NFT: {formatEther(formattedCost)}{" "}
          {ethers.constants.EtherSymbol}
        </h3>

        {account ? (
          <div className="my-4">
            <button onClick={() => decrease()} className="btn btn-primary mx-2">
              -
            </button>
            <button onClick={() => mint()} className="btn btn-primary mx-2">
              Mint {amount} for {amount * formatEther(formattedCost)}{" "}
              {ethers.constants.EtherSymbol}
            </button>
            <button onClick={() => increase()} className="btn btn-primary mx-2">
              +
            </button>
          </div>
        ) : (
          <button className="btn btn-primary my-4">
            Please Connect Your Wallet
          </button>
        )}
      </div>
    </div>
  );
};

export default Mint;
