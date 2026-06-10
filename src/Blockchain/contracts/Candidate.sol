// SPDX-License-Identifier: MIT 
pragma solidity >=0.4.20;

contract Candidate {
    // Read/write candidate
    string private candidate_id;
    string private constituency_id;
    string private party_id;
    string private election_id;

    event CandidateRegistered(string constituencyId, string partyId, string electionId);
    event CandidateDetailsUpdated(string constituencyId, string partyId, string electionId);


    constructor() {
    }

    function setCandidate(string memory _candidate_id,string memory _constituency_id, string memory _party_id, string memory _election_id) public {
        candidate_id = _candidate_id;
        constituency_id = _constituency_id;
        party_id = _party_id;
        election_id = _election_id;
        emit CandidateRegistered(_constituency_id, _party_id, _election_id); 
    }

    function updateCandidateDetails(
        string memory _newConstituencyId,
        string memory _newPartyId,
        string memory _newElectionId
    ) public {
        party_id = _newPartyId;
        constituency_id = _newConstituencyId;
        election_id = _newElectionId;

        emit CandidateDetailsUpdated(constituency_id, party_id, election_id);
    }
}