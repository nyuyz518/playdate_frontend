import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

export class MapView extends Component {
  constructor(props) {
    super(props);
    this.pacInput = React.createRef();
    this.googleMap = React.createRef();
  }

   componentDidMount(){
     this.renderAutocomplete();
   }

   renderAutocomplete() {
     const {google} = this.props;
     let input = this.pacInput.current;
     let map = this.googleMap.current.map;
     let autocomplete = new google.maps.places.Autocomplete(input);
     autocomplete.addListener('place_changed', function() {
       let place = autocomplete.getPlace();
       if(!place.geometry){
         return;
       }
       let marker = new google.maps.Marker({
           map: map,
           anchorPoint: new google.maps.Point(0, -29)
         });
         map.setCenter(place.geometry.location);
         map.setZoom(17);
         marker.setPosition(place.geometry.location);

     });
  }

  render() {
    return (
      <div>
        <input id="pac-input" ref={this.pacInput} type="text" style={{width: '600px'}}
          placeholder="Enter a location"/>
        <Map
          ref={this.googleMap}
          style={{width: '600px', height: '400px', position: 'relative'}}
          containerStyle={{width: '600px', height: '400px', position: 'relative'}}
          google={this.props.google}
          initialCenter={{ lat: 40.778188, lng: -73.727505 }}
          zoom={14} >
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(MapView)
