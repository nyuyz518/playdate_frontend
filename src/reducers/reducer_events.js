import _ from 'lodash';
import { FETCH_EVENTS, SEARCH_EVENTS, FETCH_EVENT, DELETE_EVENT } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case DELETE_EVENT:
      return _.omit(state, action.payload)
    case FETCH_EVENT:
      return {...state, [action.payload.data.id]:action.payload.data}

    case SEARCH_EVENTS:
    case FETCH_EVENTS:
      return  _.mapKeys(action.payload.data, 'id');
    default:
      return state;
  }
}
