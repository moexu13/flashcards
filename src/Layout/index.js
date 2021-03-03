import React, { Fragment, useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
// import Footer from "./Footer";
import NotFound from "./NotFound";
import DeckDetail from "../decks/DeckDetail";
import DeckList from "../decks/DeckList";
import CreateDeckForm from "../create_deck/CreateDeckForm";

import "../sass/style.scss";

function Layout() {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    setDecks([]);
    const url = `${process.env.REACT_APP_API_BASE_URL}/decks?_embed=cards`;
    const abortController = new AbortController();
    const loadDecks = async () => {
      try {
        const response = await fetch(url, { signal: abortController.signal });
        const decksFromAPI = await response.json();
        setDecks(decksFromAPI);
      } catch (error) {
        // TODO: show error message
        console.log(error);
      }
    }
    loadDecks();
    return () => {
      abortController.abort();
    }
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
            <CreateDeckForm />
          </Route>
          <Route path="/decks/:deckId">
            <DeckDetail decks={decks} />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
      {/* <Footer /> */}
    </Fragment>
  );
}

export default Layout;
