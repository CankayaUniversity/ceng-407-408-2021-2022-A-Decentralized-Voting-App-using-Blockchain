import { useState, createContext, useEffect } from "react";
import { useMoralis } from "react-moralis";
import { faker } from "@faker-js/faker";

export const ElectionContext = createContext();

export const ElectionProvider = ({ children }) => {
  const { authenticate, isAuthenticated, user, Moralis } = useMoralis();
  const [cardsData, setCardsData] = useState([]);
  const [currentAccount, setCurrentAccount] = useState();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    checkWalletConnection();

    if (isAuthenticated) {
      requestUsersData(user.get("ethAddress"));
      requestCurrentUserData(user.get("ethAddress"));
    }
  }, [isAuthenticated]);

  const checkWalletConnection = async () => {
    if (isAuthenticated) {
      const address = user.get("ethAddress");
      setCurrentAccount(address);
      requestToCreateUserProfile(address, faker.name.findName());
    } else {
      setCurrentAccount("");
    }
  };

  const connectWallet = async () => {
    if (!isAuthenticated) {
      try {
        await authenticate({
          signingMessage: "Log in using Moralis",
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const disconnectWallet = async () => {
    await Moralis.User.logOut();
    setCurrentAccount("");
  };

  const requestToCreateUserProfile = async (walletAddress, name) => {
    try {
      await fetch(`/api/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userWalletAddress: walletAddress,
          name: name,
        }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const requestCurrentUserData = async (walletAddress) => {
    try {
      const response = await fetch(
        `/api/fetchCurrentUserData?activeAccount=${walletAddress}`
      );
      const data = await response.json();

      setCurrentUser(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const requestUsersData = async (activeAccount) => {
    try {
      const response = await fetch(
        `/api/fetchUsers?activeAccount=${activeAccount}`
      );
      const data = await response.json();

      setCardsData(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleVote = async (card) => {
    const vote = {
      num: 1,
      candidate: card.walletAddress,
    };

    const mintData = {
      walletAddress: card.walletAddress,
      name: card.name,
    };

    try {
      await fetch("/api/saveVote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vote),
      });

      await fetch("/api/mintNFT", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(mintData),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ElectionContext.Provider
      value={{
        connectWallet,
        disconnectWallet,
        handleVote,
        cardsData,
        currentAccount,
        currentUser,
      }}
    >
      {children}
    </ElectionContext.Provider>
  );
};
