import React, { Component } from "react";
import newsInbox from "../ethereum/newsInbox";
import web3 from "../ethereum/web3";
import { Transaction } from "ethereumjs-tx";

export class MessageForm extends Component {
  state = {
    value: "",
    errorMessage: "",
    successMessage: "",
    loading: false,
    time: 0
  };

  timer = () => {
    const interval = setInterval(() => {
      this.setState({ time: this.state.time + 1 });
      if (!this.state.loading) {
        clearInterval(interval);
        this.setState({ time: 0 });
      }
    }, 1000);
  };

  onSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true, errorMessage: "", successMessage: "" });
    this.timer();
    try {
      const addMessageAbi = newsInbox.methods
        .addMessage(this.state.value)
        .encodeABI();
      console.log("addMessageAbi", addMessageAbi);
      let nonce = await web3.eth.getTransactionCount(
        "0x7382cda4162b587046caaadb751f6a16e5dd4d84"
      );
      console.log("nonce", nonce);

      let txParams = {
        nonce: nonce,
        gasPrice: 80 * 100000000,
        gas: 1000000,
        to: "0xa4c3FE660E474a85F56eD636DE71D55393d48064",
        data: addMessageAbi
      };
      console.log("txParams", txParams);
      const transaction = new Transaction(txParams, { chain: "rinkeby" });
      console.log("transaction", transaction);
      transaction.sign(
        Buffer.from(
          "B864B1BF5A5310F113752EBF34EFC275C29A6EA2480173ADE4C3BE137B6DF53F",
          "hex"
        )
      );
      console.log("transaction after sign", transaction);
      const serializedTransaction = transaction.serialize();
      console.log("serializedTransaction", serializedTransaction);
      const result = await web3.eth.sendSignedTransaction(
        "0x" + serializedTransaction.toString("hex")
      );
      console.log("result", result);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false, value: "", successMessage: "Sukces!" });
  };

  render() {
    const { successMessage, errorMessage, value, loading, time } = this.state;
    return (
      <>
        <form>
          <div>
            <input
              value={value}
              size={60}
              onChange={e => this.setState({ value: e.target.value })}
            />
            <button onClick={this.onSubmit} disabled={loading}>
              {loading ? `${time}s..` : "Dodaj"}
            </button>
          </div>
          <div>
            <p>
              {loading
                ? "Transakcja czeka na weryfikację w blockchain... Możesz opuścić stronę lub poczekać na potwierdzenie."
                : ""}
            </p>
            <p>{errorMessage ? errorMessage : successMessage}</p>
          </div>
        </form>
        <style jsx>{`
          form {
            margin: 32px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          input {
            border: solid;
            padding: 0.5em;
          }
          button {
             padding: 0.5em 1.45em;
             border: 0.15em solid #cccccc;
          }
          button:hover {
             border-color: #7a7a7a;
          }
          button:active {
             background-color: #999999;
          }
        `}</style>
      </>
    );
  }
}

export default MessageForm;
