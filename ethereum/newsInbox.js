import web3 from "./web3";
import newsInbox from "./build/newsInbox.json";

const instance = new web3.eth.Contract(
  newsInbox.abi,
  "0xa4c3FE660E474a85F56eD636DE71D55393d48064"
);

export default instance;
