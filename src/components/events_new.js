import React, { Component } from 'react';
import { Field, reduxForm} from 'redux-form';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { createEvent } from '../actions';

class EventsNew extends Component {

  renderField(field){
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
            component={this.renderField}
            />
          <Field
            label="Location"
            name="location"
            component={this.renderField}
          />
          <Field
          label="Description"
          name="description"
          component={this.renderField}
          />
          <Field
            label="Upload A Picture"
            name="image"
            component={this.renderField}
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
    error.location = "Enter a location";
  }
  if (!values.description || values.description.length < 6){
    error.description = "Describe a bit about your playdate";
  }

  return error;
}

export default reduxForm({
    validate,
    form:'newEventForm'
  })(
    connect(null,{createEvent})(EventsNew)
  )
