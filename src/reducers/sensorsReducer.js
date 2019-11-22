import { FETCH_SENSORS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_SENSORS:
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
};
