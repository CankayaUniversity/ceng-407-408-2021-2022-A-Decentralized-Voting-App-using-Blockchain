import { client } from "../../lib/sanity";

const saveVote = async (req, res) => {
  console.log("----------------", req.body.currentUser);
  try {
    await client.patch(req.body.currentUser).inc({ votes: 1 }).commit();

    res.status(200).send({ message: "success" });
  } catch (error) {
    res.status(500).send({ message: "error", data: error.message });
  }
};

export default saveVote;
