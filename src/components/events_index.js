import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchEvents } from '../actions';

class EventsIndex extends Component {
  componentDidMount(){
    this.props.fetchEvents();
  }

  renderEvents(){
    return _.map(this.props.events, event => {
      return (
        <li className="list-group-item" key={event.id}>
          <Link to={`/events/${event.id}`}>
            {event.location}
          </Link>
        </li>
      );
    });
  }

  render(){
    return (
        <div>
          <div className="text-xs-right">
            <Link className="btn btn-primary" to="/events/new">
              Add Your Playdate
            </Link>
          </div>

          <h3>View All Playdates</h3>
            <ul className="list-group">
              {this.renderEvents()}
            </ul>
        </div>
      );
  }
}

function mapStateToProps(state){
  return {events: state.events}
}

export default connect(mapStateToProps,{fetchEvents})(EventsIndex);
