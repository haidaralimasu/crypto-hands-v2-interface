import React, { useState } from "react";
import { useEthers, useEtherBalance, shortenAddress } from "@usedapp/core";
import { ethers } from "ethers";
import {
  useNftWinPercentage,
  useGamesPlayed,
  useGamesWon,
  useNftWon,
} from "../../hooks";
import { rpsAddress } from "../../config";
import { rpsInterface } from "../../sdk";
import { notify } from "../../helpers/alerts";
import { useBalanceOf, useTotalSupply } from "../../hooks";
import { formatEther } from "ethers/lib/utils";

import { useGetPlayer } from "../../hooks";

const PersonalStats = () => {
  const { account } = useEthers();
  const userAccount = account ? account : ethers.constants.AddressZero;
  const etherBalance = useEtherBalance(account);
  const nftWinPercentage = useNftWinPercentage(userAccount);
  const gamesPlayed = useGamesPlayed(userAccount);
  const formattedGamesPlayed = gamesPlayed ? gamesPlayed.toString() : 0;
  const nftWon = useNftWon(userAccount);
  const formattedNftWon = nftWon ? nftWon.toString() : 0;
  const gamesWon = useGamesWon(userAccount);
  const formattedGamesWon = gamesWon ? gamesWon.toString() : 0;
  const cryptoHandsBalance = useBalanceOf(userAccount);
  const formattedCryptoHandsBalance = cryptoHandsBalance
    ? cryptoHandsBalance.toString()
    : 0;
  const contractEthBalance = useEtherBalance(rpsAddress);
  const userBalance = etherBalance ? etherBalance : 0;
  const totalSupply = useTotalSupply();
  const formattedTotalSupply = totalSupply ? totalSupply.toNumber() : 0;

  const player = useGetPlayer(userAccount);

  const [copyLink, setCopyLink] = useState(false);

  // uint256 totalGamesPlayed;
  // uint256 totalGamesWonned;
  // uint256 totalEarnings;
  // uint256 referralEarnings;
  // uint256 totalReferrals;
  // uint256 nftWoned;
  // uint256 nftWinPercentage;
  // uint256 refreeNftWinPercentage;
  // address refree;

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
      <div class="card" style={{ width: "18rem" }}>
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

      <div class="card" style={{ width: "18rem" }}>
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

      <div class="card" style={{ width: "18rem" }}>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Referrals: {formattedPlayer[4]}</li>
          <li class="list-group-item">NFT Wonned: {formattedPlayer[5]}</li>
          <li class="list-group-item">
            NFT Win Percentage: {formattedPlayer[6]}
          </li>
        </ul>
      </div>

      <div class="card" style={{ width: "18rem" }}>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            Refree NFT Percentage: {formattedPlayer[7]}
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

      {cryptoHandsBalance > 0 ? (
        <button onClick={() => claim()} className="btn btn-primary">
          Claim{" "}
        </button>
      ) : null}
    </div>
  );
};

export default PersonalStats;
