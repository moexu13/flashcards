import React from "react";

const DetailCard = ({ card, handleEditCardClick, handleDeleteCardClick }) => {
  return (
    <div className="card mt-2 mb-3" style={{width: "45rem"}}>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{card.front}</li>
        <li className="list-group-item">{card.back}</li>
      </ul>
      <div className="card-footer">
        <button className="btn btn-secondary mr-2" 
          onClick={() => handleEditCardClick(card)}>Edit
        </button>
        <button className="btn btn-danger" 
          onClick={() => {
            if (window.confirm("Are you sure?")) handleDeleteCardClick(card.deckId, card.id)}}>
            Delete
        </button>
      </div>
    </div>
  );
}

export default DetailCard;