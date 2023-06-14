import React, { useState } from "react";
import rock from "../../images/rock.png";
import paper from "../../images/paper.png";
import scissors from "../../images/scissors.png";
import polygon from "../../images/polygon.svg";
import { rpsInterface } from "../../sdk";
import { rpsAddress } from "../../config";
import { ethers } from "ethers";
import { notify } from "../../helpers/alerts";
import { useGetBetAmounts } from "../../hooks";

const Choice = () => {
  const [select, setSelect] = useState(0);
  const betAmounts = useGetBetAmounts();
  const formattedBetAmounts = betAmounts
    ? betAmounts.toString().split(",")
    : [
        "1000000000000000",
        "2000000000000000",
        "3000000000000000",
        "4000000000000000",
        "5000000000000000",
      ];

  const queryParameters = new URLSearchParams(window.location.search);
  const refrrer = queryParameters.get("refrrer");

  const makeBet = async (amount) => {
    const betRefrrer = refrrer
      ? refrrer.toString()
      : ethers.constants.AddressZero.toString();

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const rpsContract = new ethers.Contract(rpsAddress, rpsInterface, signer);

      let tx = await rpsContract.makeBet(select, betRefrrer, {
        value: amount,
        gasLimit: 1000000,
      });

      await notify(
        "Waiting for Confirmation",
        "Waiting for transaction to confirm",
        "info"
      );
      await tx.wait();
      await notify(
        "Bet Successfull",
        "You have successfully entered",
        "success"
      );
    } catch (error) {
      console.log(error);
      // notify("Error !", "Failed Bet Please Try Again", "error");
      notify(error);
    }
  };

  return (
    <div>
      <div className="d-flex m-auto">
        <div class="card mx-2 my-2" style={{ width: "5 rem" }}>
          <img height="200px" class="card-img-top" src={rock} alt="rock" />
          <div class="card-body">
            {select == 0 ? (
              <button class="btn btn-success w-100">Selected</button>
            ) : (
              <button
                onClick={() => setSelect(0)}
                class="btn btn-primary w-100"
              >
                Select
              </button>
            )}
          </div>
        </div>

        <div class="card mx-2 my-2" style={{ width: "5 rem" }}>
          <img height="200px" class="card-img-top" src={paper} alt="rock" />
          <div class="card-body">
            {select == 1 ? (
              <button class="btn btn-success w-100">Selected</button>
            ) : (
              <button
                onClick={() => setSelect(1)}
                class="btn btn-primary w-100"
              >
                Select
              </button>
            )}
          </div>
        </div>

        <div class="card mx-2 my-2" style={{ width: "5 rem" }}>
          <img height="200px" class="card-img-top" src={scissors} alt="rock" />
          <div class="card-body">
            {select == 2 ? (
              <button class="btn btn-success w-100">Selected</button>
            ) : (
              <button
                onClick={() => setSelect(2)}
                class="btn btn-primary w-100"
              >
                Select
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex my-4 justify-content-center">
        {formattedBetAmounts.map((price) => (
          <button
            onClick={() => makeBet(price)}
            className="btn d-flex  justify-content-between  align-items-center btn-warning mx-4"
          >
            {ethers.utils.formatEther(price)}
            <img className="mx-1" height="25px" src={polygon} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Choice;
