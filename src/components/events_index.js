import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Field, reduxForm} from 'redux-form';
import { fetchEvents, searchEvents } from '../actions';
import SearchForm from './events_search';
import Nav from './nav'

import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class EventsIndex extends Component {

  constructor(props) {
    super(props);
    this.googleMap = React.createRef();
  }

  componentDidMount(){
    const {google} = this.props
    this.props.fetchEvents();
    const map = this.googleMap.current.map;
    let latlngbounds = new google.maps.LatLngBounds();
    _.forEach(this.props.events, event => {
      latlngbounds.extend({lat: event.lat, lng: event.lng});
    });
    map.fitBounds(latlngbounds);
  }

  renderMarkers() {
    return _.map(this.props.events, event => {
      return (
        <Marker position={{lat: event.lat, lng: event.lng}}
                title={event.description} />
      )
    });
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
            

            <SearchForm />

          <div>
            <ul className="list-group">
              {this.renderEvents()}
            </ul>
          </div>

          <div id="index-map">
            <Map
              ref={this.googleMap}
              class='google-map'
              style={{width: '600px', height: '400px', position: 'relative'}}
              containerStyle={{width: '600px', height: '400px', position: 'relative'}}
              google={this.props.google} >
              {this.renderMarkers()}
            </Map>
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

export default connect(mapStateToProps,{fetchEvents, searchEvents})(GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(EventsIndex));
