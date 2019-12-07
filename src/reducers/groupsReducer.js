import { FETCH_GROUPS, SET_GROUP } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_GROUPS:
      return action.payload;
    case SET_GROUP:
      return state.map(group => {
        if (group.id === action.payload.id) {
          return action.payload;
        }
        return group;
      });
    default:
      return state;
  }
};
