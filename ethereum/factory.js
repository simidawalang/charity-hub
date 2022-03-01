import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x14285f49682ad66d3E6979822754C345DD2CAEFB"
); // address it was deployed to

export default instance;