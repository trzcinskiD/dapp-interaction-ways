import React from "react";
import Layout from "../components/Layout";
import MessageForm from "../components/MessageForm";

const Brave = () => {
  return (
    <Layout>
      <h1 className="title">Dodaj wiadomość przez Brave</h1>
      <p>
        Aby dodać wiadomość potrzebujesz:
        <br /> - uruchomić tą stronę w przeglądarce brave <br />- posiadać
        skonfigurowany w przeglądarce Brave portfel Ethereum.
        <br />
        Transakcję testową proszę wykonać w sieci testowej Rinkeby.
      </p>
      <MessageForm />
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
    </Layout>
  );
};

export default Brave;
