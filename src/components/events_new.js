import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { createEvent, fetchEvent, updateEvent } from '../actions';
import { renderDatePicker, renderTextField, renderDropzone } from './input/input_fields.js';
import { ACInput } from './input/autocomplete_input.js'
import { GoogleApiWrapper } from 'google-maps-react';
import DatePicker from "react-datepicker";
import Dropzone from 'react-dropzone'
import "react-datepicker/dist/react-datepicker.css";
import logo1 from './createplaydate.jpg'

class EventsNew extends Component {

  componentDidMount(){
    const {id} = this.props.match.params;
    if(id){
      this.props.fetchEvent(id);
    }
  }

  onSubmit(values){
    const { id } = this.props.match.params;
    const backend_values = {
      start_time: values.start_time.date,
      end_time: values.end_time.date,
      address: values.location.address,
      lat: values.location.coordinates.lat,
      lng: values.location.coordinates.lng,
      description: values.description,
      img: values.image.images[0]
    };
    if(id){
      this.props.updateEvent(id, backend_values, ()=> {
        this.props.history.push(`/events/${id}`);
      });
    } else {
      this.props.createEvent(backend_values, ()=> {
        this.props.history.push("/");
      });
    }
  }

  render(){
    const { handleSubmit } = this.props;
    return (
      <div>
        <div className="jumbotron jumbotron-fluid">
          <div className="navWrapper" >
            <img src={logo1} alt="logo1" />
          </div>
        </div>

        <form id="new_form" onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <p>Pick the Start Time</p>
          <Field
            label="Start Time"
            name="start_time"
            component={renderDatePicker}
            />
          <p>Pick the End Time</p>
          <Field
            label="End Time"
            name="end_time"
            placeholder="Pick the End Time"
            component={renderDatePicker}
            />
          <Field
            label="Location"
            name="location"
            google={this.props.google}
            component={ACInput}
          />
          <Field
            label="Description"
            name="description"
            component={renderTextField}
          />
          <Field
            label="Upload A Picture"
            name="image"
            component={renderDropzone}
          />
          <button type="submit" className="w3-hoverable w3-button w3-round w3-blue w3-left">Submit</button>
          <Link className="w3-hoverable w3-button w3-round w3-red w3-center" to="/">Cancel</Link>
        </form>
      </div>
    );
  }
}

function validate(values){
  const error = {};
  if(!values.start_time){
    error.start_time = "Pick a Start Time";
  }
  if(!values.end_time){
    error.end_time = "Pick an End Time";
  }
  if (!values.location){
    error.location = "Enter a location";
  }
  if (!values.description){
    error.description = "Describe a bit about your playdate";
  }
  return error;
}

let WrappedEventsNew = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(EventsNew);

function mapStateToProps({ events }, ownProps) {
  const event = events[ownProps.match.params.id];
  if(event){
    return {
      initialValues: {
        start_time: {date: new Date(event.start_time)},
        end_time: {date: new Date(event.end_time)},
        location: {
          address:event.address,
          coordinates:{
            lat:event.lat,
            lng:event.lng}
          },
        description: event.description,
        image: {images:[ event.img ]}
      }
    };
  }else{
    return {};
  }
}

WrappedEventsNew = reduxForm({
    validate,
    form:'newEventForm',
    enableReinitialize : true
  })(WrappedEventsNew);

WrappedEventsNew = connect(mapStateToProps, {fetchEvent, createEvent, updateEvent})(WrappedEventsNew);

export default WrappedEventsNew;
