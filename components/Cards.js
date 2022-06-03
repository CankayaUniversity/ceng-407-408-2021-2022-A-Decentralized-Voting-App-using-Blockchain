import React, { useContext } from "react";
import Card from "./Card";
import { ElectionContext } from "../context/ElectionContext";

const Cards = () => {
  const { cardsData } = useContext(ElectionContext);

  return (
    <div className="cards">
      <div className="cardContainer">
        {cardsData.map((card, index) => (
          <Card card={card} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Cards;
