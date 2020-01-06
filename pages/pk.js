import React from "react";
import Layout from "../components/Layout";
import MessageForm from "../components/MessageForm";

const Backend = () => {
  return (
    <Layout>
      <h1 className="title">
        Dodaj wiadomość z wykorzystaniem klucza prywatnego własnego portfela
        Ethereum
      </h1>
      <p>
        Wpisywanie klucza prywatnego w jakikolwiek formularz zawsze wiąże się z
        dużym ryzykiem. Powinniśmy to robić jedynie gdy w pełni ufamy portalowi
        któremu udostępniamy klucz oraz jego infrastrukturze bezpieczeństwa.
        Pokazuję ten sposób przykładowo i nie zapisuję kluczy w żaden sposób.
        Nie mniej jednak proszę u podanie klucza prywatnego konta na którym nie
        macie żadnych środków poza testowymi.
      </p>
      <MessageForm pkTxSign={true} />
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

export default Backend;
