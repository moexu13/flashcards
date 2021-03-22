import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readCard, readDeck } from "../utils/api/index";

const CreateUpdateCardForm = ({ createOrUpdateCard, pageName }) => {
  const { deckId, cardId } = useParams();
  const [deck, setDeck] = useState({});
  const [title, setTitle] = useState("Add Card");

  useEffect(() => {
    setDeck({});
    const loadDeck = async () => {
      const response = await readDeck(deckId);
      setDeck(response);
    }
    loadDeck();
  }, []);
  
  const initialFormState = {
    front: "",
    back: ""
  }
  const [formData, setFormData] = useState({ ...initialFormState });

  useEffect(() => {
    setFormData({});
    const loadCard = async () => {
      if (cardId) {
        const response = await readCard(cardId);
        setTitle("Edit Card");
        setFormData(response);
      }
    }
    loadCard();
  }, []);
  
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  }

  const handleSubmit = (e) =>  {
    e.preventDefault();
    createOrUpdateCard(deckId, formData);
  }
  
  return (
    <section id="form" className="form">
      <h2 className="form__heading">{deck.name}</h2>
      <span>{title}</span>
      <div className="form__container">
        <form name="card-form" onSubmit={handleSubmit} >
          <div className="form-group mt-4">
            <label htmlFor="front" className="form-label">Front</label>
            <textarea
              id="front"
              name="front"
              className="form-control"
              rows="6"
              cols="50"
              value={formData.front || ""}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group mt-4">
            <label htmlFor="front" className="form-label">Back</label>
            <textarea
              id="back"
              name="back"
              className="form-control"
              rows="6"
              cols="50"
              value={formData.back || ""}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="row">
            <button className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateUpdateCardForm;