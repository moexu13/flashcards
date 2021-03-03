import React from "react";

const CreateDeckForm = ({ deck = {} }) => {
  return (
    <section id="deck-form" className="deck-form">
      <h2 className="create-deck__heading">Create New Deck</h2>
      <div className="form__container">
        <form name="create-new-deck" method="post">
          <div className="form-group mt-4">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              className="form-control"
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
            ></textarea>
          </div>
          <div className="row">
            <button className="btn btn-submit">Create</button>
          </div>
        </form>
      </div>
      <button className="btn btn-add">+ Add Card</button>
    </section>
  );
}

export default CreateDeckForm;