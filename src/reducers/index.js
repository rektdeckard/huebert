import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import roomsReducer from './roomsReducer';
import lightsReducer from './lightsReducer';
import activeReducer from './activeReducer';

const rootReducer = combineReducers({
  rooms: roomsReducer,
  lights: lightsReducer,
  active: activeReducer
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;
