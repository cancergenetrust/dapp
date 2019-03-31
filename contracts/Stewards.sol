pragma solidity >=0.4.24 <0.6.0;

contract Stewards {

  mapping (address => string) public ipfsHashes;
  address[] public addresses;

  function size() public view returns (uint) {
      return addresses.length;
  }

  function set(string memory _ipfsHash) public {
    if (bytes(ipfsHashes[msg.sender]).length == 0) {
      addresses.push(msg.sender);
    }
    ipfsHashes[msg.sender] = _ipfsHash;
  }
}
