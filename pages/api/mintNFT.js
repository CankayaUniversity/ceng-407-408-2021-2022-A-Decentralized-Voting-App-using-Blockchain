import { ELECTION_ADDRESS, ELECTION_ABI } from "../../lib/constants";
import Moralis from "moralis/node";
import { ethers } from "ethers";

const mintNFT = async (req, res) => {
  await Moralis.start({
    serverUrl: process.env.MORALIS_SERVER_URL,
    appId: process.env.MORALIS_APP_ID,
    masterKey: process.env.MORALIS_MASTER_KEY,
  });


  const metadata = {
    name: `${req.body.name}`,
    description: `${req.body.name} voted`,
    image: `ipfs://QmY4tKpDGzVHzaSkQc5gzVMCMNoznZqaX15DXkyL2bPp8Z`,
  };

  const toBtoa = Buffer.from(JSON.stringify(metadata)).toString("base64");
  const metadataFile = new Moralis.File("file.json", { base64: toBtoa });

  await metadataFile.saveIPFS({ useMasterKey: true });

  const metadataURI = metadataFile.ipfs();

  const provider = ethers.getDefaultProvider(process.env.ALCHEMY_API_URL, {
    chainId: 4,
    name: "rinkeby",
  });

  const walletWithProvider = new ethers.Wallet(
    process.env.WALLET_PRIVATE_KEY,
    provider
  );

  const contract = new ethers.Contract(
    ELECTION_ADDRESS,
    ELECTION_ABI,
    walletWithProvider
  );

  const tx = await contract.mintNFT(req.body.walletAddress, metadataURI);

  const txReceipt = await tx.wait();

  console.log(txReceipt);
  res.status(200).send({
    message: "success",
    data: { tx: tx, txReceipt: txReceipt },
  });
};

export default mintNFT;
