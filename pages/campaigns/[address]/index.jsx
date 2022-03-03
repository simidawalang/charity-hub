import Link from "next/link";
import DonationForm from "../../../components/Form";
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../../ethereum/web3";
import Campaign from "../../../ethereum/campaign";

const Address = ({
  address,
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  manager,
}) => {
  const items = [
    {
      header: manager,
      meta: "Address of charity creator",
      description: "A manager made this and can request for withdrawals",
      style: { overflowWrap: "break-word" },
    },
    {
      header: minimumContribution,
      meta: "Minimum Contribution (in Wei)",
      description: `You must donate a minimum of ${minimumContribution} Wei to be listed as a donator.`,
    },
    {
      header: requestsCount,
      meta: "Request Count",
      description: "A request tries to withdraw money.",
    },
    {
      header: approversCount,
      meta: "Number of Contributors",
      description: "Total number of people who have donated to this campaign.",
    },
    {
      header: web3.utils.fromWei(balance, "ether"),
      meta: "Charity Balance (ether)",
      description: "How much money this charity has left to spend.",
    },
  ];
  return (
    <>
      <h3>Charity Details</h3>
      <Grid>
        <Grid.Row>
          <Grid.Column width={10}>
            <Card.Group items={items} />
          </Grid.Column>
          <Grid.Column width={6}>
            <DonationForm
              address={address}
              minimumContribution={minimumContribution}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Link href={`/campaigns/${address}/requests`}>
              <Button primary>View Withdrawal Requests</Button>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

Address.getInitialProps = async ({ query }) => {
  const campaign = Campaign(query.address);

  const summary = await campaign.methods.getCampaignSummary().call();
  return {
    address: query.address,
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  };
};
export default Address;
