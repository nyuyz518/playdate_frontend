import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchEvent, deleteEvent } from '../actions';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class EventsShow extends Component {

  componentDidMount(){
    const {id} = this.props.match.params;
    this.props.fetchEvent(id);
  }

  onDeleteClick(){
    const {id} = this.props.match.params;
    this.props.deleteEvent(id,() => {
      this.props.history.push("/")
    });
  }

  formatDate(dateStr){
    const date= new Date(dateStr);
    const dateformat = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'});

    return dateformat.format(date);
  }

  render(){
    const { event } = this.props;
    if(!event){
      return(
        <div> Loading... </div>
      );
    }
    const coordinates = {lat: event.lat, lng: event.lng};

    return (
      <div id="event-info">
        <div className="w3-cell-row">
          <div className="w3-container w3-cell w3-padding-16" style={{width : "600px", height: "400px"}}>
            <Map
              style={{width: '100%', height: '100%', position: 'relative'}}
              containerStyle={{width: '100%', height: '100%', position: 'relative'}}
              google={this.props.google}
              initialCenter={coordinates}
              center={coordinates}
              zoom={14.0005} >

              <Marker position={coordinates}
                      title={event.description} />
            </Map>
          </div>
          <div className="w3-container w3-cell">
            <div className="w3-round" style={{width:'55%'}}>
              <p ><img src={event.img}/></p>
            </div>
            <p>Start Time: {this.formatDate(event.start_time)}</p>
            <p>End Time: {this.formatDate(event.end_time)}</p>
            <p>Description: {event.description}</p>
            <p>Address: {event.address}</p>
          </div>
        </div>

        <div className = "w3-container" >
          <div className="w3-bar">
            <Link
              className="w3-hoverable w3-button w3-round w3-blue"
              to={`update/${event.id}`}
              >
              Edit
            </Link>

            <button
              className="w3-hoverable w3-button w3-round w3-red"
              onClick={this.onDeleteClick.bind(this)}>
              Delete
            </button>

            <Link
              className="w3-hoverable w3-button w3-round w3-blue"
              to="/"> Back to All Playdates</Link>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ events },ownProps) {
  return {event: events[ownProps.match.params.id]};
}

const connectedView = connect(mapStateToProps,{fetchEvent, deleteEvent})(EventsShow);

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(connectedView)
