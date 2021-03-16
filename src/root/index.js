import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import { listDecks } from "../utils/api/index";

import NotFound from "../Layout/NotFound";

import DeckList from "../decks/DeckList";

const Home = () => {
  const [decks, setDecks] = useState([]);

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

  return (
    <Switch>
      <Route exact={true} path="/">
        <DeckList decks={decks} />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Home;