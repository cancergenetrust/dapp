var Stewards = artifacts.require("./Stewards.sol");

contract('Stewards', function(accounts) {

  it("...should store the value 'hello'.", function() {
    return Stewards.deployed().then(function(instance) {
      stewardInstance = instance;

      return stewardInstance.set("hello", {from: accounts[0]});
    }).then(function() {
      return stewardInstance.get.call(accounts[0]);
    }).then(function(storedData) {
      assert.equal(storedData, "hello", "The value 'hello' was not stored.");
    });
  });

});
