import { ELECTION_ADDRESS, ELECTION_ABI } from "../../lib/constants";
import { ethers } from "ethers";

require("dotenv").config();
const saveVoteChain = async (req, res) => {
  const id = req.body._id;

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

  const tx = await contract.castVote(id);

  const txReceipt = await tx.wait();

  res.status(200).send({
    message: "success",
    data: { tx: tx, txReceipt: txReceipt },
  });
};

export default saveVoteChain;
