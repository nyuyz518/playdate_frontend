import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { createEvent, fetchEvent, updateEvent } from '../actions';
import { ACInput } from './autocomplete_input.js'
import { GoogleApiWrapper } from 'google-maps-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import logo1 from './createplaydate.jpg'

class EventsNew extends Component {

  componentDidMount(){
    const {id} = this.props.match.params;
    if(id){
      this.props.fetchEvent(id);
    }
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

  renderDatePicker({input, placeholder, defaultValue, meta: {touched, error} }) {
    return (
        <div>
            <DatePicker
               selected={input.value.date}
               onChange={(date)=>{
                 return input.onChange({date:date});
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


  onSubmit(values){
    const { id } = this.props.match.params;
    const backend_values = {
      start_time: values.start_time.date,
      end_time: values.end_time.date,
      address: values.location.address,
      lat: values.location.coordinates.lat,
      lng: values.location.coordinates.lng,
      description: values.description,
      img: values.img
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
        <div className="navWrapper" >
    				<img src={logo1} alt="logo1" />
    		</div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <p>Pick the Start Time</p>
          <Field
            label="Start Time"
            name="start_time"
            component={this.renderDatePicker}
            />
          <p>Pick the End Time</p>
          <Field
            label="End Time"
            name="end_time"
            placeholder="Pick the End Time"
            component={this.renderDatePicker}
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
            component={this.renderTextField}
          />
          <Field
            label="Upload A Picture"
            name="image"
            component={this.renderTextField}
          />
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link className="btn btn-danger" to="/">Cancel</Link>
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
        img: event.img
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
