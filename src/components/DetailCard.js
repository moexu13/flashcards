import React from "react";

const DetailCard = ({ card }) => {
  return (
    <div>
      <p>Q: {card.front}</p>
      <p>A: {card.back}</p>
    </div>
  );
}

export default DetailCard;