pragma solidity ^0.4.2;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/Stewards.sol";

contract TestStewards {

  function testItStoresAValue() public {
    Stewards stewards = Stewards(DeployedAddresses.Stewards());

    stewards.set(89);

    uint expected = 89;

    Assert.equal(stewards.get(), expected, "It should store the value 89.");
  }
}
