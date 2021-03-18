import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { createCard, createDeck, deleteCard, deleteDeck, listDecks, readDeck, updateCard, updateDeck } from "../utils/api/index";

import CreateCardForm from "../createcard/CreateCardForm";
import CreateDeckForm from "../createdeck/CreateDeckForm";
import DeckList from "../decks/DeckList";
import DeckDetail from "../decks/DeckDetail";
import EditCardForm from "../editcard/EditCardForm";
import EditDeckForm from "../editdeck/EditDeckForm";
import NotFound from "../Layout/NotFound";
import Study from "../study/Study";

const Home = () => {
  const [decks, setDecks] = useState([]);
  const [deck, setDeck] = useState({});
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

  const addCard = async (deckId, formData) => {
    await createCard(deckId, formData);
    await loadDecks();
    setPageName(deck.name);
    history.push(`/decks/${deckId}`);
  }
  
  const addDeck = async (formData) => {
    const response = await createDeck(formData);
    await loadDecks();
    setDeck(response);
    setPageName(response.name);
    history.push(`/decks/${response.id}`);
  }

  const editCard = async (deckId, card) => {
    await updateCard(card);
    await loadDecks();
    const response = await readDeck(deckId);
    setDeck(response);
    setPageName(response.name);
    history.push(`/decks/${response.id}`);
  }

  const editDeck = async (deck) => {
    await updateDeck(deck);
    loadDecks();
    setDeck(deck);
    setPageName(deck.name);
    history.push(`/decks/${deck.id}`);
  }

  const handleEditDeckClick = async (deckId) => {
    const deck = await readDeck(deckId);
    setDeck(deck);
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
    setDeck(response);
    setPageName(response.name);
    // TODO: trigger rerender
    history.push(`/decks/${response.id}`);
  }
  
  const handleStudyClick = async (deckId) => {
    const response = await readDeck(deckId);
    setDeck(response);
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
        <CreateDeckForm pageName="Create Deck" createDeck={addDeck} />
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
        <EditDeckForm editDeck={editDeck} pageName={pageName} />
      </Route>
      <Route exact={true} path="/decks/:deckId/study">
        <Study pageName={pageName} handleAddCardClick={handleAddCardClick} />
      </Route>
      <Route exact={true} path="/decks/:deckId/cards/new">
        <CreateCardForm addCard={addCard} pageName={pageName} />
      </Route>
      <Route path="/decks/:deckId/cards/:cardId">
        <EditCardForm editCard={editCard} pageName={pageName} />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Home;