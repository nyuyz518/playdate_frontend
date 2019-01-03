import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import EventsReducer from './reducerEvents';
import UsersReducer from './usersReducer';

const rootReducer = combineReducers({
  usersReducer: UsersReducer,
  eventState: EventsReducer,
  form: formReducer
});

export default rootReducer;
