import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

const DonationForm = ({ address }) => {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const campaign = Campaign(address);

    setLoading(true);
    setErrorMessage("");
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(inputValue, "ether"),
      });
      router.reload(window.location.pathname);
    } catch (e) {
      setErrorMessage(e.message);
    }

    setLoading(false);
    setInputValue("");
  };
  return (
    <Form onSubmit={handleSubmit} error={!!errorMessage}>
      <Form.Field>
        <h3>
          Want to help this cause? Feel free to donate. 
        </h3>
        <p className="warning-text">Please make sure you're
          donating from a <strong>Rinkeby</strong> test network account.</p>
        <Input
          label="ether"
          labelPosition="right"
          value={inputValue}
          onChange={handleChange}
        />
      </Form.Field>
      <Button loading={loading} color="green">
        Donate
      </Button>
      <Message error header="Oops" content={errorMessage} />
    </Form>
  );
};

export default DonationForm;
