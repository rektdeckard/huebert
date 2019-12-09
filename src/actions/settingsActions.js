import axios from "axios";
import {
  updateLights,
  updateGroups,
  updateScenes,
  updateRules,
  updateSchedules,
  updateSensors
} from ".";
import {
  INITIALIZE_APP,
  INITIALIZE_ERROR,
  CREATE_USER,
  SET_THEME,
  SET_VIEW,
  TOGGLE_EXPANDED,
  SET_EXPANDED
} from "./types";

export const initializeApp = () => async dispatch => {
  const ip = localStorage.getItem("ip");
  const username = localStorage.getItem("username");
  const theme = localStorage.getItem("theme");
  const view = localStorage.getItem("view");

  const settings = { ip, username, theme, view };
  // dispatch({
  //   type: INITIALIZE_APP,
  //   payload: { ip, username }
  // });

  if (ip && username) {
    const response = await axios.get(`https://${ip}/api/${username}`);

    if (response.data.config) {
      settings.config = response.data.config;

      dispatch(updateLights(response.data.lights));
      dispatch(updateGroups(response.data.lights, response.data.groups));
      dispatch(updateScenes(response.data.scenes));
      dispatch(updateRules(response.data.rules));
      dispatch(updateSchedules(response.data.schedules));
      dispatch(updateSensors(response.data.sensors));
    }

    dispatch({
      type: INITIALIZE_APP,
      payload: settings
    });
  }
};

export const resetApp = () => async dispatch => {
  localStorage.clear();
  dispatch({
    type: INITIALIZE_APP
  });
};

export const createUser = ip => async dispatch => {
  const response = await axios.post(`https://${ip}/api/`, {
    devicetype: "Huebert"
  });

  if (response.data[0].success) {
    localStorage.setItem("ip", ip);
    localStorage.setItem("username", response.data[0].success.username);
    dispatch({
      type: CREATE_USER,
      payload: { ip, username: response.data[0].success.username }
    });
    dispatch(initializeApp());
  } else {
    dispatch({
      type: INITIALIZE_ERROR,
      payload: response.data[0].error.description
    });
  }
};

export const setTheme = theme => dispatch => {
  localStorage.setItem("theme", theme);
  dispatch({
    type: SET_THEME,
    payload: theme
  });
};

export const setView = view => dispatch => {
  localStorage.setItem("view", view);
  dispatch({
    type: SET_VIEW,
    payload: view
  });
};

export const expand = id => (dispatch, getState) => {
  let { expanded, expandAll } = getState().settings;
  let groupIds = getState().groups.map(group => group.id);

  expanded = expanded.includes(id)
    ? expanded.filter(it => it !== id)
    : [...expanded, id];

  dispatch({
    type: SET_EXPANDED,
    payload: id
  });

  if (expanded.length === groupIds.length || (expanded.length === 0 && expandAll)) {
    dispatch({ type: TOGGLE_EXPANDED, payload: groupIds });
  }
};

export const toggleExpanded = () => (dispatch, getState) => {
  let groupIds = getState().groups.map(group => group.id);
  dispatch({ type: TOGGLE_EXPANDED, payload: groupIds });
};
