import Hue from "../api/Hue";
import axios from "axios";
import * as Mock from "../__mock__";
import {
  FETCH_LIGHTS,
  SET_ACTIVE_LIGHT,
  FETCH_ROOMS,
  SET_ROOM,
  SET_ACTIVE_ROOM,
  INITIALIZE_APP,
  CREATE_USER
} from "./types";

export const fetchLights = () => async dispatch => {
  const response = await Hue.get("/lights");
  dispatch({
    type: FETCH_LIGHTS,
    payload: response.data
  });
};

export const setLight = light => async dispatch => {
  await Hue.put(`/lights/${light.id}/state`, light.state);
  // If malformed request, return early
  // if(response.data.filter(it => it.error)) {
  //   return;
  // }
  dispatch(fetchLights());
};

export const alertLight = light => async () => {
  await Hue.put(`/lights/${light.id}/state`, { alert: "select" });
  await Hue.put(`/lights/${light.id}/state`, { alert: "none" });
};

export const toggleLight = light => async dispatch => {
  await Hue.put(`/lights/${light.id}/state`, { on: !light.state.on });
  dispatch(fetchLights());
};

export const setActiveLight = light => {
  return {
    type: SET_ACTIVE_LIGHT,
    payload: light
  };
};

export const fetchRooms = () => async dispatch => {
  const response = await Hue.get("/groups");
  dispatch({
    type: FETCH_ROOMS,
    payload: response.data
  });
};

export const setRoom = room => async dispatch => {
  await Hue.put(`/groups/${room.id}/action}`, room.action);
  dispatch({
    type: SET_ROOM,
    payload: room
  });
};

export const alertRoom = room => async () => {
  await Hue.put(`/groups/${room.id}/action`, { alert: "select" });
  await Hue.put(`/groups/${room.id}/action`, { alert: "none" });
};

export const toggleRoom = room => async dispatch => {
  const response = await Hue.put(`/groups/${room.id}/action`, {
    on: !room.action.on
  });
  // TODO: FIX
  dispatch({
    type: SET_ROOM,
    payload: { ...room, action: { ...room.action, on: !room.action.on } }
  });
};

export const setActiveRoom = room => {
  return {
    type: SET_ACTIVE_ROOM,
    payload: room
  };
};

export const initializeApp = () => async dispatch => {
  const ip = localStorage.getItem("ip");
  const username = localStorage.getItem("username");

  dispatch({
    type: INITIALIZE_APP,
    payload: { ip, username }
  });

  if (ip && username) {
    const response = await axios.get(`http://${ip}/api/${username}`);
    console.log(response);
    if (response.data.config) {
      dispatch(fetchLights());
      dispatch(fetchRooms());
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
  } else {
    dispatch({
      type: INITIALIZE_APP,
      payload: { error: response.data[0].error.description }
    });
  }
};
