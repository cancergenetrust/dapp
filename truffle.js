require('dotenv').config()
var HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          "https://rinkeby.infura.io/" + process.env.INFURA_KEY
        );
      },
      network_id: "*",
      gas: 4500000,
      gasPrice: 25000000000
    }   
  }
};
