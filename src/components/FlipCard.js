import React from "react";

const FlipCard = ({ card }) => {
  return (
    <div>
      <p>Q: {card.front}</p>
      <p>A: {card.back}</p>
    </div>
  );
}

export default FlipCard;