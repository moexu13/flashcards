import React from "react";
import { Link } from "react-router-dom";
import DeckCard from "./DeckCard";

const DeckList = ({ decks }) => {
  // console.log("deck list", decks);
  const buildDeckList = decks.map(deck => (
    <Link to={`decks/${deck.id}`} key={deck.id} >
      <section key={deck.id}>
        <DeckCard deck={deck} />
      </section>
    </Link>
  ));
  return (
    <div className="decks-list">
      {buildDeckList}
    </div>
  );
}

export default DeckList;