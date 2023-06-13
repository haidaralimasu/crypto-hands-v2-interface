import { rpsAddress, cryptoHandsAddress } from "../config";
import { rpsInterface, cryptoHandsInterface } from "../sdk";
import { useCall } from "@usedapp/core";
import { ethers } from "ethers";

export const useNftWinPercentage = (user) => {
  const { value, error } =
    useCall({
      contract: new ethers.Contract(rpsAddress, rpsInterface),
      method: "s_nftWinPercentage",
      args: [user],
    }) ?? {};
  if (error) {
    console.log(error.message);
    return undefined;
  }
  return value?.[0];
};

export const useGamesPlayed = (user) => {
  const { value, error } =
    useCall({
      contract: new ethers.Contract(rpsAddress, rpsInterface),
      method: "s_gamesPlayed",
      args: [user],
    }) ?? {};
  if (error) {
    console.log(error.message);
    return undefined;
  }
  return value?.[0];
};

export const useGamesWon = (user) => {
  const { value, error } =
    useCall({
      contract: new ethers.Contract(rpsAddress, rpsInterface),
      method: "s_gamesWon",
      args: [user],
    }) ?? {};
  if (error) {
    console.log(error.message);
    return undefined;
  }
  return value?.[0];
};

export const useNftWon = (user) => {
  const { value, error } =
    useCall({
      contract: new ethers.Contract(rpsAddress, rpsInterface),
      method: "s_nftWon",
      args: [user],
    }) ?? {};
  if (error) {
    console.log(error.message);
    return undefined;
  }
  return value?.[0];
};

export const useTotalSupply = () => {
  const { value, error } =
    useCall({
      contract: new ethers.Contract(cryptoHandsAddress, cryptoHandsInterface),
      method: "totalSupply",
      args: [],
    }) ?? {};
  if (error) {
    console.log(error.message);
    return undefined;
  }
  return value?.[0];
};

export const useMaxSupply = () => {
  const { value, error } =
    useCall({
      contract: new ethers.Contract(cryptoHandsAddress, cryptoHandsInterface),
      method: "getMaxHandsAvailableToMint",
      args: [],
    }) ?? {};
  if (error) {
    console.log(error.message);
    return undefined;
  }
  return value?.[0];
};

export const useMaxPerTransaction = () => {
  const { value, error } =
    useCall({
      contract: new ethers.Contract(cryptoHandsAddress, cryptoHandsInterface),
      method: "getMaxHandsPerTx",
      args: [],
    }) ?? {};
  if (error) {
    console.log(error.message);
    return undefined;
  }
  return value?.[0];
};

export const useMaxPerAccount = () => {
  const { value, error } =
    useCall({
      contract: new ethers.Contract(cryptoHandsAddress, cryptoHandsInterface),
      method: "getNftMintLimit",
      args: [],
    }) ?? {};
  if (error) {
    console.log(error.message);
    return undefined;
  }
  return value?.[0];
};

export const useCost = () => {
  const { value, error } =
    useCall({
      contract: new ethers.Contract(cryptoHandsAddress, cryptoHandsInterface),
      method: "getPrice",
      args: [],
    }) ?? {};
  if (error) {
    console.log(error.message);
    return undefined;
  }
  return value?.[0];
};

export const useBalanceOf = (user) => {
  const { value, error } =
    useCall({
      contract: new ethers.Contract(cryptoHandsAddress, cryptoHandsInterface),
      method: "balanceOf",
      args: [user],
    }) ?? {};
  if (error) {
    console.log(error.message);
    return undefined;
  }
  return value?.[0];
};

export const useGetBetAmounts = () => {
  const { value, error } =
    useCall({
      contract: new ethers.Contract(rpsAddress, rpsInterface),
      method: "getBetAmounts",
      args: [],
    }) ?? {};
  if (error) {
    console.log(error.message);
    return undefined;
  }
  return value?.[0];
};

export const useGetPlayer = (user) => {
  const { value, error } =
    useCall({
      contract: new ethers.Contract(rpsAddress, rpsInterface),
      method: "getPlayer",
      args: [user],
    }) ?? {};
  if (error) {
    console.log(error.message);
    return undefined;
  }
  return value?.[0];
};
