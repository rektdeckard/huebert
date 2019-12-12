import {
  INITIALIZE_APP,
  INITIALIZE_ERROR,
  CREATE_USER,
  SET_THEME,
  SET_VIEW,
  SET_EXPANDED,
  TOGGLE_EXPANDED
} from "../actions/types";

export default (
  state = { theme: "inverted", expandAll: false, expanded: [] },
  action
) => {
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
    case TOGGLE_EXPANDED:
      return state.expandAll
        ? { ...state, expandAll: !state.expandAll, expanded: [] }
        : { ...state, expandAll: !state.expandAll, expanded: action.payload };
    case SET_EXPANDED:
      return state.expanded.includes(action.payload)
        ? { ...state, expanded: state.expanded.filter(it => it !== action.payload) }
        : { ...state, expanded: [...state.expanded, action.payload] };
    default:
      return state;
  }
};
