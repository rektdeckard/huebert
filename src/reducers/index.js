import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import roomsReducer from './roomsReducer';
import lightsReducer from './lightsReducer';
import activeReducer from './activeReducer';
import initReducer from './initReducer';

const rootReducer = combineReducers({
  rooms: roomsReducer,
  lights: lightsReducer,
  active: activeReducer,
  init: initReducer
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;
