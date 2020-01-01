import React from "react";
import Layout from "../components/Layout";
import MessageForm from "../components/MessageForm";

const Brave = () => {
  return (
    <Layout>
      <h1 className="title">Dodaj wiadomość przez Brave</h1>
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
      `}</style>
    </Layout>
  );
};

export default Brave;
