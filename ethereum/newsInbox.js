import web3 from "./web3";
import newsInbox from "./build/newsInbox.json";

console.log(process.env);
console.log(process.env.CONTRACT_ADDRESS);
const instance = new web3.eth.Contract(
  newsInbox.abi,
  process.env.CONTRACT_ADDRESS
);

export default instance;
