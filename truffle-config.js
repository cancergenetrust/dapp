require('dotenv').config();
var HDWalletProvider = require("truffle-hdwallet-provider");
const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "build/contracts"),
  networks: {
    local: {
      host: "127.0.0.1",
      port: 18545,
      network_id: "*"
    },
    rinkeby: {
      provider: () => new HDWalletProvider(
        process.env.MNENOMIC, "https://rinkeby.infura.io/v3/" + process.env.INFURA_API_KEY),
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000,
    },
    ropsten: {
      provider: () => new HDWalletProvider(
        process.env.MNENOMIC, "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY),
      network_id: 3,
      gas: 4700000,
      gasPrice: 100000000000
    }
  }
};
