import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import Chat from '../components/chat';
import Customers from '../components/customers';
import Inventory from '../components/inventory';
import Landing from '../components/landing';

export default function Routes() {
  return (
      <Switch>
          <Route exact path='/' component={Landing} />
          <Route path='/customers' component={Customers} />
          <Route path='/inventory' component={Inventory} />
          <Route path='/chat' component={Chat} />
      </Switch>
  );
}
