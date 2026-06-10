// SPDX-License-Identifier: MIT
pragma solidity >=0.4.20;

contract Party {
  // Read/write party
  string public party_id;
  string public name;
  string public constituency_id;
  bool public is_active;
  mapping(address => bool) public voters;
  uint public voteCount;

  // event PartyRegistered(string name, string constituencyId);
  // event PartyDetailsUpdated(string name, string constituencyId);

  constructor() {}
  
  function setParty(string memory _id,string memory _name, string memory _constituency_id, bool active) public {
        party_id = _id;
        constituency_id = _constituency_id;
        name = _name;
        is_active = active;
        voteCount = 0;
  }

  function updateParty(
    string memory _name,
    string memory _constituency_id,
    bool active
  ) public {
    constituency_id = _constituency_id;
    name = _name;
    is_active = active;
    // emit PartyDetailsUpdated(name, _constituency_id);
  }

  function getPartyName() public view returns (string memory) {
    return name;
  }
    function getPartyId() public view returns (string memory) {
    return party_id;
  }

  function getPartyConstituencyId() public view returns (string memory) {
    return constituency_id;
  }

  function partyisActive() public view returns (bool) {
    return is_active;
  }

  function getPartyDetails() public view returns (string memory,string memory, string memory, bool) {
        return (party_id, name, constituency_id, is_active);
  }

  function castVote() public {
    // require that they haven't voted before
    require(voters[msg.sender] == true, "You have already voted for this candidate");
    // require a valid candidate
    voters[msg.sender] = true;
    voteCount++;
  }
}
