import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";

import FlipCard from "./FlipCard";
import NotEnoughCards from "./NotEnoughCards";

const Study = ({ handleAddCardClick }) => {
  const { deckId } = useParams();
  const history = useHistory();
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState({});
  const [count, setCount] = useState(0);
  const [displayFront, setDisplayFront] = useState(true);

  useEffect(() => {
    const loadDeck = async () => {
      const response = await readDeck(deckId);
      setDeck(response);
      setCards(response.cards);
    }
    loadDeck();
  }, []);

  const handleFlipClick = () => {
    setDisplayFront(false);
  }

  const handleNextClick = () => {
    if (count + 1 < cards.length) {
      setCount(count + 1);
      setDisplayFront(true);
    } else {
      console.log("restart");
      const restart = window.confirm("You've reached the end of the deck. Restart?");
      if (restart) {
        setCount(0);
        setDisplayFront(true);
      } else {
        history.push(`/decks/${deckId}`);
      }
    }
  }
  
  if (cards && cards.length < 3) {
    return (
      <NotEnoughCards 
        cardCount={cards.length} 
        deckId={deckId}
        deckName={deck.name} 
        handleAddCardClick={handleAddCardClick}
      />
    );
  } else {
    return (
      <div className="study-deck">
        <h2>{deck.name}</h2>
        <FlipCard 
          card={cards[count]} 
          displayFront={displayFront}
          cardNumber={count + 1}
          totalCards={cards.length}
          handleFlipClick={handleFlipClick}
          handleNextClick={handleNextClick}  
        />
      </div>
    );
  }
}

export default Study;