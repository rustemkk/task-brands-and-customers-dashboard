import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import App from 'components/App';
import history from 'utils/history'

import './index.css';
import configureStore from './store';


ReactDOM.render(
  <Provider store={configureStore()}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);