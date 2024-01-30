# Voting System Smart Contract

This is a simple Ethereum smart contract written in Solidity for a basic voting system. The contract allows an administrator to manage registered voters and conduct voting for different candidates.

## Features

- **Administrator:** The contract has an administrator, who has special privileges to manage the system.
- **Voter Registration:** Only the administrator can register voters, allowing them to participate in the voting process.
- **Voter Revocation:** The administrator can also revoke the voting rights of a registered voter.
- **Voting:** Registered voters can cast their votes for a specific candidate.
- **Vote Count:** The contract keeps track of the total number of votes cast and the count for each candidate.
- **Events:** The contract emits events for successful votes and revoked voters.

## Smart Contract Details

### State Variables

- `admin`: The Ethereum address of the administrator who has control over the contract.
- `voters`: A mapping to keep track of registered voters. A boolean value indicates whether a voter is registered or not.
- `votesCount`: A mapping to store the count of votes for each candidate.
- `totalVotes`: The total number of votes cast.

### Events

- `Voted(address indexed voter, string candidate)`: Emitted when a registered voter casts a vote for a candidate.
- `VoterRevoked(address indexed revokedVoter)`: Emitted when the administrator revokes the voting rights of a registered voter.

### Modifiers

- `onlyAdmin`: A modifier that restricts the execution of a function to the administrator only.
- `onlyVoter`: A modifier that restricts the execution of a function to registered voters only.

### Functions

- `constructor()`: Initializes the contract with the address of the deploying account as the administrator.
- `registerVoter(address _voter) external onlyAdmin`: Allows the administrator to register a new voter.
- `revokeVoter(address _voter) external onlyAdmin`: Allows the administrator to revoke the voting rights of a registered voter
- `vote(string memory _candidate) external onlyVoter`: Allows registered voters to cast their votes for a specific candidate.



  ## Installation

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/
