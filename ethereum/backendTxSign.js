import { Transaction } from "ethereumjs-tx";
import newsInbox from "./newsInbox";
import web3 from "./web3";

export default async value => {
  const addMessageAbi = newsInbox.methods.addMessage(value).encodeABI();
  let nonce = await web3.eth.getTransactionCount(
    "0x7382cda4162b587046caaadb751f6a16e5dd4d84"
  );
  let txParams = {
    nonce: nonce,
    gasPrice: 80 * 100000000,
    gas: 1000000,
    to: "0xa4c3FE660E474a85F56eD636DE71D55393d48064",
    data: addMessageAbi
  };
  const transaction = new Transaction(txParams, { chain: "rinkeby" });
  transaction.sign(
    Buffer.from(
      "B864B1BF5A5310F113752EBF34EFC275C29A6EA2480173ADE4C3BE137B6DF53F",
      "hex"
    )
  );
  const serializedTransaction = transaction.serialize();
  const receipt = await web3.eth.sendSignedTransaction(
    "0x" + serializedTransaction.toString("hex")
  );
  return receipt;
};
