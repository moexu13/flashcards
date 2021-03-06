import React, { Fragment, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import NotFound from "./NotFound";
import { createDeck, listDecks } from "../utils/api/index";
import DeckDetail from "../decks/DeckDetail";
import DeckList from "../decks/DeckList";
import CreateDeckForm from "../create_deck/CreateDeckForm";

import "../sass/style.scss";

function Layout() {
  const [decks, setDecks] = useState([]);

  const addNewDeck = (formData) => {
    // await response, then redirect to new detail page
    createDeck(formData);
  }

  useEffect(() => {
    setDecks([]);
    const loadDecks = async () => {
      try {
        const response = await listDecks();
        setDecks(response);
      } catch (error) {
        // TODO: show error message
        console.log(error);
      }
    }
    loadDecks();
  }, []); 
  
  return (
    <Fragment>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">
            <DeckList decks={decks} />
          </Route>
          <Route exact path="/decks/new">
            <CreateDeckForm createDeck={addNewDeck} />
          </Route>
          <Route path="/decks/:deckId">
            <DeckDetail decks={decks} />
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
