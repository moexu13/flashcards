import React, { Fragment, useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Nav from "./Nav";
import NotFound from "./NotFound";
import { createDeck, deleteDeck, listDecks, readDeck, updateDeck } from "../utils/api/index";
import DeckDetail from "../decks/DeckDetail";
import DeckList from "../root/DeckList";
import CreateDeckForm from "../create_deck/CreateDeckForm";
import EditDeckForm from "../edit_deck/EditDeckForm";

import "../sass/style.scss";

function Layout() {
  const [deck, setDeck] = useState({});
  const [decks, setDecks] = useState([]);
  const [location, setLocation] = useState("");
  const [pageName, setPageName] = useState("");
  let history = useHistory();
  
  // await response, then redirect to detail page
  const addDeck = async (formData) => {
    const response = await createDeck(formData);
    await loadDecks();
    setDeck(response);
    setPageName(response.name);
    history.push(`/decks/${response.id}`);
    // console.log("response", response);
  }

  const editDeck = async (deck) => {
    await updateDeck(deck);
    loadDecks();
    setDeck(deck);
    setPageName(deck.name);
    history.push(`/decks/${deck.id}`);
  }

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

  useEffect(() => {
    return history.listen(location => {
      setLocation(location.pathname);
      if (location.pathname === "/") {
        setPageName("");
      }
    });
  }, [history]);

  const handleEditClick = async (deckId) => {
    const deck = await readDeck(deckId);
    setDeck(deck);
    setPageName(`Edit ${deck.name}`)
    history.push(`/decks/${deckId}/edit`);
  }

  const handleDeleteClick = async (deckId) => {
    setPageName("");
    history.push("/");
    await deleteDeck(deckId);
    await loadDecks();
  }
  
  return (
    <Fragment>
      <Header />
      <div className="container">
        <Nav location={location} pageName={pageName} />
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <DeckList decks={decks} />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeckForm 
              createDeck={addDeck} 
              pageName="Create New Deck"  
            />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeckForm 
              editDeck={editDeck} 
              deck={deck} 
              pageName={pageName}  
            />
          </Route>
          <Route path="/decks/:deckId">
            <DeckDetail 
              decks={decks} 
              handleEditClick={handleEditClick} 
              handleDeleteClick={handleDeleteClick}  
            />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Fragment>
  );
}

export default Layout;
