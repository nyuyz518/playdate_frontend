import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import EventsIndex from './eventsIndex';
import EventsNew from './eventsNew';
import EventsShow from './eventsShow';
import Footer from './footer'

export default class App extends Component {

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Switch>
              <Route path="/events/new" key="event_new" component={EventsNew} />
              <Route path="/events/update/:id" key="event_update" component={EventsNew} />
              <Route path="/events/:id" component={EventsShow} />
              <Route path="/" component={EventsIndex} />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    )
  }
}
