import web3 from "./web3";
import newsInbox from "./build/newsInbox.json";

const instance = new web3.eth.Contract(
  newsInbox.abi,
  process.env.CONTRACT_ADDRESS
);

export default instance;
