const HDWalletProvider = require("@truffle/hdwallet-provider");
const compiledFactory = require("./build/CampaignFactory.json");
const Web3 = require("web3");

const mnemonic =
  "neither result gorilla brother library deer simple work mail clever ecology prize";
const rinkebyInfura =
  "https://rinkeby.infura.io/v3/0caa3951bef646b0b7d71f48103ecfbc";

const provider = new HDWalletProvider(mnemonic, rinkebyInfura);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from: ', accounts[0]);
  
  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({
      data: compiledFactory.bytecode,
    })
    .send({
      from: accounts[0],
      gas: "1000000",
    });
    
  console.log("Contract deployed to: ", result.options.address);
  provider.engine.stop();
};

deploy();
