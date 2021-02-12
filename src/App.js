import "./App.css";
import React, { useHistory, useState } from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";

import Layout from "./hoc/Layout/Layout";
import Reservations from "./Containers/Reservations/Reservations";
import ReservationForm from "./Containers/ReservationForm/ReservationForm";
import ReservationEdit from "./Containers/ReservationEdit/ReservationEdit";
import Contacts from "./Containers/Contacts/Contacs";
import ContactEdit from "./Containers/ContactEdit/ContactEdit";
import { Translator, Translate } from "react-auto-translate";

/*
Entry point of the app with the react Router Swithc for managing 
routes in funtion of the pathname
*/

const App = (props) => {
  console.log(props);

  return (
    <div className="App">
      <Translator
        from="en"
        to="es"
        googleApiKey="AIzaSyBJ7SDmR4SGqHRxsA-SmcIZ3Sg8VHZbAyY"
      >
        <Translate>
          <Layout>
            <Switch>
              <Route path="/Contacts" exact component={Contacts} />
              <Route path="/Reservations" exact component={Reservations} />
              <Route
                path="/Reservations/Create"
                exact
                component={ReservationForm}
              ></Route>
              <Route
                path="/Reservation/edit"
                exact
                component={ReservationEdit}
              ></Route>
              <Route path="/Contact/edit" component={ContactEdit} />
              <Redirect from="/" to="Reservations" />
            </Switch>
          </Layout>
        </Translate>
      </Translator>
    </div>
  );
};

export default App;
