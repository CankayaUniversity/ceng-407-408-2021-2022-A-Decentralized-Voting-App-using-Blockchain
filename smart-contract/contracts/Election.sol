pragma solidity ^0.8.4;

contract Election {
    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }

    uint256 public candidatesCount;

    mapping(uint256 => Candidate) public Candidates;
    mapping(address => bool) public Voters;

    constructor() {
        addCandidate("Ahmet");
        addCandidate("Mehmet");
        addCandidate("Veli");
    }

    event votedEvent(uint256 indexed _candidateId);

    event addedCandidateEvent(string indexed _name);

    function addCandidate(string memory _name) public {
        Candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
        candidatesCount++;
        emit addedCandidateEvent(_name);
    }

    function castVote(uint256 _candidateId) public {
        require(!Voters[msg.sender]);
        require(_candidateId >= 0 && _candidateId <= candidatesCount);
        Candidates[_candidateId].voteCount++;
        Voters[msg.sender] = true;
        emit votedEvent(_candidateId);
    }
}
