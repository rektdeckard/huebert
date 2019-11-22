import Hue from "../api/Hue";
import { fetchLights } from '../actions';
import {
  FETCH_ROOMS,
  SET_ROOM,
  SET_ACTIVE_ROOM
} from "./types";

export const fetchRooms = () => async dispatch => {
  const { data } = await Hue.get("/groups");
  const lights = await Hue.get("/lights")
  
  // Apply light colors to room
  Object.keys(data).forEach(key => {
    data[key].colors = Object.keys(lights.data)
      .filter(id => data[key].lights.includes(id))
      .map(included => lights.data[included].state)
    }
  );

  dispatch({
    type: FETCH_ROOMS,
    payload: data
  });
};

export const setRoom = room => async dispatch => {
  await Hue.put(`/groups/${room.id}/action`, room.action);
  dispatch(fetchRooms());
  // setTimeout(() => {
    dispatch(fetchLights());
  // }, 500);
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

export const setActiveRoom = room => dispatch => {
  dispatch({
    type: SET_ACTIVE_ROOM,
    payload: room
  });
};