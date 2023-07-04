import React, { useState } from "react";
import { useEthers, useEtherBalance, shortenAddress } from "@usedapp/core";
import { ethers } from "ethers";
import { rpsAddress } from "../../config";
import { rpsInterface } from "../../sdk";
import { notify } from "../../helpers/alerts";
import { useBalanceOf, useGetClaimableAmount } from "../../hooks";
import { formatEther } from "ethers/lib/utils";

import { useGetPlayer } from "../../hooks";

const PersonalStats = () => {
  const { account } = useEthers();
  const userAccount = account ? account : ethers.constants.AddressZero;
  const etherBalance = useEtherBalance(account);
  const cryptoHandsBalance = useBalanceOf(userAccount);
  const formattedCryptoHandsBalance = cryptoHandsBalance
    ? cryptoHandsBalance.toString()
    : 0;
  const userBalance = etherBalance ? etherBalance : 0;

  const player = useGetPlayer(userAccount);

  const [copyLink, setCopyLink] = useState(false);
  const claimableAmount = useGetClaimableAmount(userAccount);
  const formattedClaimableAmount = claimableAmount
    ? claimableAmount.toString()
    : 0;

  const formattedPlayer = player
    ? player.toString().split(",")
    : [0, 0, 0, 0, 0, 0, 0, 0, ethers.constants.AddressZero];

  const copyToClip = async (text) => {
    await navigator.clipboard.writeText(text);
    setCopyLink(true);
  };

  const claim = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    try {
      const rpsContract = await new ethers.Contract(
        rpsAddress,
        rpsInterface,
        signer
      );

      let tx = await rpsContract.claim();
      await notify(
        "Waiting for confirmation",
        "waiting for blockchain confirmation",
        "info"
      );
      await tx.wait();

      await notify("Success", "Succesfully claimed", "success");
    } catch (error) {
      await notify("Error", "Something went wrong", "error");
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div class="card" style={{ width: "15rem" }}>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            Account: {shortenAddress(userAccount)}
          </li>
          <li class="list-group-item">
            Balance: {ethers.utils.formatEther(userBalance)}
          </li>
          <li class="list-group-item">
            Total Games Played: {formattedPlayer[0]}
          </li>
        </ul>
      </div>

      <div class="card" style={{ width: "15rem" }}>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Games Won: {formattedPlayer[1]}</li>
          <li class="list-group-item">
            Total Earnings: {ethers.utils.formatEther(formattedPlayer[2])}
          </li>
          <li class="list-group-item">
            Referral Earnings: {ethers.utils.formatEther(formattedPlayer[3])}
          </li>
        </ul>
      </div>

      <div class="card" style={{ width: "15rem" }}>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Referrals: {formattedPlayer[4]}</li>
          <li class="list-group-item">
            Total NFT Balance:{" "}
            {Number(formattedPlayer[5]) + Number(formattedCryptoHandsBalance)}
          </li>
          <li class="list-group-item">
            NFT Win Percentage: {formattedPlayer[6] / 100000000} %
          </li>
        </ul>
      </div>

      <div class="card" style={{ width: "15em" }}>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            Refree NFT Percentage: {(formattedPlayer[7] / 10000).toFixed(4)} %
          </li>
          <li class="list-group-item">
            Refree: {shortenAddress(formattedPlayer[8])}
          </li>
          <li class="list-group-item">
            Refrral Link:{" "}
            <button
              onClick={() => {
                copyToClip(window.location.host + "/?refrrer=" + userAccount);
              }}
              className="btn btn-primary"
            >
              {copyLink ? "Copied" : "Copy Link"}
            </button>
          </li>
        </ul>
      </div>

      <div class="card" style={{ width: "15rem" }}>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            Claimable Amount: {formatEther(formattedClaimableAmount)}
          </li>
          <li class="list-group-item">
            Claim Status:{" "}
            {cryptoHandsBalance > 0 ? (
              <button onClick={() => claim()} className="btn btn-primary">
                Claim{" "}
              </button>
            ) : (
              <button className="btn btn-primary">
                You cannot claim rewards
              </button>
            )}
          </li>
          <li class="list-group-item">
            NFT Win Percentage: {(formattedPlayer[6] / 100000).toFixed(4)} %
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PersonalStats;
