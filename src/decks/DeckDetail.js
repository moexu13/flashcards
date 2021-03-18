import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";

import DetailCard from "../components/DetailCard";

const DeckDetail = 
  ({ handleAddCardClick, handleEditDeckClick, handleDeleteDeckClick, 
    handleEditCardClick, handleDeleteCardClick, handleStudyClick }) => {
  const { deckId } = useParams();
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState({});

  // this breaks qualified tests
  // if (!decks || decks.length === 0 || !deckId) {
  //   return (<div>Loading...</div>);
  // }

  useEffect(() => {
    setDeck({});
    const loadDeck = async () => {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    loadDeck();
  }, []);

  useEffect(() => {
    if (deck && deck.cards && deck.cards.length > 0) {
      setCards(deck.cards.map(card => (
        <div key={card.id} className="deck-card">
          <DetailCard 
            card={card} 
            handleEditCardClick={handleEditCardClick} 
            handleDeleteCardClick={handleDeleteCardClick}
          />
        </div>)
      ));
    }
  }, [deck]);
  
  return (
    <section className="deck-detail">
      <div className="row justify-content-center">
        <div className="btn-group mb-5" role="group" aria-label="action buttons">
          <button className="btn-md btn btn-primary mr-2" onClick={() => handleEditDeckClick(deckId)}>
            Edit Deck
          </button>
          <button className="btn-md btn btn-primary mr-2" onClick={() => handleStudyClick(deckId)}>
            Study Deck
          </button>
          <button className="btn-md btn btn-primary mr-2" onClick={() => handleAddCardClick(deckId)}>
            Add Card
          </button>
          <button className="btn-md btn btn-danger" 
            onClick={() => {
              if (window.confirm("Are you sure?")) handleDeleteDeckClick(deckId)}}>
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