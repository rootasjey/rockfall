// ////////////////////
// index.js (reducer)
// Reducers entry point
// ////////////////////
import { combineReducers } from 'redux';
import { views } from './views'

const initialState = {
  plays: [],
  playsById: {
  },
  playersById: {},
  user: false,       // <-- False if not logged in, else its an object
  views: {
    leadderboard: false,
    messages    : false,
    play        : false,
    settings    : false
  },
  messageStatus : 'idle'
}

const rockfallApp = combineReducers({
  views
});

export default rockfallApp;
