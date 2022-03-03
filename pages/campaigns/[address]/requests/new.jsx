import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Form, Button, Message, Input } from "semantic-ui-react";
import web3 from "../../../../ethereum/web3";
import Campaign from "../../../../ethereum/campaign";

const NewRequest = ({ address }) => {
  const [description, setDescription] = useState("");
  const [donation, setDonation] = useState("");
  const [recipient, setRecipient] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const campaign = Campaign(address);
    setErrorMessage("");
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods
        .createRequest(
          description,
          web3.utils.toWei(donation, "ether"),
          recipient
        )
        .send({
          from: accounts[0],
        });

      router.push(`/campaigns/${address}/requests`);
    } catch (e) {
      setErrorMessage(e.message);
    }
    setLoading(false);
  };
  return (
    <>
      <Link href={`/campaigns/${address}/requests`}>Back to Requests</Link>
      <h3>Create a Request</h3>
      <Form onSubmit={handleSubmit} error={!!errorMessage}>
        <Form.Field>
          <label htmlFor="description">Description</label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="value-in-ether">Value in ether</label>
          <Input
            type="number"
            id="value-in-ether"
            value={donation}
            onChange={(e) => setDonation(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="recipient">Recipient</label>
          <Input
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </Form.Field>
        <Button loading={loading} primary>
          Create Request
        </Button>
        <Message error header="Oops" content={errorMessage} />
      </Form>
    </>
  );
};

NewRequest.getInitialProps = async ({ query }) => {
  const { address } = query;
  return { address };
};

export default NewRequest;
