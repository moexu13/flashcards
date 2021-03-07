import React from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faEdit, faPlus, faTrashAlt } from "@fortawesome/pro-light-svg-icons";
import Card from "../components/FlipCard";

const DeckDetail = ({ decks }) => {
  const { deckId } = useParams();
  if (decks.length === 0) {
    return (<div>Loading...</div>);
  }
  const deck = decks.find(item => `${item.id}` === deckId);
  const cards = deck.cards.map(card => (
    <div key={card.id} className="deck-card"><Card card={card} /></div>)
  );
  return (
    <section className="deck-detail">
      <div className="row justify-content-center">
        <div className="action__buttons">
          <button className="btn-md button button--edit">
            <FontAwesomeIcon icon={faEdit} className="icon" /> Edit Deck
          </button>
          <button className="btn-md button button--study">
            <FontAwesomeIcon icon={faBook} className="icon" /> Study Deck
          </button>
          <button className="btn-md button button--add">
            <FontAwesomeIcon icon={faPlus} className="icon" /> Add Card
          </button>
          <button className="btn-md button button--delete">
            <FontAwesomeIcon icon={faTrashAlt} className="icon" /> Delete Deck
          </button>
        </div>
      </div>
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      <h3>Cards In Deck</h3>
      <div className="card-list">
        {cards}
      </div>
    </section>
  );
}

export default DeckDetail;