import {
  INITIALIZE_APP,
  INITIALIZE_ERROR,
  CREATE_USER,
  SET_THEME,
  SET_VIEW
} from "../actions/types";

export default (state = {}, action) => {
  switch (action.type) {
    case INITIALIZE_APP:
      return { ...state, ...action.payload, error: null };
    case CREATE_USER:
      return {
        ...state,
        ip: action.payload.ip,
        username: action.payload.username,
        error: null
      };
    case INITIALIZE_ERROR:
      return { ...state, error: action.payload };
    case SET_THEME:
      return { ...state, theme: action.payload };
    case SET_VIEW:
      return { ...state, view: action.payload };
    default:
      return state;
  }
};
