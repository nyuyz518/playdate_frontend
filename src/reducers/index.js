import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import EventsReducer from './reducerEvents';

const rootReducer = combineReducers({
  eventState: EventsReducer,
  form: formReducer
});

export default rootReducer;
