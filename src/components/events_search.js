import React, { Component } from 'react'
import { Field, reduxForm} from 'redux-form';
import { searchEvents } from '../actions';
import { connect } from 'react-redux';
import { ACInput } from './autocomplete_input.js'
import { GoogleApiWrapper } from 'google-maps-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class SearchForm extends Component {

  renderDatePicker({input, placeholder, defaultValue, meta: {touched, error} }) {
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

  handleFormSubmit(values){
    this.props.searchEvents({time: values.search_time.date});
  }

  render(){
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <p>Search by Time</p>
          <Field
            label="search_time"
            name="search_time"
            placeholder="Search by Time"
            component={this.renderDatePicker}
          />
          <button type="submit" className="btn btn-primary"> Search </button>
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
