const Stewards = artifacts.require("../contracts/Stewards.sol");

contract("Stewards", accounts => {
  const [firstAccount] = accounts;

  it("...founder must be deployer ", async () => {
    const stewards = await Stewards.new();
    assert.equal(await stewards.founder.call(), firstAccount);
  });
});

contract("Stewards", accounts => {
  it("...must be founder or steward to nominate", async () => {
    const stewards = await Stewards.new();
    try {
      await stewards.nominateSteward(accounts[1], {from: accounts[1]});
      assert.fail();
    } catch (err) {
      assert.ok(/revert/.test(err.message));
    }

    // nominate as the founder
    await stewards.nominateSteward(accounts[1], {from: accounts[0]});
    assert.equal(await stewards.addresses(0), accounts[1]);
    assert.equal(await stewards.hashes(accounts[1]), "nominated");

    // nominate as an existing steward
    await stewards.nominateSteward(accounts[2], {from: accounts[1]});
    assert.equal(await stewards.addresses(1), accounts[2]);
    assert.equal(await stewards.hashes(accounts[2]), "nominated");
  });
});

contract("Stewards", accounts => {
  it("...can only set their hash if nominated", async () => {
    const stewards = await Stewards.new();

    try {
      await stewards.setStewardHash("cafebeef", {from: accounts[2]});
      assert.fail();
    } catch (err) {
      assert.ok(/revert/.test(err.message));
    }

    await stewards.nominateSteward(accounts[1], {from: accounts[0]});
    await stewards.nominateSteward(accounts[2], {from: accounts[1]});

    await stewards.setStewardHash("cafebeef", {from: accounts[2]});
    assert.equal(await stewards.hashes(accounts[2]), "cafebeef");
  });
});

contract("Stewards", accounts => {
  it("...should store addresses", async () => {
    const stewards = await Stewards.new();

    assert.equal(await stewards.getNumStewards.call(), 0);
    await stewards.nominateSteward(accounts[1], {from: accounts[0]});
    assert.equal(await stewards.getNumStewards.call(), 1);
    assert.equal(await stewards.hashes(accounts[1]), "nominated");

    stewards.setStewardHash("cafebeef", {from: accounts[1]});
    assert.equal(await stewards.hashes(await stewards.addresses(0)), "cafebeef");
  });
});
