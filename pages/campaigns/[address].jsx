import { useRouter } from "next/router";
import DonationForm from "../../components/Form";
import { Card } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import Campaign from "../../ethereum/campaign";

const Address = ({
  minimumContribution,
  balance,
  requestsCount,
  approversCount,
  manager,
}) => {
  const router = useRouter();
  const { address } = router.query;

  const items = [
    {
      header: manager,
      meta: "Address of manager",
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
      description: "A request tries ti withdraw money.",
    },
    {
      header: approversCount,
      meta: "Number of Contributors",
      description: "Total number of people who have donated to this campaign.",
    },
    {
        header: web3.utils.fromWei(balance, 'ether'),
        meta: 'Campaign Balance (ether)',
        description: 'How much money the camoaign has left to spend.'
    }
  ];
  return (
    <>
      <h3>Campaign Show</h3>
      <Card.Group items={items} />
      <DonationForm />
    </>
  );
};

Address.getInitialProps = async ({ query }) => {
  const campaign = Campaign(query.address);

  const summary = await campaign.methods.getCampaignSummary().call();
  return {
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
  };
};
export default Address;
