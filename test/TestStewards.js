const Stewards = artifacts.require("../contracts/Stewards.sol");

contract("Stewards", accounts => {
  it("...should store addresses", async () => {
    const stewardsInstance = await Stewards.deployed();

    let numStewards = await stewardsInstance.size.call();
    assert.equal(numStewards, 0);

    stewardsInstance.set("cafebeef", {from: accounts[0]});

    numStewards = await stewardsInstance.size.call();
    assert.equal(numStewards, 1);

    const address = await stewardsInstance.addresses(0)
    const ipfsHash = await stewardsInstance.ipfsHashes(address)
    assert.equal(ipfsHash, "cafebeef");
  });
});
