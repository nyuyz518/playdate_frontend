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

  render(){
    const { event } = this.props

    if(!event){
      return(
        <div> Loading... </div>
      );
    }

    return (
      <div>
        <p>Picture: {event.img}</p>
        <h6>Time:{event.time}</h6>
        <p>Description: {event.description}</p>
        <p>Map View </p>
        <Map
          class='google-map'
          style={{width: '600px', height: '400px', position: 'relative'}}
          containerStyle={{width: '600px', height: '400px', position: 'relative'}}
          google={this.props.google}
          initialCenter={event.location}
          zoom={14} >

          <Marker position={event.location}
                  title={event.description} />
        </Map>

        <button className="btn btn-primary pull-xs-left">Edit </button>
        <button
            className="btn btn-danger pull-xs-center"
            onClick={this.onDeleteClick.bind(this)}>
            Delete
        </button>
        <Link className="btn btn-primary" to="/"> Back to All Playdates</Link>
      </div>
    );
  }
}

function mapStateToProps({ events },ownProps) {
  return {event: events[ownProps.match.params.id]};
}

const connectedView = connect(mapStateToProps,{fetchEvent, deleteEvent})(EventsShow);

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDXOD5OgIcQwYhrFoWZ4Sf7KS72JXhKe88'
})(connectedView)
