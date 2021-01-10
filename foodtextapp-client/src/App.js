import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-daterangepicker/daterangepicker.css';
import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Landing from './components/Landing';
import GetFood from './components/GetFood';
import GiveFood from './components/GiveFood';
import ThanksGet from './components/ThanksGet';
import ThanksGive from './components/ThanksGive'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Landing} exact path="/" />
        <Route component={GetFood} exact path="/get" />
        <Route component={GiveFood} exact path="/give" />
        <Route component={ThanksGet} exact path="/thanksGet" />
        <Route component={ThanksGive} exact path="/thanksGive" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
