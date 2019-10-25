import { FETCH_LIGHTS, SET_LIGHT } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_LIGHTS:
      return Object.keys(action.payload).map(key => ({ ...action.payload[key], id: key }));
    case SET_LIGHT:
      return state.map(light => {
        if (light.id === action.payload.id) {
          return action.payload;
        }
        return light;
      })
    default:
      return state;
  }
};
