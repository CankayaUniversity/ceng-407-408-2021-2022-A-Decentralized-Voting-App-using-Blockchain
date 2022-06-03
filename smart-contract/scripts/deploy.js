const { ethers } = require("hardhat");

const main = async () => {
  const electionFactory = await ethers.getContractFactory("Election");
  const ElectionContract = await electionFactory.deploy();

  console.log("Election contract address:", ElectionContract.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("Error in deploying Contract >> ", error);
    process.exit(1);
  });
