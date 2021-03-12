import React, { useState } from "react";
import { useParams } from "react-router-dom";

const CreateCardForm = ({ createCard, pageName }) => {
  const { deckId } = useParams();
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
    createCard(deckId, formData);
    setFormData({ ...initialFormState });
  }
  
  return (
    <section id="form" className="form">
      <h2 className="form__heading">{pageName}</h2>
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
            <button className="button button--submit">Create</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateCardForm;