import React, { Component } from "react";
import newsInbox from "../ethereum/newsInbox";
import web3 from "../ethereum/web3";

export class MessageForm extends Component {
  state = {
    value: "",
    errorMessage: "",
    successMessage: "",
    loading: false
  };
  onSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true, errorMessage: "", successMessage: "" });
    try {
      const accounts = await web3.eth.getAccounts();
      console.log(accounts[0], this.state.value);
      await newsInbox.methods.addMessage(this.state.value).send({
        from: accounts[0]
      });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false, value: "", successMessage: "Sukces!" });
  };
  render() {
    const { successMessage, errorMessage, value, loading } = this.state;
    return (
      <>
        <form>
          <div>
            <input
              value={value}
              size={80}
              onChange={e => this.setState({ value: e.target.value })}
            />
            <button onClick={this.onSubmit} disabled={loading}>
              {loading ? "W trakcie..." : "Dodaj"}
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
