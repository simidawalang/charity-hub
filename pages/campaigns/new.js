import React, { useState } from "react";
import { Form, Button, Input } from "semantic-ui-react";

const NewCampaign = () => {
  const [minimumContribution, setMinimumContribution] = useState(0);
  return (
    <>
    <h3>Create a campaign</h3>
      <Form>
        <Form.Field>
          <label htmlFor="">Minimum Contribution</label>
          <Input label="wei" labelPosition="right"/>
        </Form.Field>
      </Form>
      <Button primary>Create</Button>
    </>
  );
};

export default NewCampaign;
