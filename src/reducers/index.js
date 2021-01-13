import dateReducer from './date.js';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  date: dateReducer
})

export default allReducers;