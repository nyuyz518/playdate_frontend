import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/components/App.js';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const store = createStore(rootReducer, applyMiddleware(thunk));

const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(thunk)
)

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,document.getElementById('root')
)
