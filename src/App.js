import "./App.css";
import React from "react";
import Contacts from "./Containers/Contacts/Contacs";
import { Redirect, Route, Switch } from "react-router-dom";
import Reservations from "./Containers/Reservations/Reservations";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/Contacs" exact component={Contacts} />
        <Route path="/Reservations" exact component={Reservations} />
        <Redirect from="/" to="Reservations" />
      </Switch>
    </div>
  );
}

export default App;
