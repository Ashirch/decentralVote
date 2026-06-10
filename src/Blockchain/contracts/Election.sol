// SPDX-License-Identifier: MIT
pragma solidity >=0.4.20;

contract Election {
    struct Candidate {
        string candidate_id;
        string election_id;
        string constituency_id;
        uint voteCount;
        mapping(address => bool) voters;
    }
    
    mapping(string => Candidate) public candidates;

    function addCandidate(string memory _candidate_id, string memory _election_id, string memory _constituency_id) public {
        require(bytes(_candidate_id).length > 0, "Candidate ID cannot be empty");
        require(bytes(_election_id).length > 0, "Election ID cannot be empty");
        require(bytes(_constituency_id).length > 0, "Constituency ID cannot be empty");
        require(candidates[_candidate_id].voteCount == 0, "Candidate with this ID already exists");
        

        // Candidate storage newCandidate = Candidate({
        //     candidate_id: _candidate_id,
        //     election_id: _election_id,
        //     constituency_id: _constituency_id,
        //     voteCount: 0
        // });
        
        // candidates[_candidate_id] = newCandidate;


        // Initialize the nested mapping for the candidate
        candidates[_candidate_id].voters[msg.sender] = false;
    }

    function vote(string memory _candidateId) public {
        // require that they haven't voted before
        require(!candidates[_candidateId].voters[msg.sender], "You have already voted for this candidate");

        // require a valid candidate
        require(bytes(_candidateId).length > 0, "Invalid candidate ID");

        // record that voter has voted
        candidates[_candidateId].voters[msg.sender] = true;

        // update candidate vote Count
        candidates[_candidateId].voteCount++;
    }
}
