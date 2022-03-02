import React, { useState } from "react";
import { useRouter } from "next/router";
import { Form, Button, Input, Message } from "semantic-ui-react";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { route } from "next/dist/server/router";

const NewCampaign = () => {
  const [minimumContribution, setMinimumContribution] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { value } = e.target;
    setMinimumContribution(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(minimumContribution).send({
        from: accounts[0],
      });

      router.push("/");
    } catch (e) {
      setErrorMessage(e.message);
    }
    setLoading(false);
  };
  return (
    <>
      <h3>Create a campaign</h3>
      <Form onSubmit={handleSubmit} error={!!errorMessage}>
        <Form.Field>
          <label htmlFor="">Minimum Contribution</label>
          <Input
            label="wei"
            type="number"
            labelPosition="right"
            value={minimumContribution}
            onChange={handleChange}
          />
        </Form.Field>
        <Message error header="Oops" content={errorMessage} />
        <Button loading={loading} primary>
          Create
        </Button>
      </Form>
    </>
  );
};

export default NewCampaign;
