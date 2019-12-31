import React from "react";
import Link from "next/link";

const links = [
  { src: "/metamask", label: "1 sposób - MetaMask" },
  { src: "/brave", label: "2 sposób - Brave" }
];

const Nav = () => (
  <nav>
    <div>
      <Link href="/">
        <a>Strona główna</a>
      </Link>
    </div>
    <div>Dodaj swoją wiadomość na jeden z poniższych sposobów</div>
    <div>
      {links.map(({ src, label }) => (
        <Link href={src} key={src + label}>
          <a>{label}</a>
        </Link>
      ))}
    </div>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
        display: flex;
        flex-direction: column;
      }
      div {
        margin: 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
        padding: 0 8px;
      }
    `}</style>
  </nav>
);

export default Nav;
