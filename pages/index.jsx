import React from "react";
import Link from "next/link";
import { Button, Card } from "semantic-ui-react";
import factory from "../ethereum/factory";
import web3 from "../ethereum/web3";

const Home = ({ accounts }) => {
  const connectWallet = async () => {
    try {
      console.log(accounts[0]);
    } catch (e) {
      console.log(e.message);
    }
  };
  return (
    <div className="home-page">
      <h3 className="home-header">Welcome to CharityHub!</h3>
      <p>
        CharityHub is a decentralized charity platform which ensures that
        donations get to their intended destinations and causes. As a donator,
        you get to see withdrawal requests and from the charity organizers. You
        can even make your own charity.
      </p>
      <div className="home-page-actions">
        {web3.currentProvider.isMetaMask ? (
          <>
            <Link href="/campaigns/new">
              <Button content="Create Charity" color="purple" />
            </Link>
          </>
        ) : (
          <p>
            Hmmm... Seems like you don't have MetaMask installed on ypur
            browser. Please, install{" "}
            <a
              href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en"
              className="warning-text"
              rel="noreferrer"
            >
              <span>here</span>
            </a>{" "}
            to donate to or create charities.
          </p>
        )}
        <Link href="/campaigns">
          <Button content="View Charities" primary />
        </Link>
      </div>
    </div>
  );
};

Home.getInitialProps = async () => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  const accounts = await web3.eth.getAccounts();
  return { campaigns, accounts };
};

export default Home;
