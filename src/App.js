import "./App.css";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Reservations from "./Containers/Reservations/Reservations";
import ReservationForm from "./Containers/ReservationForm/ReservationForm";
import Contacts from "./Containers/Contacts/Contacs";

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/Contacs" exact component={Contacts} />
          <Route path="/Reservations" exact component={Reservations} />
          <Route
            path="/Reservations/Create"
            exact
            component={ReservationForm}
          ></Route>
          <Redirect from="/" to="Reservations" />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
