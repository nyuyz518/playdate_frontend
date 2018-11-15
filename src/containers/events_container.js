import React, {Component} from 'react'
import EventsIndex from './components/events_index';
import SearchBar from './components/events_search';

export default class EventsContainer extends Component{
  constructor(props){
    super(props)
    this.state = {
      playdates: props.playdates,
      searchForm: ""
    }
  }

    handleChange = (event) =>{
    this.setState({
      searchForm: event.target.value
    })
  }

  render() {
    return(
      <div>
        <SearchBar searchForm={this.state.searchForm} handleChange={this.handleChange} />
        <EventsIndex searchVal={this.state.searchForm} playdates={this.state.playdates} />
      </div>
    )
  }

}
