import axios from 'axios';

export const FETCH_EVENTS = 'fetch_events';
export const FETCH_EVENT = 'fetch_event';
export const CREATE_EVENT = 'create_event';
export const DELETE_EVENT = 'delete_event';
export const UPDATE_EVENT = 'update_event';
export const SEARCH_EVENTS = 'search_events';

const ROOT_URL = 'http://localhost:3000/api/v1';

export function fetchEvents(){
  const response = axios.get(`${ROOT_URL}/events`);
  return{
    type: FETCH_EVENTS,
    payload: response
  };
}

export function searchEvents(values){
  const response = axios.get(`${ROOT_URL}/events/search`, {params:values});
  return{
    type: SEARCH_EVENTS,
    payload: response
  };
}

export function createEvent(values, callback){
  const response = axios.post(`${ROOT_URL}/events`, values)
    .then(()=>callback());
  return{
    type: CREATE_EVENT,
    payload: response
  };
}

export function fetchEvent(id){
  const response = axios.get(`${ROOT_URL}/events/${id}`);
  return{
    type: FETCH_EVENT,
    payload: response
  };
}

export function deleteEvent(id, callback){
  const response = axios.delete(`${ROOT_URL}/events/${id}`)
    .then(()=>callback());
  return {
    type: DELETE_EVENT,
    payload: id
  };
}

export function updateEvent(id, values, callback){
  const response = axios.patch(`${ROOT_URL}/events/${id}`, values)
    .then(()=>callback());;
  return{
    type: UPDATE_EVENT,
    payload: response
  };
}
