import React from "react";

const NotEnoughCards = ({ cardCount, deckId, deckName, handleAddCardClick }) => {
  let cardText = `There are ${cardCount} cards in the deck.`
  if (cardCount === 1) {
    cardText = "There is 1 card in the deck.";
  }
  return (
    <div className="not-enough">
      <h2>{deckName}</h2>
      <h3>Not Enough Cards</h3>
      <p>You need at least 3 cards to study. {cardText}</p>
      <button className="btn-md btn btn-primary mt-2" onClick={() => handleAddCardClick(deckId)}>
        Add Card
      </button>
    </div>
  )
}

export default NotEnoughCards;