import { combineReducers } from 'redux';
import notesReducer from './notes';

export const reducers = combineReducers({
  notes: notesReducer,
});
