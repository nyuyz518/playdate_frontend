import _ from 'lodash';
import { FETCH_EVENTS, SEARCH_EVENTS, FETCH_EVENT, DELETE_EVENT,
        FETCH_EVENTS_COMPLETE, SEARCH_EVENTS_COMPLETE, FETCH_EVENT_COMPLETE } from '../actions';

export default function(state = {loading: false, events: []}, action) {
  switch (action.type) {
    case DELETE_EVENT:
      return _.omit(state, action.payload)
    case FETCH_EVENT:
      //return {...state, [action.payload.data.id] : action.payload.data}
      return {...state, loading: true}
    case FETCH_EVENT_COMPLETE:
      return {...state, loading: false, event: action.payload}

    case SEARCH_EVENTS:
    case FETCH_EVENTS:
      return {...state, loading: true, events: []}
    case FETCH_EVENTS_COMPLETE:
    case SEARCH_EVENTS_COMPLETE:
      return {...state, loading: false, events: action.payload}
    default:
      return state;
  }
}
