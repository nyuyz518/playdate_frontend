import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapView extends Component {
  render() {
    return (
      <div>
        <Map
          class='google-map'
          style={{ height: '100%', position: 'relative', width: '100%' }}
          google={this.props.google}
          initialCenter={{ lat: 40.778188, lng: -73.727505 }}
          zoom={14} >

          <Marker position={{ lat: 40.778188, lng: -73.727505 }}
                  name={'Current location'} />

        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDXOD5OgIcQwYhrFoWZ4Sf7KS72JXhKe88'
})(MapView)
