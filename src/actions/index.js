import Hue from "../api/Hue";
import { get } from "../__mock__";
import { FETCH_ROOMS, SET_ROOM, FETCH_LIGHTS, SET_LIGHT } from "./types";

export const fetchRooms = () => async dispatch => {
  const response = await Hue.get("/groups");
  dispatch({
    type: FETCH_ROOMS,
    payload: response.data
  });
};

export const setRoom = room => async dispatch => {
  await Hue.put(`/groups/${room.id}/action}`, room.action);
  dispatch ({
    type: SET_ROOM,
    payload: room
  })
}

export const alertRoom = room => async () => {
  await Hue.put(`/groups/${room.id}/action`, { alert: "select" });
  await Hue.put(`/groups/${room.id}/action`, { alert: "none" });
}

export const toggleRoom = room => async dispatch => {
  const response = await Hue.put(`/groups/${room.id}/action`, { on: !room.action.on });
  console.log(response.data);
  dispatch({
    type: SET_ROOM,
    payload: { ...room, action: { ...room.action, on: !room.action.on } }
  });
};

export const fetchLights = () => async dispatch => {
  const response = await Hue.get("/lights");
  dispatch({
    type: FETCH_LIGHTS,
    payload: response.data
  });
};

export const setLight = light => async dispatch => {
  await Hue.put(`/lights/${light.id}/state`, light.state);
  // It malformed request, return early
  // if(response.data.filter(it => it.error)) {
  //   return;
  // }
  dispatch({
    type: SET_LIGHT,
    payload: light
  });
};

export const alertLight = light => async () => {
  await Hue.put(`/lights/${light.id}/state`, { alert: "select" });
  await Hue.put(`/lights/${light.id}/state`, { alert: "none" });
};

export const toggleLight = light => async dispatch => {
  await Hue.put(`/lights/${light.id}/state`, { on: !light.state.on });
  dispatch({
    type: SET_LIGHT,
    payload: { ...light, state: { ...light.state, on: !light.state.on } }
  });
};

// export const fetchRooms = () => async dispatch => {
//   const response = await get("/groups");
//   dispatch({
//     type: FETCH_ROOMS,
//     payload: response.data
//   });
// };

// export const fetchLights = () => async dispatch => {
//   const response = await get("/lights");
//   dispatch({
//     type: FETCH_LIGHTS,
//     payload: response.data
//   });
// };
