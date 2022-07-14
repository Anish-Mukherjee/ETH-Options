import { ethers } from "ethers";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account,", account);
        setCurrentAccount(account);
      } else {
        console.log("No authorized account found");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get metamask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Connected :", accounts[0]);

      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  const connectWalletButton = (
    <button className="mx-auto px-4 py-1 rounded-full text-xl bg-green-700 hover:bg-green-600" onClick={connectWallet}>
      Connect to wallet
    </button>
  );
  return (
    <div className="flex flex-col space-y-8">
      <div className="bg-gray-900">
        <p className="text-3xl text-slate-50 font-serif font-semi-bold">
          Options Exchange
        </p>
      </div>
      <p className="mx-auto font-normal">
        Trade in ETH/USD options contracts on Rinkeby testnet
      </p>
      {currentAccount ? (
        <p className="mx-auto">Connected : {currentAccount}</p>
      ) : (
        connectWalletButton
      )}
      <table className="table-auto">
        <thead>
          <tr>
            <th className="font-light">ID</th>
            <th className="font-light">Strike Price</th>
            <th className="font-light">Premium</th>
            <th className="font-light">Amount</th>
            <th className="font-light">Expiry</th>
            <th className="font-light">Excercised</th>
            <th className="font-light">Cancelled</th>
            <th className="font-light">Latest Cost</th>
            <th className="font-light">Writer</th>
          </tr>
        </thead>
      </table>
    </div>
  );
}
