const { ethers } = require("hardhat");

const main = async () => {
  const electionFactory = await ethers.getContractFactory("ElectionERC721");
  const ElectionContract = await electionFactory.deploy();

  console.log("ELECTION CONTRACT ADDRESS:", ElectionContract.address);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log("Error in deploying Contract >> ", error);
    process.exit(1);
  });
