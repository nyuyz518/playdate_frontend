import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';

export class ACInput extends Component {
  constructor(props) {
    super(props);
    this.pacInput = React.createRef();
  }

  componentDidMount() {
    const {google} = this.props;
    const { input: { onChange } } = this.props;
    let pacInput = this.pacInput.current;
    let autocomplete = new google.maps.places.Autocomplete(pacInput);
    autocomplete.addListener('place_changed', ()=>{
      let place = autocomplete.getPlace();
      if(!place.geometry){
        return;
      }
      onChange({
        coordinates: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng()
        },
        address: place.formatted_address
      });
    });
  }

  render(){
    let address = "";
    if(this.props.input.value){
      address = this.props.input.value.address;
    }
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
          <input
            className="w3-input w3-border"
            type="text"
            defaultValue={address}
            ref={this.pacInput}
          />
          <div className="text-help red">
            {this.props.meta.touched ? this.props.meta.error : " "}
          </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(ACInput);
