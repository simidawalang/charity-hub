import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";

const Home = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const getNoOfAccounts = async () => {
      const accounts = await web3.eth.getAccounts();
      setIsConnected(!!accounts.length);
    };
    getNoOfAccounts();
  }, []);

  const connectWallet = async () => {
    setLoading(true);
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      router.reload(window.location.pathname);
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
            <Button
              loading={loading}
              content={`${
                !isConnected ? "Connect Wallet" : "Wallet Connected"
              }`}
              onClick={connectWallet}
              color="green"
            />
            <Link href="/campaigns/new">
              <Button primary content="Create Charity" />
            </Link>
          </>
        )}
      </div>
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
