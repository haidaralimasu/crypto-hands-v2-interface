import React, { useEffect, useState } from "react";
import { graphEndpoint } from "../../config";
import axios from "axios";
import { shortenAddress } from "@usedapp/core";
import { ethers } from "ethers";
import moment from "moment";

const Results = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    getResults();
  }, [results]);

  const getResults = async () => {
    const res = await axios.post(graphEndpoint, {
      query: `
      {
        resultsDeclareds(orderBy:_winAmount,orderDirection: desc){
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

  console.log(results);

  return (
    <div className="d-flex justify-content-center align-items-center mw-80">
      <table class="table table-warning mw-80 ">
        <thead>
          <tr>
            <th scope="col">Poisition</th>
            <th scope="col">Address</th>
            <th scope="col">Bet</th>
            <th scope="col">Result</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, i) => {
            return (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>{shortenAddress(result._player)}</td>
                <td>{ethers.utils.formatEther(result._amount)}</td>
                <td>
                  {result._result == 0 ? "Win" : null}
                  {result._result == 1 ? "Loose" : null}
                  {result._result == 2 ? "Tie" : null}
                </td>

                <td>
                  {moment.unix(result._time).format("DD - MM - YYYY HH:mm:ss")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Results;
