import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";

const Home = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getListOfAccounts = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length !== 0) {
        setIsConnected(true);
      }
    };
    getListOfAccounts();
  }, []);

  useEffect(() => {
    const handleAccountChange = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length === 0) {
        setIsConnected(false);
      } else {
        setCurrentAccount(accounts[0]);
      }
    };

    if (isConnected) {
      window.ethereum.on("accountsChanged", handleAccountChange);
    }
    return () => {
      if (isConnected) {
        window.ethereum.removeListener("accountsChanged", handleAccountChange);
      }
    };
  }, [isConnected, web3]);

  const connectWallet = async () => {
    setLoading(true);
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      //router.reload(window.location.pathname);
      const accounts = await web3.eth.getAccounts();
      setCurrentAccount(accounts[0]);
      setIsConnected(true);
    } catch (e) {
      console.log(e.messsage);
    }
    setLoading(false);
  };
  return (
    <div className="home-page">
      <h1 className="home-page-header">Welcome to CharityHub!</h1>
      <p>
        CharityHub is a decentralized charity platform which ensures donations
        actually reach their causes, while also keeping a record of withdrawals
        along with their purposes made by the charity managers.
      </p>
      <div className="home-page-actions">
        <Link href="/campaigns">
          <Button color="purple" content="View Charities" />
        </Link>
        {web3.currentProvider.isMetaMask && (
          <>
          {currentAccount}
            {!isConnected && (
              <Button
                loading={loading}
                content="Connect Wallet"
                onClick={connectWallet}
                color="green"
              />
            )}

            <Link href="/campaigns/new">
              <Button primary content="Create Charity" />
            </Link>
          </>
        )}
      </div>
      <strong className="warning-text">
        Please ensure you connect a Rinkeby test network wallet.
      </strong>
      {!web3.currentProvider.isMetaMask && (
        <p>
          Hmmm... It appears you don't have MetaMask installed on your browser.
          To make donations or create your own charity, kindly install it
          <a
            className="warning-text"
            href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
            target="_blank"
            rel="noreferrer noopener"
          >
            {" "}
            here
          </a>
        </p>
      )}
    </div>
  );
};


export default Home;
