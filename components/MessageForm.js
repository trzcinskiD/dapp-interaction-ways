import React, { Component } from "react";
import newsInbox from "../ethereum/newsInbox";
import web3 from "../ethereum/web3";
import backendTxSign from "../ethereum/backendTxSign";

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
      if (this.props.backendTxSign) {
        await backendTxSign(this.state.value);
      } else {
        const accounts = await web3.eth.getAccounts();
        await newsInbox.methods.addMessage(this.state.value).send({
          from: accounts[0]
        });
      }
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
