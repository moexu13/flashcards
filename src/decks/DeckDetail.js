import React from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";

const DeckDetail = ({ decks }) => {
  const { deckId } = useParams();
  const deck = decks.find(item => `${item.id}` === deckId);
  const cards = deck.cards.map(card => <li key={card.id}><Card card={card} /></li>)
  return (
    <div className="deck-detail">
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      <h3>Cards In Deck</h3>
      <ul>
        {cards}
      </ul>
    </div>
  );
}

export default DeckDetail;