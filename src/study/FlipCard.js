import React from "react";

const FlipCard = ({ card, cardNumber, totalCards, displayFront, handleFlipClick, handleNextClick }) => {
  let cardText = card.front;
  let buttons = (
    <div className="card-text">
      <button className="btn btn-primary" onClick={() => handleFlipClick()}>Flip</button>
    </div>  
    );
  if (!displayFront) { 
    cardText = card.back;
    buttons = (
      <div className="card-text">
        <button className="btn btn-secondary mr-2">Flip</button>
        <button className="btn btn-primary" onClick={() => handleNextClick()}>Next</button>
      </div>
    );
  }
  return (
    <div className="card mt-5" style={{width: "30rem"}}>
      <div className="card-body">
        <h3 className="card-title">Card {cardNumber} of {totalCards}</h3>
        <p className="card-text">{cardText}</p>
        {buttons}
      </div>
    </div>
  );
}

export default FlipCard;