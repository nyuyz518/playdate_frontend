import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm} from 'redux-form';
import { renderDatePicker, renderTextField, renderDropzone } from './input/input_fields.js';
import { ACInput } from './input/autocomplete_input.js';
import { fetchEvents, searchEvents } from '../actions';
import Nav from './nav';
import { Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

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

  mileToLat(latDis){
    return (1/69) * latDis;
  }

  mileToLng(lngDis, lat){
    const radLat = Math.PI * lat/180;
    return lngDis/(Math.cos(radLat) * 69.172);
  }

  handleFormSubmit(values){
    const radius = parseInt(values.search_radius);
    const {coordinates} = values.search_location;
    const latN = coordinates.lat + this.mileToLat(radius);
    const latS = coordinates.lat - this.mileToLat(radius);
    let latL = latS;
    if(Math.abs(latN) > Math.abs(latS)){
      latL = latN;
    }
    let lngE = coordinates.lng + this.mileToLng(radius, latL);
    let lngW = coordinates.lng - this.mileToLng(radius, latL);

    if(lngE > 180){
      lngE -= 360;
    }
    if(lngW < -180) {
      lngW += 360;
    }

    this.props.searchEvents({
      time: values.search_time.date,
      lat_n: latN,
      lat_s: latS,
      lng_e: lngE,
      lng_w: lngW
    });
  }

  render(){
    const { handleSubmit } = this.props;

    return (
        <div className="App">
          <div className="w3-container">
            <Nav/>
          </div>

          <div id="search_form">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <div className="w3-row w3-center" style={{width:'75%'}}>
                <div className="w3-col m2 w3-center">
                <Field
                  className="w3-cell"
                  label="Choose Time"
                  name="search_time"
                  placeholder="Time"
                  component={renderDatePicker}
                />
                </div>
                <div className="w3-col m6 w3-center">
                  <Field
                    className="w3-cell"
                    label="Location"
                    name="search_location"
                    placeholder="Near Location"
                    google={this.props.google}
                    component={ACInput}
                  />
                </div>
                <div className="w3-col m2 w3-center">
                  <Field
                    className="w3-cell"
                    label="Within Miles"
                    name="search_radius"
                    placeholder="within"
                    component={renderTextField}
                  />
                </div>
                <div className="w3-col m2 w3-center">
                <br/>
                    <button type="submit" className="w3-button w3-round w3-blue" > Search </button>
                </div>
              </div>
            </form>
          </div>

          <div className="w3-cell-row">
            <div className="w3-container w3-cell w3-padding-16" style={{width : "65%", height: "400px"}}>
              <Map
                ref={this.googleMap}
                class='google-map'
                style={{width: '100%', height: '100%', position: 'relative'}}
                containerStyle={{width: '100%', height: '100%', position: 'relative'}}
                google={this.props.google} >
                {this.renderMarkers()}
              </Map>
            </div>

            <div className="w3-container w3-cell w3-padding-16">
              <ul className="w3-ul w3-card-4 w3-hoverable">
                {this.renderEvents()}
              </ul>
            </div>
          </div>

          <div>
            <Link className="w3-hoverable w3-button w3-round w3-blue w3-right" to="/events/new">
              Add Your Playdate
            </Link>
          </div>
        </div>
      );
  }
}

function validate(values){
  const error = {};
  if(!values.search_time){
    error.search_time = "Pick a time";
  }
  return error;
}

function mapStateToProps(state){
  return {
    events: state.events
  }
}

export default connect(mapStateToProps,{fetchEvents, searchEvents})(
  reduxForm({
    validate,
    form:'searchEventForm'
  })(
    GoogleApiWrapper({
      apiKey: process.env.REACT_APP_GOOGLE_API_KEY
    })(
      EventsIndex
    )
  )
);
