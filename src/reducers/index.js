import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import lightsReducer from './lightsReducer';
import groupsReducer from './groupsReducer';
import scenesReducer from './scenesReducer';
import schedulesReducer from './schedulesReducer';
import rulesReducer from './rulesReducer';
import sensorsReducer from './sensorsReducer';
import activeReducer from './activeReducer';
import settingsReducer from './settingsReducer';

const rootReducer = combineReducers({
  lights: lightsReducer,
  groups: groupsReducer,
  scenes: scenesReducer,
  schedules: schedulesReducer,
  rules: rulesReducer,
  sensors: sensorsReducer,
  active: activeReducer,
  settings: settingsReducer
});

const store = createStore(rootReducer, {}, applyMiddleware(thunk));

export default store;
