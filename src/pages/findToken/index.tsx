import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { contractConf } from "../../constants";
import { checkSum, getContract, isNum } from "../../utils";

export default function FindToken() {
  const { account } = useWeb3React();
  const [address, setAddress] = useState("");
  const [startIndex, setStartIndex] = useState("");
  const [endIndex, setEndIndex] = useState("");
  const [errorMessage, setErrorMessage] = useState("Data is empty");
  const [loading, setLoading] = useState(false);
  const [tokenId, setTokenId] = useState([]);
  const [errs, setErrs] = useState({} as any);
  const [ids, setIds] = useState([] as any);
  const contract = getContract(contractConf.flashNftAbi, contractConf.flashNft);

  const maxNum = 1500;
  const maxCount = 4;

  const findItem = async (start: number, end: number) => {
    try {
      const res = await contract.methods
        .findToken(checkSum(address), String(start), String(end))
        .call({ gasLimit: 30000000 });
      return res.filter((i: string) => i !== "0");
    } catch (e: any) {
      errs[Date.now()] = e.message;
      setErrs({ ...errs });
    }
    return [];
  };

  const findAll = async () => {
    setTokenId([]);
    setLoading(true);
    setErrorMessage("Data is empty");

    if (typeof (window as any).web3 === "undefined" || !account) {
      setLoading(false);
      setErrorMessage("Please connect the wallet");
      return false;
    }
    try {
      const addressRes = checkSum(address);
      if (!addressRes) {
        setLoading(false);
        setErrorMessage("Contract address cannot be empty");
        return false;
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage("Invalid contract address");
      return false;
    }

    const start = Number(startIndex);
    const end = Number(endIndex);
    if (!isNum(startIndex) || !isNum(endIndex)) {
      setLoading(false);
      setErrorMessage("Token ID is only allowed to be numbers");
      return false;
    }
    if (start < 0 || end < 0) {
      setLoading(false);
      setErrorMessage("Token ID must be greater than 0");
      return false;
    }
    if (start >= end) {
      setLoading(false);
      setErrorMessage(
        "The end token ID must be greater than the start token ID"
      );
      return false;
    }

    const section = Math.ceil((end - start) / maxNum);
    const secArr = [...new Array(section)].map((m, n) => n);
    const res: any = await Promise.all(
      secArr.map((i) =>
        findItem(start + maxNum * i, Math.min(start + maxNum * (i + 1), end))
      )
    );

    setTokenId(res.flat());
    setLoading(false);
    if (Object.keys(errs).length === maxCount) {
      setErrorMessage("Query timed out, Please try again");
      setErrs({});
    }
  };

  const addIds = (id: number) => {
    const selectIds = [...ids, id];
    const counts: any = [];
    selectIds.map((m: any) => {
      const n = `id-${m}`;
      counts[n] = counts[n] ? counts[n] + 1 : 1;
      return n;
    });
    setIds(
      Object.keys(counts)
        .filter((i: string) => counts[i] === 1)
        .map((i) => Number(i.replace("id-", "")))
    );
  };

  return (
    <div className="handleWarp">
      <h2>Find Unclaimed NFT ID</h2>
      <div>
        <div className="item">
          <span>Contract Address: </span>
          <textarea
            spellCheck={false}
            value={address}
            placeholder="eg. 0x1dfe7ca09e99d10835bf73044a23b73fc20623df"
            onChange={(e) => {
              setAddress(e.target.value);
            }}
          />
        </div>
        <div className="item">
          <span>Start ID: </span>
          <input
            type="string"
            spellCheck={false}
            value={startIndex}
            placeholder="eg. 8001"
            onChange={(e) => {
              setEndIndex("");
              setStartIndex(e.target.value);
              if (!isNum(e.target.value)) {
                return;
              }
              setEndIndex(String(Number(e.target.value) + maxNum * maxCount));
            }}
          />
        </div>
        <div className="item">
          <span>End ID: </span>
          <input
            disabled
            className="endId"
            type="string"
            spellCheck={false}
            value={endIndex}
            placeholder=""
          />
        </div>
        <div className="operate">
          <button onClick={findAll} disabled={loading}>
            Find
          </button>
          <button className="disable" disabled>
            Batch mint ({ids.length})
          </button>
        </div>
        <span className="total">Unclaimed Total: {tokenId.length}</span>
        <div className="tokenId">
          {tokenId.length > 0 ? (
            tokenId.map((i) => (
              <div
                key={i}
                className={ids.includes(Number(i)) ? "active" : ""}
                onClick={() => addIds(i)}
              >
                {i}
              </div>
            ))
          ) : loading ? (
            <span>
              <span>Loading</span>
              <span className="dotting" />
            </span>
          ) : (
            <span>{errorMessage}</span>
          )}
        </div>
      </div>
    </div>
  );
}
