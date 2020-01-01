import React from "react";
import Layout from "../components/Layout";
import MessageForm from "../components/MessageForm";

const MetaMask = () => {
  return (
    <Layout>
      <h1 className="title">Dodaj wiadomość przez Meta Mask</h1>
      <p>
        Aby dodać wiadomość potrzebujesz:
        <br /> - skonfigurowanego portfela Ethereum w pluginie MetaMask
        <br />
        Transakcję testową proszę wykonać w sieci testowej Rinkeby.
      </p>
      <style jsx>{`
        .title {
          margin: 0;
          width: 100%;
          padding-top: 40px;
          line-height: 1.15;
          font-size: 36px;
          text-align: center;
        }
        p {
          text-align: center;
        }
      `}</style>
      <MessageForm />
    </Layout>
  );
};

export default MetaMask;
