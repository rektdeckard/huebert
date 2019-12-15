import { SET_ACTIVE_LIGHT, SET_ACTIVE_GROUP, SET_ACTIVE_SCENE } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_ACTIVE_LIGHT:
      if (state.light && state.light.id === action.payload.id) {
        return { ...state, light: null };
      }
      return { ...state, light: action.payload, group: null };
    case SET_ACTIVE_GROUP:
      if (state.group === action.payload) {
        return { ...state, group: null, light: null };
      }
      return { ...state, group: action.payload, light: null };
    case SET_ACTIVE_SCENE:
      return { ...state, scene: action.payload }
    default:
      return state;
  }
};
