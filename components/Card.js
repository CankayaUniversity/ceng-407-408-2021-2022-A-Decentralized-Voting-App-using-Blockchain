import React, { useContext } from "react";
import { ElectionContext } from "../context/ElectionContext";

const Card = ({ card }) => {
  const { handleVote } = useContext(ElectionContext);

  const hVote = () => {
    handleVote();
  };
  return (
    <div className="card">
      <div className="cardMain">
        <h1>{card.name}</h1>
        <button onClick={() => hVote()}>Vote</button>
      </div>
    </div>
  );
};

export default Card;
