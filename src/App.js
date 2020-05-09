import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import ReactNotification from 'react-notifications-component';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import Routes from './routes';
import history from './services/history';

import GlobalStyle from './styles/global';
import { store, persistor } from './store';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <GlobalStyle />
          <ReactNotification />
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  );
}
