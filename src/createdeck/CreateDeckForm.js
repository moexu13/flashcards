import React, { useState } from "react";

const CreateDeckForm = ({ createDeck, pageName }) => {
  const initialFormState = {
    name: "",
    description: ""
  }
  const [formData, setFormData] = useState({ ...initialFormState });
  
  const handleChange = ({ target }) => {
    setFormData({ ...formData, [target.name]: target.value });
  }

  const handleSubmit = (e) =>  {
    e.preventDefault();
    createDeck(formData);
    setFormData({ ...initialFormState });
  }
  
  return (
    <section id="form" className="form">
      <h2 className="form__heading">{pageName}</h2>
      <div className="form__container">
        <form name="create-form" onSubmit={handleSubmit} >
          <div className="form-group mt-4">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              className="form-control"
              onChange={handleChange}
              value={formData.name}
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
              value={formData.description}
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

export default CreateDeckForm;