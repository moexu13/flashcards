import React from "react";
import { Link } from "react-router-dom";
import DeckCard from "./DeckCard";

const DeckList = ({ decks }) => {
  const buildDeckList = decks.map(deck => (
    <Link to={`decks/${deck.id}`} key={deck.id} >
      <section key={deck.id}>
        <DeckCard deck={deck} />
      </section>
    </Link>
  ));
  return (
    <div className="decks-list">
      <Link to="/decks/new">
        <button className="btn btn-primary create-deck">Create New Deck</button>
      </Link>
      {buildDeckList}
    </div>
  );
}

export default DeckList;