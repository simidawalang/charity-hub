import React from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";

const DonationForm = () => {
  return (
    <Form>
      <Form.Field>
        <label htmlFor="">Amount to contribute</label>
        <Input label="ether" labelPosition="right" />
      </Form.Field>
      <Button primary>Contribute</Button>
    </Form>
  );
};

export default DonationForm;
