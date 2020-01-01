import React from "react";
import Layout from "../components/Layout";
import MessageFormSecond from "../components/MessageFormSecond";

const Backend = () => {
  return (
    <Layout>
      <h1 className="title">
        Dodaj wiadomość z wykorzystaniem portfela Ethereum ukrytego w kodzie
      </h1>
      <p>
        Jeśli zależy nam aby interfejs aplikacji był jak najbardziej przyjazny
        podpisujemy transakcję automatycznie w kodzie za pomocą konta
        pomocniczego. Użytkownik nie musi nawet wiedzieć, że korzysta ze
        zdecentralizowanej aplikacji.
      </p>
      <MessageFormSecond />
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
