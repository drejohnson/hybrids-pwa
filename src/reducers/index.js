import { combineReducers } from 'redux';
import app from './app';
import counter from './counter';

const rootReducer = combineReducers({
  app,
  counter
});

export default rootReducer;
