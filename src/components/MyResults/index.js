import React, { useState, useEffect } from "react";
import { graphEndpoint } from "../../config";
import { useEthers } from "@usedapp/core";
import { ethers } from "ethers";
import moment from "moment";
import axios from "axios";

const MyResults = () => {
  const { account } = useEthers();
  const [results, setResults] = useState([]);
  const userAccount = account ? account : ethers.constants.AddressZero;

  useEffect(() => {
    getResults();
  }, [results]);

  const getResults = async () => {
    const res = await axios.post(graphEndpoint, {
      query: `
      {
        resultsDeclareds(where:{_player:"${userAccount}"}){
          id,
          _betId,
          _choice,
          _outcome,
          _amount,
          _winAmount,
          _player,
          _result,
          _time
        }
      }
      `,
    });

    setResults(res.data.data.resultsDeclareds);
  };

  const numToChoice = (num) => {
    if (num == 0) {
      return "Rock";
    }
    if (num == 1) {
      return "Paper";
    }
    if (num == 2) {
      return "Scissor";
    }
  };

  const numToResult = (num) => {
    if (num == 0) {
      return "Win";
    }
    if (num == 1) {
      return "Loose";
    }
    if (num == 2) {
      return "Tie";
    }
  };

  const resultToColor = (num) => {
    if (num == 0) {
      return "table-success";
    }
    if (num == 1) {
      return "table-danger";
    }
    if (num == 2) {
      return "table-primary";
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center mw-80">
        <table class="table mw-80 ">
          <thead>
            <tr>
              <th scope="col">Sr</th>
              <th scope="col">Choice</th>
              <th scope="col">Outcome</th>
              <th scope="col">Result</th>
              <th scope="col">Bet</th>
              <th scope="col">WinPool</th>
              <th scope="col">Time</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, i) => {
              return (
                <tr className={resultToColor(result._result)} key={i}>
                  <th scope="row">{i + 1}</th>
                  <td>{numToChoice(result._choice)}</td>
                  <td>{numToChoice(result._outcome)}</td>
                  <td>{numToResult(result._result)}</td>
                  <td>{ethers.utils.formatEther(result._amount)}</td>
                  <td>{ethers.utils.formatEther(result._winAmount)}</td>
                  <td>
                    {moment
                      .unix(result._time)
                      .format("DD - MM - YYYY - HH:mm:ss")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyResults;
