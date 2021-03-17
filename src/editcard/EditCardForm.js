import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readCard } from "../utils/api/index";

const EditCardForm = ({ editCard, pageName }) => {
  const { deckId, cardId } = useParams();
  
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData({});
    const loadCard = async () => {
      const response = await readCard(cardId);
      setFormData(response);
    }
    loadCard();
  }, []);
  
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  }

  const handleSubmit = (e) =>  {
    e.preventDefault();
    editCard(deckId, formData);
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
            <button className="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default EditCardForm;