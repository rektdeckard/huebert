import { FETCH_ROOMS, SET_ROOM } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_ROOMS:
      return action.payload;
    case SET_ROOM:
      return state.map(room => {
        if (room.id === action.payload.id) {
          return action.payload;
        }
        return room;
      });
    default:
      return state;
  }
};