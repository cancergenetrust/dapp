require('dotenv').config();
var HDWalletProvider = require("truffle-hdwallet-provider");
const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "src/contracts"),
  networks: {
    local: {
      provider: () => new HDWalletProvider(
        process.env.CGT_TEST_MNENOMIC, "http://127.0.0.1:18545"),
      network_id: 999,
    },
    cgt_rinkeby: {
      provider: () => new HDWalletProvider(
        process.env.CGT_PRODUCTION_MNENOMIC, "https://rinkeby.infura.io/v3/" + process.env.INFURA_API_KEY),
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000
    },
    ucsf_rinkeby: {
      provider: () => new HDWalletProvider(
        process.env.UCSF_PRODUCTION_MNENOMIC, "https://rinkeby.infura.io/v3/" + process.env.INFURA_API_KEY),
      network_id: 4,
      gas: 4500000,
      gasPrice: 10000000000
    }
  }
};
