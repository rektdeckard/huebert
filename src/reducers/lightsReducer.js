import { FETCH_LIGHTS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_LIGHTS:
      return Object.keys(action.payload).map(key => ({ ...action.payload[key], id: key }));
    default:
      return state;
  }
};
