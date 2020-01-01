import React, { Component } from "react";
import Layout from "../components/Layout";
import newsInbox from "../ethereum/newsInbox";
import NewsTable from "../components/NewsTable";

class Home extends Component {
  static async getInitialProps() {
    const messageCount = await newsInbox.methods.getMessagesCount().call();
    const messages = await Promise.all(
      Array(parseInt(messageCount))
        .fill()
        .map((element, index) => {
          return newsInbox.methods.messages(index).call();
        })
    );
    const data = messages.map(element => {
      return { sender: element.sender, content: element.content };
    });
    return { data };
  }

  render() {
    const columns = ["Adres konta", "Aktualność"];
    return (
      <Layout>
        <div className="hero">
          <h1 className="title">Lista aktualności dodana w kontrakcie</h1>
          <p>
            Szczegóły kontraktu w
            <a
              href={`https://rinkeby.etherscan.io/address/${newsInbox._address}`}
            >
              etherscan.io
            </a>
          </p>
        </div>
        <div className="results">
          {this.props.data ? (
            <NewsTable columns={columns} data={this.props.data} />
          ) : (
            <p>Ładuję...</p>
          )}
        </div>
        <style jsx>{`
          .hero {
            width: 100%;
            color: #333;
          }
          .results {
            display: flex;
            justify-content: center;
            margin-top: 32px;
          }
          .title {
            margin: 0;
            width: 100%;
            padding-top: 40px;
            line-height: 1.15;
            font-size: 36px;
          }
          .title,
          p {
            text-align: center;
          }
        `}</style>
      </Layout>
    );
  }
}

export default Home;
