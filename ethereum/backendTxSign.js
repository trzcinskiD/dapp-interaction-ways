import { Transaction } from "ethereumjs-tx";
import newsInbox from "./newsInbox";
import web3 from "./web3";

export default async value => {
  const addMessageAbi = newsInbox.methods.addMessage(value).encodeABI();
  let nonce = await web3.eth.getTransactionCount(process.env.ETH_ADDRESS);
  let txParams = {
    nonce: nonce,
    gasPrice: 80 * 100000000,
    gas: 1000000,
    to: process.env.CONTRACT_ADDRESS,
    data: addMessageAbi
  };
  const transaction = new Transaction(txParams, { chain: "rinkeby" });
  transaction.sign(Buffer.from(process.env.PRIVATE_KEY, "hex"));
  const serializedTransaction = transaction.serialize();
  const receipt = await web3.eth.sendSignedTransaction(
    "0x" + serializedTransaction.toString("hex")
  );
  return receipt;
};
