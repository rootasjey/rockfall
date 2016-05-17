// ////////
// store.js
// ////////
import { createStore } from 'redux';
import rockfallApp from '../reducers/index';

let store = createStore(rockfallApp);

console.log(store.getState());
