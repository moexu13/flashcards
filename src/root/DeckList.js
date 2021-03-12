import React from "react";
import { Link } from "react-router-dom";
import DeckCard from "../components/DeckCard";

const DeckList = ({ decks }) => {
  const buildDeckList = decks.map(deck => (
    <section key={deck.id}>
      <DeckCard deck={deck} />
    </section>
  ));
  return (
    <div className="decks-list">
      <Link to="/decks/new">
        <button className="button button--create">+ New Deck</button>
      </Link>
      {buildDeckList}
    </div>
  );
}

export default DeckList;