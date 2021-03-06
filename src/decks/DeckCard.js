import React from "react";
import { Link } from "react-router-dom";

const DeckCard = ({ deck }) => {
  return (
    <div className="deck-card">
      <Link to={`decks/${deck.id}`}>
        <h2 className="deck-card__title">{deck.name}</h2>
        <hr className="deck-card__title--separator" />
        <p>{deck.description}</p>
      </Link>
    </div>
  );
}

export default DeckCard;