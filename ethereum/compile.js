const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");
fs.removeSync(buildPath);

const contractPath = path.resolve(__dirname, "contracts", "newsInbox.sol");
const source = fs.readFileSync(contractPath, "utf8");

const jsonContractSource = JSON.stringify({
  language: "Solidity",
  sources: {
    "newsInbox.sol": {
      content: source
    }
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"]
      }
    }
  }
});

const output = JSON.parse(solc.compile(jsonContractSource)).contracts[
  "newsInbox.sol"
];

fs.ensureDirSync(buildPath);

for (let contract in output) {
  fs.outputJSONSync(
    path.resolve(buildPath, `${contract}.json`),
    output[contract]
  );
}
