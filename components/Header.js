import React from "react";
import { useContext } from "react";
import { ElectionContext } from "../context/ElectionContext";

import header from "../styles/Header.module.css";

const currentAccount = "";

const Header = () => {
  const { connectWallet, currentAccount, disconnectWallet } =
    useContext(ElectionContext);

  return (
    <div className={header.header}>
      <div className={header.main}>
        <h1 className={header.logo}>BlockVote</h1>

        <div className={header.rightMenu}>
          {currentAccount ? (
            <>
              <div className={header.currentAccount}>
                <span className="accountAddress">
                  {currentAccount.slice(0, 6)}...{currentAccount.slice(39)}
                </span>
              </div>
              <button
                className={header.logout}
                onClick={() => disconnectWallet()}
              >
                Logout
              </button>
            </>
          ) : (
            <button
              className={header.authButton}
              onClick={() => connectWallet()}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
