import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import promise from 'redux-promise';
import reducers from './reducers';
import EventsIndex from './components/events_index';
import SearchForm from './components/events_search';
import EventsNew from './components/events_new';
import EventsShow from './components/events_show';
import Footer from '../src/components/footer'

import MapView from './components/map_view';
import DateTest from './components/date_test';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/events/new" key="event_new" component={EventsNew} />
          <Route path="/events/update/:id" key="event_update" component={EventsNew} />
          <Route path="/events/:id" component={EventsShow} />
          <Route path="/map" component={MapView} />
          <Route path="/time" component={DateTest} />
          <Route path="/search" component={SearchForm} />
          <Route path="/" component={EventsIndex} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.root'));
