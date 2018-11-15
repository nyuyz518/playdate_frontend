import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchEvent, deleteEvent } from '../actions';

class EventsShow extends Component {
  componentDidMount(){
    const {id} = this.props.match.params;
    this.props.fetchEvent(id);
  }

  onDeleteClick(){
    const {id} = this.props.match.params;
    this.props.deleteEvent(id,() => {
      this.props.history.push("/")
    });
  }


  render(){
    const { event } = this.props

    if(!event){
      return(
        <div> Loading... </div>
      );
    }

    return (
      <div>
      <p>Picture: {event.img}</p>
      <p>Map View </p>

        <h6>Time:{event.time}</h6>
        <h6>Location: {event.location}</h6>
        <p>Description: {event.description}</p>

        <button className="btn btn-primary pull-xs-left">Edit </button>
        <button
          className="btn btn-danger pull-xs-center"
          onClick={this.onDeleteClick.bind(this)}>
          Delete </button>
        <Link className="btn btn-primary" to="/"> Back to All Playdates</Link>
      </div>
    );
  }
}

function mapStateToProps({ events },ownProps) {
  return {event: events[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{fetchEvent, deleteEvent})(EventsShow);
