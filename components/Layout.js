import React from "react";
import Head from "next/head";
import Nav from "../components/Nav";

const Layout = props => (
  <div>
    <Head>
      <title>Integracja dapp</title>
    </Head>
    <Nav />
    {props.children}
    <style jsx global>{`
      body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      a {
        color: #067df7;
        text-decoration: none;
        padding: 0 8px;
      }
      a:hover {
        text-decoration: underline;
      }
    `}</style>
  </div>
);

export default Layout;
