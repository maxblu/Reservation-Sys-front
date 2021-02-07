import "./App.css";
import React from "react";
import Contacts from "./Containers/Contacts/Contacs";
import { Redirect, Route, Switch } from "react-router-dom";
import Reservations from "./Containers/Reservations/Reservations";
import Layout from "./hoc/Layout/Layout";

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/Contacs" exact component={Contacts} />
          <Route path="/Reservations" exact component={Reservations} />
          <Redirect from="/" to="Reservations" />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
