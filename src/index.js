import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import promise from 'redux-promise';
import reducers from './reducers';
import EventsIndex from './components/events_index';
import SearchBar from './components/events_search';
import EventsNew from './components/events_new';
import EventsShow from './components/events_show';

import MapView from './components/map_view';

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
          <Route path="/" component={EventsIndex} />
          <Route path="/" component={SearchBar} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.root'));
