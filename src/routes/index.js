import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';
import Order from '../pages/Order';
import Deliveryman from '../pages/Deliveryman';
import DeliverymanForm from '../pages/Deliveryman/Form';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/order" component={Order} isPrivate />

      <Route path="/deliverymen" exact component={Deliveryman} isPrivate />
      <Route
        path="/deliverymen/form"
        exact
        component={DeliverymanForm}
        isPrivate
      />
    </Switch>
  );
}
