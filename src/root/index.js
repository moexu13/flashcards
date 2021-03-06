import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { createCard, createDeck, deleteCard, deleteDeck, listDecks, readDeck, updateCard, updateDeck } from "../utils/api/index";

import CreateUpdateCardForm from "../forms/CreateUpdateCardForm";
import CreateEditDeckForm from "../forms/CreateUpdateDeckForm";
import DeckList from "../decks/DeckList";
import DeckDetail from "../decks/DeckDetail";
import NotFound from "../Layout/NotFound";
import Study from "../study/Study";

const Home = () => {
  const [decks, setDecks] = useState([]);
  const [pageName, setPageName] = useState("");
  const history = useHistory();

  const loadDecks = async () => {
    try {
      const response = await listDecks();
      setDecks(response);
    } catch (error) {
      // TODO: show error message
      console.log(error);
    }
  }
  useEffect(() => {
    setDecks([]);
    loadDecks();
  }, []);

  const createOrUpdateCard = async (deckId, formData) => {
    if (formData.id) {
      await updateCard(formData);
    } else {
      await createCard(deckId, formData);
    }
    await loadDecks();
    const response = await readDeck(deckId);
    setPageName(response.name);
    history.push(`/decks/${response.id}`);
  }

  const createOrUpdateDeck = async (formData) => {
    let response;
    if (formData.id) {
      response = await updateDeck(formData);
    } else {
      response = await createDeck(formData);
    }
    await loadDecks();
    setPageName(response.name);
    history.push(`/decks/${response.id}`);
  }

  const handleEditDeckClick = async (deckId) => {
    const deck = await readDeck(deckId);
    setPageName(`Edit ${deck.name}`)
    history.push(`/decks/${deckId}/edit`);
  }

  const handleDeleteDeckClick = async (deckId) => {
    setPageName("");
    history.push("/");
    await deleteDeck(deckId);
    await loadDecks();
  }

  const handleAddCardClick = (deckId) => {
    setPageName("Add Card");
    history.push(`/decks/${deckId}/cards/new`);
  }

  const handleEditCardClick = (card) => {
    setPageName("Edit Card");
    history.push(`/decks/${card.deckId}/cards/${card.id}/edit`);
  }

  const handleDeleteCardClick = async (deckId, cardId) => {
    await deleteCard(cardId);
    await loadDecks();
    const response = await readDeck(deckId);
    setPageName(response.name);
    // TODO: trigger rerender
    history.push(`/decks/${response.id}`);
  }
  
  const handleStudyClick = async (deckId) => {
    const response = await readDeck(deckId);
    setPageName(response.name);
    history.push(`/decks/${response.id}/study`);
  }

  return (
    <Switch>
      <Route exact={true} path="/">
        <DeckList decks={decks} />
      </Route>
      <Route exact={true} path="/decks">
        <DeckList decks={decks} />
      </Route>
      <Route exact={true} path="/decks/new">
        <CreateEditDeckForm pageName="Create Deck" createOrUpdateDeck={createOrUpdateDeck} />
      </Route>
      <Route exact={true} path="/decks/:deckId">
        <DeckDetail
          handleAddCardClick={handleAddCardClick}
          handleEditDeckClick={handleEditDeckClick} 
          handleDeleteDeckClick={handleDeleteDeckClick}
          handleEditCardClick={handleEditCardClick}
          handleDeleteCardClick={handleDeleteCardClick}
          handleStudyClick={handleStudyClick}  
        />
      </Route>
      <Route path="/decks/:deckId/edit">
        <CreateEditDeckForm createOrUpdateDeck={createOrUpdateDeck} pageName={pageName} />
      </Route>
      <Route exact={true} path="/decks/:deckId/study">
        <Study pageName={pageName} handleAddCardClick={handleAddCardClick} />
      </Route>
      <Route exact={true} path="/decks/:deckId/cards/new">
        <CreateUpdateCardForm createOrUpdateCard={createOrUpdateCard} pageName={pageName} />
      </Route>
      <Route path="/decks/:deckId/cards/:cardId">
        <CreateUpdateCardForm createOrUpdateCard={createOrUpdateCard} pageName={pageName} />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Home;