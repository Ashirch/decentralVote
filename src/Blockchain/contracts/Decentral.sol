// SPDX-License-Identifier: MIT
pragma solidity >=0.4.20;
import "./Candidate.sol";
import "./Party.sol";
import './Constituency.sol';

contract Decentral {
    mapping(string => Party) private parties;
    mapping(string => Candidate) private candidates;
    mapping(string => Constituency) private constituency;
    string[] private partyIds; // Maintain an array of party IDs

    constructor() {}

    function addNewParty(
        string memory _party_id,
        string memory _name,
        string memory _constituency_id
    ) public {
        Party newParty = new Party(); // Initialize the party as active
        // revert("Checking Party");
        newParty.setParty(_party_id, _name, _constituency_id, true);
        parties[_party_id] = newParty;
        partyIds.push(_party_id); // Add the party ID to the array
    }

    function updateParty(
        string memory _party_id,
        string memory _name,
        string memory _constituency_id,
        bool _active
    ) public {
        parties[_party_id].updateParty(_name, _constituency_id, _active);
    }

    function getAllActiveParties() public view returns (Party[] memory) {
        uint256 activePartyCount = 0;

        // First, count the number of active parties
        for (uint256 i = 0; i < partyIds.length; i++) {
            if (parties[partyIds[i]].partyisActive()) {
                activePartyCount++;
            }
        }

        // Create an array to store the active party objects
        Party[] memory activeParties = new Party[](activePartyCount);
        uint256 activePartyIndex = 0;

        // Second, populate the array with active party objects
        for (uint256 i = 0; i < partyIds.length; i++) {
            string memory partyId = partyIds[i];
            if (parties[partyId].partyisActive()) {
                activeParties[activePartyIndex] = parties[partyId];
                activePartyIndex++;
            }
        }

        return activeParties;
    }

    function castVote(string memory _partyId) public {
        // require a valid partyId
        require(bytes(_partyId).length > 0, "Invalid candidate ID");
        parties[_partyId].castVote();
    }
}
