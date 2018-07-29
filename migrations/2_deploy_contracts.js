var Stewards = artifacts.require("./Stewards.sol");

module.exports = function(deployer) {
  deployer.deploy(Stewards);
};
