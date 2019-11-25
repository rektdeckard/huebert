import axios from "axios";
import { fetchLights, fetchRooms, fetchScenes, fetchSchedules, fetchRules, fetchSensors } from '../actions';
import {
  INITIALIZE_APP,
  CREATE_USER
} from "./types";

export const initializeApp = () => async dispatch => {
  const ip = localStorage.getItem("ip");
  const username = localStorage.getItem("username");

  dispatch({
    type: INITIALIZE_APP,
    payload: { ip, username }
  });

  if (ip && username) {
    const response = await axios.get(`https://${ip}/api/${username}`);
    
    if (response.data.config) {
      dispatch(fetchLights());
      dispatch(fetchRooms());
      dispatch(fetchScenes());
      dispatch(fetchRules());
      dispatch(fetchSchedules());
      dispatch(fetchSensors());
      
      dispatch({
        type: INITIALIZE_APP,
        payload: { ip, username, config: response.data.config }
      })
    }
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
      type: INITIALIZE_APP,
      payload: { error: response.data[0].error.description }
    });
  }
};