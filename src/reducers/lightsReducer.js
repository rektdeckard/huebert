import { FETCH_LIGHTS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_LIGHTS:
      return action.payload;
    default:
      return state;
  }
};
