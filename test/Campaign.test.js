const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledCampaign = require("../ethereum/build/Campaign.json");
const compiledFactory = require("../ethereum/build/CampaignFactory.json");

let accounts, factory, campaignAddress, campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({
      data: compiledFactory.bytecode,
    })
    .send({
      from: accounts[0],
      gas: "1000000",
    });
  // factory makes an instance of a campaign
  await factory.methods.createCampaign("100").send({
    from: accounts[0],
    gas: "1000000",
  });

  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
  // takes in an extra parameter because the contract has already been deploted and we're instructing web3 to interact with it using the address it was deployed to
});

describe("Campaign tests", () => {
  it("deploys factory and campaigm", () => {
    assert.ok(factory.options.address);
    assert.ok(campaign.options.address);
  });

  it("marks caller as campaign manager", async () => {
    const manager = await campaign.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it("allows donations and marks approvers", async () => {
    await campaign.methods
      .contribute()
      .send({ value: "101", from: accounts[1] });

    const isContributor = await campaign.methods.approvers(accounts[1]).call();
    assert(isContributor);
  });

  it("requires minimum contribution", async () => {
    try {
      await campaign.methods.contribute().send({
        value: "5",
        from: accounts[1],
      });
      assert(false);
    } catch (e) {
      assert(e);
    }
  });

  it("allows manager to make payment request", async () => {
    await campaign.methods.createRequest("Buy fanta", "100", accounts[2]).send({
      from: accounts[0],
      gas: "1000000",
    });

    const request = await campaign.methods.requests(0).call();
    assert.equal("Buy fanta", request.description);
  });

  it("processes requests", async () => {
    await campaign.methods.contribute().send({
      from: accounts[0],
      value: web3.utils.toWei("10", "ether"),
    });
    await campaign.methods
      .createRequest("tester", web3.utils.toWei("5", "ether"), accounts[1])
      .send({
        from: accounts[0],
        gas: "1000000",
      });

    await campaign.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    await campaign.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    console.log(balance);
    assert(balance > 104);
  });
});
