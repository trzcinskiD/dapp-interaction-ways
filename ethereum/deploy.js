// We are deploying our campaing factory
const provider = require("./provider");
const Web3 = require("web3");
const compiledContract = require("./build/newsInbox.json");

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(compiledContract.abi)
    .deploy({ data: compiledContract.evm.bytecode.object })
    .send({ gas: "4000000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
};

deploy();
