const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");

const web3 = new Web3(ganache.provider());

require("events").EventEmitter.defaultMaxListeners = 50;

const compilednewsInbox = require("../ethereum/build/newsInbox.json");

let accounts;
let newsInbox;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  newsInbox = await new web3.eth.Contract(compilednewsInbox.abi)
    .deploy({
      data: compilednewsInbox.evm.bytecode.object
    })
    .send({ from: accounts[0], gas: "4000000" });
});

describe("NewsInbox", () => {
  it("deploys a inbox", () => {
    assert.ok(newsInbox.options.address);
  });
  it("allows people to send news to contracts", async () => {
    await newsInbox.methods.addMessage("Mój pierwszy news").send({
      from: accounts[0],
      gas: "1000000"
    });
    const isNewsExist = await newsInbox.methods.messages(0).call();
    assert(isNewsExist);
  });
  it("news has correct sender and content", async () => {
    await newsInbox.methods.addMessage("Kolejny news").send({
      from: accounts[1],
      gas: "1000000"
    });
    const news = await newsInbox.methods.messages(0).call();
    assert.equal("Kolejny news", news.content);
    assert.equal(accounts[1], news.sender);
  });
  it("count of news is correct", async () => {
    await newsInbox.methods.addMessage("jeden").send({
      from: accounts[0],
      gas: "1000000"
    });
    await newsInbox.methods.addMessage("dwa").send({
      from: accounts[1],
      gas: "1000000"
    });
    await newsInbox.methods.addMessage("trzy").send({
      from: accounts[2],
      gas: "1000000"
    });
    const count = await newsInbox.methods.getMessagesCount().call();
    assert.equal(3, count);
  });
});
