import _ from 'lodash';
import { FETCH_EVENTS, FETCH_EVENT, DELETE_EVENT } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_EVENT:
      return _.omit(state, action.payload)
    case FETCH_EVENT:
      return {...state, [action.payload.data.id]:action.payload.data}

    case FETCH_EVENTS:
      // console.log(action.payload.data);
      return _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}