import { Transaction } from "ethereumjs-tx";
import { fromPrivateKey } from "ethereumjs-wallet";
import newsInbox from "./newsInbox";
import web3 from "./web3";

export default async (value, pk) => {
  const bufferedPK = Buffer.from(pk, "hex");
  const wallet = fromPrivateKey(bufferedPK);
  const address = wallet.getAddressString();
  const addMessageAbi = newsInbox.methods.addMessage(value).encodeABI();
  let nonce = await web3.eth.getTransactionCount(address);
  let txParams = {
    nonce: nonce,
    gasPrice: 80 * 100000000,
    gas: 1000000,
    to: process.env.CONTRACT_ADDRESS,
    data: addMessageAbi
  };
  const transaction = new Transaction(txParams, { chain: "rinkeby" });
  transaction.sign(bufferedPK);
  const serializedTransaction = transaction.serialize();
  const receipt = await web3.eth.sendSignedTransaction(
    "0x" + serializedTransaction.toString("hex")
  );
  return receipt;
};
