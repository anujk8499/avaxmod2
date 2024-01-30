const hrdhat = require("hardhat");

async function startFunction() {
  const AnujWallet = await hrdhat.ethers.getContractFactory("VotingSystem");
  const AnujAssessment = await AnujWallet.deploy();
  await AnujAssessment.deployed();

  console.log(`Contract deployed to ${AnujAssessment.address} `);
}
startFunction().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
