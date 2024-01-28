const hrdhat = require("hardhat");

async function startFunction() {
  const initAmount = 1;
  const AnujWallet = await hrdhat.ethers.getContractFactory("AnujKumarWallet");
  const AnujAssessment = await AnujWallet.deploy(initAmount);
  await AnujAssessment.deployed();

  console.log(
    `Contract deployed to ${AnujAssessment.address} with initial balance = ${initAmount} `
  );
}
startFunction().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
