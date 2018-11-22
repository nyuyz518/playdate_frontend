import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { createEvent } from '../actions';
import { ACInput } from './autocomplete_input.js'
import { GoogleApiWrapper } from 'google-maps-react';

class EventsNew extends Component {

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

  onSubmit(values){
    this.props.createEvent(values, ()=> {
      this.props.history.push("/")
    });
  }

  render(){
    const { handleSubmit } = this.props;
    return (
      <div>
        <h4>Creat A New Playdate Here </h4>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Time"
            name="time"
            component={this.renderTextField}
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
  if(!values.time){
    error.time = "Pick a time";
  }
  if (!values.location){
    error.location = "Enter aa location";
  }
  if (!values.description || values.description.length < 6){
    error.description = "Describe a bit about your playdate";
  }

  return error;
}

EventsNew = connect(null,{createEvent})(EventsNew)

EventsNew = reduxForm({
    validate,
    form:'newEventForm'
  })(EventsNew)

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(EventsNew)
