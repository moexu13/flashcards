import React from "react";

const DeckCard = ({ deck }) => {
  return (
    <div className="deck-card">
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
    </div>
  );
}

export default DeckCard;