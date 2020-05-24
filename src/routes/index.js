import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Order from '../pages/Order';
import OrderForm from '../pages/Order/Form';

import Deliveryman from '../pages/Deliveryman';
import DeliverymanForm from '../pages/Deliveryman/Form';

import Recipient from '../pages/Recipient';
import RecipientForm from '../pages/Recipient/Form';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/order" exact component={Order} isPrivate />
      <Route path="/order/form" exact component={OrderForm} isPrivate />

      <Route path="/deliverymen" exact component={Deliveryman} isPrivate />
      <Route
        path="/deliverymen/form"
        exact
        component={DeliverymanForm}
        isPrivate
      />

      <Route path="/recipient" exact component={Recipient} isPrivate />
      <Route path="/recipient/form" exact component={RecipientForm} isPrivate />
    </Switch>
  );
}
