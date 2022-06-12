import React, { useContext } from "react";
import Card from "./Card";
import { ElectionContext } from "../context/ElectionContext";
import cards from "../styles/Cards.module.css";

const Cards = () => {
  const { cardsData } = useContext(ElectionContext);

  return (
    <div className={cards.cards}>
      <div className={cards.container}>
        {cardsData.map((card, index) => (
          <Card card={card} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
