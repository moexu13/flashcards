import React from "react";
import { useParams } from "react-router-dom";
import DetailCard from "../components/DetailCard";

const DeckDetail = ({ decks, handleAddCardClick, handleEditClick, handleDeleteClick }) => {
  const { deckId } = useParams();

  if (decks.length === 0 || !deckId) {
    return (<div>Loading...</div>);
  }
  
  const deck = decks.find(item => `${item.id}` === deckId);
  const cards = deck.cards.map(card => (
    <div key={card.id} className="deck-card"><DetailCard card={card} /></div>)
  );

  return (
    <section className="deck-detail">
      <div className="row justify-content-center">
        <div className="action__buttons">
          <button className="btn-md button button--edit" onClick={() => handleEditClick(deckId)}>
            Edit Deck
          </button>
          <button className="btn-md button button--study">
            Study Deck
          </button>
          <button className="btn-md button button--add" onClick={() => handleAddCardClick(deckId)}>
            Add Card
          </button>
          <button className="btn-md button button--delete" 
            onClick={() => {
              if (window.confirm("Are you sure?")) handleDeleteClick(deckId)}}>
            Delete Deck
          </button>
        </div>
      </div>
      <h2>{deck.name}</h2>
      <p className="deck-detail__description">{deck.description}</p>
      <h3>Cards In Deck</h3>
      <div className="card-list">
        {cards}
      </div>
    </section>
  );
}

export default DeckDetail;