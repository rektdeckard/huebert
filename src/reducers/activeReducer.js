import { SET_ACTIVE_LIGHT, SET_ACTIVE_ROOM } from "../actions/types";



export default (state = {}, action) => {
  switch (action.type) {
    case SET_ACTIVE_LIGHT:
      return { light: action.payload };
    case SET_ACTIVE_ROOM:
      return { room: action.payload };
    default:
      return state;
  }
};
