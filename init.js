var Stewards = artifacts.require("./Stewards.sol")

module.exports = async function(deployer, network, accounts) {
  let stewards = await Stewards.deployed()
  accounts = await web3.eth.getAccounts()
  console.log("Nominating", accounts[0])
  await stewards.nominateSteward(accounts[0])
  await stewards.setStewardHash("QmStJHN5CvcUbwkvVfMkCSmW4c9xgQRdMUv1r2h1VJxmZv")
  console.log("Done.")
}
