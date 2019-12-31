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
  </div>
);

export default Layout;
