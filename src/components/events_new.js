import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { createEvent, fetchEvent, updateEvent } from '../actions';
import { ACInput } from './autocomplete_input.js'
import { GoogleApiWrapper } from 'google-maps-react';

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

  onSubmit(values){
    const { id } = this.props.match.params;
    if(id){
      this.props.updateEvent(values, ()=> {
        this.props.history.push("/");
      });
    } else {
      this.props.createEvent(values, ()=> {
        this.props.history.push("/");
      });
    }
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

let WrappedEventsNew = GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY
})(EventsNew);

function mapStateToProps({ events }, ownProps) {
  return { initialValues: events[ownProps.match.params.id]};
}

WrappedEventsNew = reduxForm({
    validate,
    form:'newEventForm',
    enableReinitialize : true
  })(WrappedEventsNew);

WrappedEventsNew = connect(mapStateToProps, {fetchEvent, createEvent, updateEvent})(WrappedEventsNew);

export default WrappedEventsNew;
