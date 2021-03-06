import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readDeck } from "../utils/api/index";

const CreateUpdateDeckForm = ({ createOrUpdateDeck, pageName }) => {
  const { deckId } = useParams();
  const initialFormState = {
    name: "",
    description: ""
  }
  const [formData, setFormData] = useState({ ...initialFormState });

  useEffect(() => {
    setFormData({});
    const loadDeck = async () => {
      if (deckId) {
        const response = await readDeck(deckId);
        setFormData(response);
      }
    }
    loadDeck();
  }, []);
  
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  }

  const handleSubmit = (e) =>  {
    e.preventDefault();
    createOrUpdateDeck(formData);
  }
  
  return (
    <section id="form" className="form">
      <h2 className="form__heading">{pageName}</h2>
      <div className="form__container">
        <form name="edit-form" onSubmit={handleSubmit} >
          <div className="form-group mt-4">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              className="form-control"
              onChange={handleChange}
              value={formData.name || ""}
              required
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              rows="6"
              cols="50"
              value={formData.description || ""}
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

export default CreateUpdateDeckForm;