import Hue from "../api/Hue";
import * as Mock from "../__mock__";
import { fetchLights } from "../actions";
import {
  FETCH_ROOMS,
  FETCH_LIGHTS,
  SET_ROOM,
  SET_ACTIVE_ROOM,
  INITIALIZE_APP
} from "./types";

export const fetchRooms = () => async dispatch => {
  const roomsResponse = await Hue.get("/groups");
  const lightsResponse = await Hue.get("/lights");

  if (Array.isArray(roomsResponse.data) || Array.isArray(lightsResponse.data)) {
    // dispatch({
    //   type: INITIALIZE_APP,
    //   payload: { error: roomsData.data[0].error.description }
    // });
    return;
  }

  // Apply IDs to lights
  const lights = Object.keys(lightsResponse.data).map(key => ({
    ...lightsResponse.data[key],
    id: key
  }));

  // Apply light colors to room
  const rooms = roomsResponse.data;
  Object.keys(rooms).forEach(key => {
    rooms[key].id = key;
    rooms[key].colors = lights
      .filter(light => rooms[key].lights.includes(light.id))
      .map(light => light.state);
  });

  // // Apply light colors to room
  // const rooms = Object.values(roomsResponse.data).map(room => {
  //   const colors = lights
  //     .filter(light => room.lights.includes(light.id))
  //     .map(light => light.state);
  //   return { ...room, colors };
  // });

  dispatch({
    type: FETCH_ROOMS,
    payload: rooms
  });

  dispatch({
    type: FETCH_LIGHTS,
    payload: lights
  });
};

export const setRoom = room => async dispatch => {
  await Hue.put(`/groups/${room.id}/action`, room.action);
  dispatch(fetchRooms());
};

export const alertRoom = room => async () => {
  await Hue.put(`/groups/${room.id}/action`, { alert: "select" });
  await Hue.put(`/groups/${room.id}/action`, { alert: "none" });
};

export const toggleRoom = room => async dispatch => {
  await Hue.put(`/groups/${room.id}/action`, {
    on: !room.state.any_on
  });
  // TODO: FIX
  dispatch({
    type: SET_ROOM,
    payload: { ...room, state: { ...room.state, any_on: !room.state.any_on } }
  });
};

export const setActiveRoom = room => dispatch => {
  dispatch({
    type: SET_ACTIVE_ROOM,
    payload: room
  });
};
