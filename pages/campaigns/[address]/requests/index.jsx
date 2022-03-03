import React from "react";
import Link from "next/link";
import { Button, Table } from "semantic-ui-react";
import Campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";

const CampaignRequests = ({ address, requests, approversCount }) => {
  const { Header, Row, HeaderCell, Cell, Body } = Table;

  const handleApprove = async (id) => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({
      from: accounts[0],
    });
  };

  const handleFinalize = async (id) => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0],
    });
  };

  const isReadyToFinalize = requests.approvalCount > approversCount / 2;
  return (
    <>
      <h3>Requests</h3>
      <Link href={`/campaigns/${address}/requests/new`}>
        <Button primary>Add Request</Button>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          {requests.map(
            ({ description, value, recipient, approvalCount, complete }, i) => (
              <Row
                disabled={complete}
                key={i}
                positive={approvalCount > (approversCount / 2) && !complete}
              >
                <Cell>{i}</Cell>
                <Cell>{description}</Cell>
                <Cell>{web3.utils.fromWei(value, "ether")}</Cell>
                <Cell>{recipient}</Cell>
                <Cell>
                  {approvalCount}/{approversCount}
                </Cell>
                <Cell>
                  {!complete ? (
                    <Button
                      color="green"
                      basic
                      onClick={() => handleApprove(i)}
                    >
                      Approve
                    </Button>
                  ) : (
                    <p style={{ color: "green" }}>Approved</p>
                  )}
                </Cell>
                <Cell>
                  {approvalCount > approversCount / 2 ? (
                    <p style={{ color: "green" }}>Finalized</p>
                  ) : (
                    <Button
                      color="teal"
                      basic
                      onClick={() => handleFinalize(i)}
                    >
                      Finalize
                    </Button>
                  )}
                </Cell>
              </Row>
            )
          )}
        </Body>
      </Table>
    </>
  );
};

CampaignRequests.getInitialProps = async ({ query }) => {
  const { address } = query;
  const campaign = Campaign(address);

  const requestCount = await campaign.methods.getRequestCount().call();
  const approversCount = await campaign.methods.approversCount().call();

  const requests = await Promise.all(
    Array(parseInt(requestCount))
      .fill()
      .map((req, i) => campaign.methods.requests(i).call())
  );
  return { address, requestCount, requests, approversCount };
};
export default CampaignRequests;
