import { FETCH_ROOMS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ROOMS:
      return Object.keys(action.payload).map(key => ({ ...action.payload[key], id: key }));
    default:
      return state;
  }
};
