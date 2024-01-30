// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    address public admin;
    mapping(address => bool) public voters;
    mapping(string => uint256) public votesCount;
    uint256 public totalVotes;

    event Voted(address indexed voter, string candidate);
    event VoterRevoked(address indexed revokedVoter);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }

    modifier onlyVoter() {
        require(voters[msg.sender], "You are not a registered voter");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function registerVoter(address _voter) external onlyAdmin {
        voters[_voter] = true;
    }

    function revokeVoter(address _voter) external onlyAdmin {
        require(voters[_voter], "Voter is not registered");
        voters[_voter] = false;
        emit VoterRevoked(_voter);
    }

    function vote(string memory _candidate) external onlyVoter {
        require(bytes(_candidate).length > 0, "Candidate name cannot be empty");

        votesCount[_candidate]++;
        totalVotes++;
        emit Voted(msg.sender, _candidate);
    }


}
