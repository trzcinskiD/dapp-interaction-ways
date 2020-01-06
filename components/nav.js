import React from "react";
import Link from "next/link";

const links = [
  { src: "/metaMask", label: "1 sposób - MetaMask" },
  { src: "/brave", label: "2 sposób - Brave" },
  { src: "/backend", label: "3 sposób - Backend" },
  { src: "/pk", label: "4 sposób - Klucz prywatny" }
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
      nav {
        text-align: center;
        display: flex;
        flex-direction: column;
      }
      div {
        margin: 8px;
      }
    `}</style>
  </nav>
);

export default Nav;
