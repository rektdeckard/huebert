import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import roomsReducer from './roomsReducer';
import lightsReducer from './lightsReducer';

const rootReducer = combineReducers({
  rooms: roomsReducer,
  lights: lightsReducer
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;
