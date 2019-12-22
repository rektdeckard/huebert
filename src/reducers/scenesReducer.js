import { FETCH_SCENES } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_SCENES:
      return action.payload;
    default:
      return state;
  }
};
