import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x0f7011A6B3653b5bcc970047A87f5E6b81807d91"
); // address it was deployed to

export default instance;