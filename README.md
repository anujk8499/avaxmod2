# AnujKumarWallet Smart Contract

## Overview

This Solidity smart contract represents a simple wallet named `AnujKumarWallet`. The wallet allows the owner to deposit and withdraw tokens, check the balance, and purchase NFTs. It includes a basic access control mechanism using a passkey.

## Contract Details

- **Contract Name:** AnujKumarWallet
- **Version:** 0.8.9

## Features

- Deposit tokens into the wallet.
- Withdraw tokens from the wallet.
- Check the current balance of the wallet.
- Purchase NFTs using the wallet balance.

  ## Installation

After cloning the github, you will want to do the following to get the code running on your computer.

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

After this, the project will be running on your localhost. 
Typically at http://localhost:3000/
