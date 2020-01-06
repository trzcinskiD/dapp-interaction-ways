import React, { Component } from "react";
import newsInbox from "../ethereum/newsInbox";
import web3 from "../ethereum/web3";
import backendTxSign from "../ethereum/backendTxSign";
import privateKeyTxSign from "../ethereum/privateKeyTxSign";

export class MessageForm extends Component {
  state = {
    value: "",
    errorMessage: "",
    successMessage: "",
    loading: false,
    time: 0,
    txHash: "",
    pk: ""
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
    const { value, pk } = this.state;
    e.preventDefault();
    this.setState({ loading: true, errorMessage: "", successMessage: "" });
    this.timer();
    try {
      if (this.props.backendTxSign) {
        const receipt = await backendTxSign(value);
        this.setState({ txHash: receipt.transactionHash });
      } else if (this.props.pkTxSign) {
        const receipt = await privateKeyTxSign(value, pk);
        this.setState({ txHash: receipt.transactionHash });
      } else {
        const accounts = await web3.eth.getAccounts();
        const receipt = await newsInbox.methods.addMessage(value).send({
          from: accounts[0]
        });
        this.setState({ txHash: receipt.transactionHash });
      }
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false, value: "", successMessage: "Sukces!" });
  };

  renderResult = () => {
    const { successMessage, errorMessage, txHash } = this.state;
    if (errorMessage) {
      return <p>{errorMessage}</p>;
    } else if (successMessage) {
      return (
        <p>
          {successMessage}{" "}
          <a href={`https://rinkeby.etherscan.io/tx/${txHash}`}>
            Przejdź do szczegółów transakcji
          </a>
        </p>
      );
    }
  };

  render() {
    const { value, loading, time, pk } = this.state;
    return (
      <>
        <form>
          <div>
            <input
              type="text"
              value={value}
              size={60}
              placeholder={"Wpisz swoją wiadomość"}
              onChange={e => this.setState({ value: e.target.value })}
            />
            {this.props.pkTxSign && (
              <input
                type="password"
                value={pk}
                required
                placeholder={"Podaj klucz prywatny"}
                onChange={e => this.setState({ pk: e.target.value })}
              />
            )}
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
            {this.renderResult()}
          </div>
        </form>
        <style jsx>{`
          form {
            margin: 32px 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
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
