import { SET_ACTIVE_LIGHT, SET_ACTIVE_GROUP } from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_ACTIVE_LIGHT:
      if (state.light === action.payload) {
        return {};
      }
      return { light: action.payload };
    case SET_ACTIVE_GROUP:
      if (state.group === action.payload) {
        return {};
      }
      return { group: action.payload };
    default:
      return state;
  }
};
