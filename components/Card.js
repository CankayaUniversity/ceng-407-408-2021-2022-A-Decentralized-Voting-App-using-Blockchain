import React, { useContext } from "react";
import { ElectionContext } from "../context/ElectionContext";

import c from "../styles/Card.module.css";


const Card = ({ card }) => {
  const { handleVote } = useContext(ElectionContext);

  const hVote = () => {
    handleVote(card);
  };
  return (
    <div className={c.card}>
      <div className={c.main}>
        <h1>{card.name}</h1>
        <button className={c.voteButton} onClick={() => hVote()}>Vote</button>
      </div>
    </div>
  );
};

export default Card;
