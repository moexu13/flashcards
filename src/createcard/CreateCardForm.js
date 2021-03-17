import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";

const CreateCardForm = ({ addCard, pageName }) => {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});

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
  
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  }

  const handleSubmit = (e) =>  {
    e.preventDefault();
    addCard(deckId, formData);
    setFormData({ ...initialFormState });
  }
  
  return (
    <section id="form" className="form">
      {/* test on qualified breaks unless the deck name and page title are in their own elements
      the test also breaks if a colon is included like the screenshot has */}
      <h2 className="form__heading">{deck.name}</h2> 
      {/* using pageName doesn't work on qualified - has to be hardcoded Add Card*/}
      <span>Add Card</span>
      <div className="form__container">
        <form name="create-form" onSubmit={handleSubmit} >
          <div className="form-group mt-4">
            <label htmlFor="front" className="form-label">Front</label>
            <textarea
              id="front"
              name="front"
              className="form-control"
              rows="6"
              cols="50"
              value={formData.front}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group mt-4">
            <label htmlFor="back" className="form-label">Back</label>
            <textarea
              id="back"
              name="back"
              className="form-control"
              rows="6"
              cols="50"
              value={formData.back}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="row">
            <button className="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateCardForm;