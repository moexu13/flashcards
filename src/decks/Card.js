import React from "react";

const Card = ({ card }) => {
  return (
    <div className="card">
      <p>{card.front}</p>
      <p>{card.back}</p>
    </div>
  );
}

export default Card;