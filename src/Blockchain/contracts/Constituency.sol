// SPDX-License-Identifier: MIT
pragma solidity >=0.4.20;

contract Constituency {
  // Read/write party
  string public constituency_id;
  string public name;
  bool public is_active;


  constructor() {}
  
  function setConstituency(string memory _id,string memory _name,bool active) public {
        constituency_id = _id;
        name = _name;
        is_active = active;
  }

  function updateConstituency(
    string memory _name,
    bool active
  ) public {
    name = _name;
    is_active = active;
  }

  function getConstituencyName() public view returns (string memory) {
    return name;
  }
    function getConstituencyId() public view returns (string memory) {
    return constituency_id;
  }

  function constituencysActive() public view returns (bool) {
    return is_active;
  }

  function getConstituencyDetails() public view returns (string memory, string memory, bool) {
    return (name, constituency_id, is_active);
  }
}
