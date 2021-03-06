import React from "react";

const Card = ({ card }) => {
  return (
    <div>
      <p>Q: {card.front}</p>
      <p>A: {card.back}</p>
    </div>
  );
}

export default Card;