pragma solidity >=0.4.24 <0.6.0;

contract Stewards {
  address public founder;

  mapping (address => string) public hashes;
  address[] public addresses;

  constructor() public {
    founder = msg.sender;
  }

  function getNumStewards() public view returns (uint) {
    return addresses.length;
  }

  function nominateSteward(address stewardAddress) public {
    require((msg.sender == founder) || (bytes(hashes[msg.sender]).length != 0),
            "Only founder or existing stewards may nominate");
    addresses.push(stewardAddress);
    hashes[stewardAddress] = "nominated";
  }

  function setStewardHash(string memory _hash) public {
    require(bytes(hashes[msg.sender]).length != 0, "You must be nominated first");
    hashes[msg.sender] = _hash;
  }
}
