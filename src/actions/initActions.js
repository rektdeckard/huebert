import axios from "axios";
import {
  fetchLights,
  fetchRooms,
  fetchScenes,
  fetchSchedules,
  fetchRules,
  fetchSensors
} from "../actions";
import { INITIALIZE_APP, CREATE_USER, SET_THEME, SET_VIEW } from "./types";

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
    const response = await axios.get(`http://${ip}/api/${username}`);

    if (response.data.config) {
      // FIXME: create a fetchAll() function that makes a single network call
      dispatch(fetchLights());
      dispatch(fetchRooms());
      dispatch(fetchScenes());
      dispatch(fetchRules());
      dispatch(fetchSchedules());
      dispatch(fetchSensors());

      settings.config = response.data.config;
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
  const response = await axios.post(`http://${ip}/api/`, {
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
      type: INITIALIZE_APP,
      payload: { error: response.data[0].error.description }
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
