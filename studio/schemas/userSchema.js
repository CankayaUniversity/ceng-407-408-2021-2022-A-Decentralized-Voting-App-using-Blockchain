export const userSchema = {
  name: "users",
  type: "document",
  title: "Users",
  initialValue: {
    isCandidate: false,
  },
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
    },
    {
      name: "walletAddress",
      type: "string",
      title: "Wallet Address",
    },
    {
      name: "votes",
      type: "number",
      title: "Vote Count",
    },
    {
      name: "isCandidate",
      type: "boolean",
      title: "Is Candidate",
    },
    {
      name: "profileImage",
      type: "image",
      title: "Profile Image",
    },
  ],
};
