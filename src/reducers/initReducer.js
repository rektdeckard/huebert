import { INITIALIZE_APP, CREATE_USER } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case INITIALIZE_APP:
      return action.payload;
    case CREATE_USER:
      return { ip: action.payload.ip, username: action.payload.username }
    default: 
      return state;
  }
}