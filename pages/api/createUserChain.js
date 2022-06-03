import { ELECTION_ADDRESS, ELECTION_ABI } from "../../lib/constants";
import { ethers } from "ethers";

require("dotenv").config();

const createUserChain = async (req, res) => {
  const myName = req.body.name;
  
  const provider = ethers.getDefaultProvider(process.env.ALCHEMY_API_URL, {
    chainId: 5,
    name: "goerli",
  });

  const walletWithProvider = new ethers.Wallet(
    process.env.GOERLI_PRIVATE_KEY,
    provider
  );

  const contract = new ethers.Contract(
    ELECTION_ADDRESS,
    ELECTION_ABI,
    walletWithProvider
  );

  const tx = await contract.addCandidate(myName);

  const txReceipt = await tx.wait();

  res.status(200).send({
    message: "success",
  });
};

export default createUserChain;
