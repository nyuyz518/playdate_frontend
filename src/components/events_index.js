import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Field, reduxForm} from 'redux-form';
import { fetchEvents, searchEvents } from '../actions';
import SearchForm from './events_search';
import Nav from './nav'

class EventsIndex extends Component {

  componentDidMount(){
    this.props.fetchEvents();
  }

  renderEvents(){
    return _.map(this.props.events, event => {
      return (
        <li className="list-group-item" key={event.id}>
          <Link to={`/events/${event.id}`}>
            {event.description}
          </Link>
        </li>
      );
    });
  }

  render(){
    return (
        <div className="App">
          <Nav />
          <div >
            <SearchForm />
            <ul className="list-group">
              {this.renderEvents()}
            </ul>
          </div>
          <div className="text-xs-right">
            <Link className="btn btn-primary" to="/events/new">
              Add Your Playdate
            </Link>
          </div>
        </div>
      );
  }
}

function mapStateToProps(state){
  return {events: state.events}
}

export default connect(mapStateToProps,{fetchEvents})(EventsIndex);
