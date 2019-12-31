import Web3 from "web3";
let web3;
if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  window.ethereum.enable();
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/d1fbd2d1dbe24a2ebbd36d93311ae1db"
  );
  web3 = new Web3(provider);
}

export default web3;
