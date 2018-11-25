import axios from 'axios';

export const FETCH_EVENTS = 'fetch_events';
export const FETCH_EVENT = 'fetch_event';
export const CREATE_EVENT = 'create_event';
export const DELETE_EVENT = 'delete_event';
export const UPDATE_EVENT = 'update_event';

const ROOT_URL = 'http://localhost:3000/api/v1';

export function fetchEvents(){
  const request = axios.get(`${ROOT_URL}/events`);
  return{
    type: FETCH_EVENTS,
    payload: request
  };
}

export function createEvent(values, callback){
  const request = axios.post(`${ROOT_URL}/events`, values)
    .then(()=>callback());

  return{
    type: CREATE_EVENT,
    payload: request
  };
}

export function fetchEvent(id){
  const request = axios.get(`${ROOT_URL}/events/${id}`);
  return{
    type: FETCH_EVENT,
    payload: request
  };
}

export function deleteEvent(id, callback){
  const request = axios.delete(`${ROOT_URL}/events/${id}`)
    .then(()=>callback());
  return {
    type: DELETE_EVENT,
    payload: id
  };
}

export function updateEvent(id, values, callback){
  const request = axios.patch(`${ROOT_URL}/events/${id}`, values)
    .then(()=>callback());;
  return{
    type: UPDATE_EVENT,
    payload: request
  };
}
