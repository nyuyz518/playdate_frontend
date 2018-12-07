import React, { Component } from 'react'
import { Field, reduxForm} from 'redux-form';
import { searchEvents } from '../actions';
import { connect } from 'react-redux';
import { ACInput } from './autocomplete_input.js'
import { GoogleApiWrapper } from 'google-maps-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class SearchForm extends Component {

  renderDatePicker({input, label, placeholder, defaultValue, meta: {touched, error} }) {
    return (
        <div>

          <DatePicker
             selected={input.value.date}
             onChange={(date)=>{
               return input.onChange({date: date});
             }}
             showTimeSelect
             timeFormat="HH:mm"
             timeIntervals={60}
             dateFormat="MM/d, yyyy h:mm aa"
             timeCaption="time"
            />
            <div className="text-help red">
              {touched ? error : " "}
            </div>
        </div>
    );
  }

  renderTextField(field){
    return(
      <div className="form-group">
        <label>{field.label}</label>
          <input
            className="form-control"
            type="text"
            {...field.input}
          />
          <div className="text-help red">
            {field.meta.touched ? field.meta.error : " "}
          </div>
      </div>
    );
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
      <div id="search_form">
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <div>Find A Playdates</div>
          <Field
            label="Time"
            name="search_time"
            placeholder="Time"
            component={this.renderDatePicker}
          />

          <Field
            label="Location"
            name="search_location"
            placeholder="Near Location"
            google={this.props.google}
            component={ACInput}
          />

          <Field
            label="Within"
            name="search_radius"
            placeholder="within"
            component={this.renderTextField}
          />
          <span>Miles</span>
          <p/>
          <button id="search_form_btn" type="submit" className="btn btn-primary"> Search </button>
        </form>
      </div>
    )
  }
}

function validate(values){
  const error = {};
  if(!values.search_time){
    error.search_time = "Pick a time";
  }
  return error;
}

let WrappedEventSearch = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(SearchForm);

WrappedEventSearch = reduxForm({
    validate,
    form:'searchEventForm'
  })(WrappedEventSearch);

  WrappedEventSearch = connect(null, {searchEvents})(WrappedEventSearch);

export default WrappedEventSearch
