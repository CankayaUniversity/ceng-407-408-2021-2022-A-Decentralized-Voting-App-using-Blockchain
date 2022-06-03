import React from "react";
import Image from 'next/image'
import { useContext } from "react";
import { ElectionContext } from "../context/ElectionContext";

const currentAccount = "";

const Header = () => {
  const { connectWallet, currentAccount, disconnectWallet } =
    useContext(ElectionContext);

  return (
    <div className="header">
      <div className="main">
        <h1>Block-Vote</h1>

        <div className="rightMenu">
          {currentAccount ? (
            <>
              <div className="currentAccount">
                <Image
                  src={
                    "https://moralis.io/wp-content/uploads/2021/05/moralisWhiteLogo.svg"
                  }
                  alt="moralis"
                  height={20}
                  width={20}
                />
                <span className="accountAddress">
                  {currentAccount.slice(0, 6)}...{currentAccount.slice(39)}
                </span>
              </div>
              <button
                className="style.authButton"
                onClick={() => disconnectWallet()}
              >
                Logout
              </button>
            </>
          ) : (
            <button className="authButton" onClick={() => connectWallet()}>
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
