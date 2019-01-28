import axios from 'axios';

export const FETCH_EVENTS = 'fetch_events';
export const FETCH_EVENTS_COMPLETE = 'fetch_events_complete';

export const SEARCH_EVENTS = 'search_events';
export const SEARCH_EVENTS_COMPLETE = 'search_events_complete';

export const FETCH_EVENT = 'fetch_event';
export const FETCH_EVENT_COMPLETE = 'fetch_event_complete';

export const CREATE_EVENT = 'create_event';
export const DELETE_EVENT = 'delete_event';
export const UPDATE_EVENT = 'update_event';

const ROOT_URL = 'http://localhost:3000/api/v1';

export function fetchEvents(){
  return(dispatch) => {
    dispatch({ type: FETCH_EVENTS });
    return fetch(`${ROOT_URL}/events`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(response => response.json())
      .then(events => dispatch({type: FETCH_EVENTS_COMPLETE, payload: events}))
  }
}

export function searchEvents(values){
  var url = new URL(`${ROOT_URL}/events/search`);
  Object.keys(values).forEach((key) => url.searchParams.append(key, values[key]))
  return(dispatch) => {
    dispatch({ type: SEARCH_EVENTS });
    return fetch(url,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(response => response.json())
      .then(events => dispatch({type: SEARCH_EVENTS_COMPLETE, payload: events}))
  }
}

export function fetchEvent(id){
  var url1 = new URL(`${ROOT_URL}/events/${id}`);
  return(dispatch) => {
    dispatch({ type: FETCH_EVENT });
    return fetch(url1,{
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      }
    })
      .then(response => response.json())
      .then(events => dispatch({type: FETCH_EVENT_COMPLETE, payload: events}))
  }
}

export function createEvent(values, callback){
  const response = fetch(`${ROOT_URL}/events`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify(values)
  })
    .then(()=>callback());
  return{
    type: CREATE_EVENT,
    payload: response
  };
}

export function updateEvent(id, values, callback){
  const response = fetch(`${ROOT_URL}/events/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify(values)
  })
  .then(()=>callback());;
  return{
    type: UPDATE_EVENT,
    payload: response
  };
}

export function deleteEvent(id, callback){
  const response = fetch(`${ROOT_URL}/events/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
  })
    .then(()=>callback());
  return {
    type: DELETE_EVENT,
    payload: id
  };
}
