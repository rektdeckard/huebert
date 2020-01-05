import Hue from "../api/Hue";
import * as Mock from "../__mock__";
import {
  FETCH_GROUPS,
  FETCH_LIGHTS,
  SET_GROUP,
  SET_ACTIVE_GROUP
} from "./types";
import { setActiveScene } from ".";

export const fetchGroups = () => async dispatch => {
  const groupsResponse = await Hue.get("/groups");
  const lightsResponse = await Hue.get("/lights");

  if (
    Array.isArray(groupsResponse.data) ||
    Array.isArray(lightsResponse.data)
  ) {
    // dispatch({
    //   type: INITIALIZE_APP,
    //   payload: { error: groupsData.data[0].error.description }
    // });
    return;
  }

  dispatch(updateGroups(lightsResponse.data, groupsResponse.data));
};

export const updateGroups = (lightsData, groupsData) => dispatch => {
  // Apply IDs to lights
  const lights = Object.keys(lightsData).map(key => ({
    ...lightsData[key],
    id: key
  }));

  // Apply light colors to group
  const groups = Object.keys(groupsData).map(key => ({
    ...groupsData[key],
    id: key,
    colors: lights
      .filter(light => groupsData[key].lights.includes(light.id))
      .map(light => light.state)
  }));

  // // Apply light colors to group
  // const groups = Object.values(groupsData.data).map(group => {
  //   const colors = lights
  //     .filter(light => group.lights.includes(light.id))
  //     .map(light => light.state);
  //   return { ...group, colors };
  // });

  dispatch({
    type: FETCH_GROUPS,
    payload: groups
  });

  dispatch({
    type: FETCH_LIGHTS,
    payload: lights
  });
};

export const setGroup = (group, clearActiveScene = true) => async dispatch => {
  await Hue.put(`/groups/${group.id}/action`, group.action);
  dispatch(fetchGroups());

  // TODO: keep scene active when changing the group's state??
  // if (clearActiveScene) {
  //   dispatch(setActiveScene(null));
  // }
};

export const alertGroup = group => async () => {
  await Hue.put(`/groups/${group.id}/action`, { alert: "select" });
  await Hue.put(`/groups/${group.id}/action`, { alert: "none" });
};

export const toggleGroup = group => async dispatch => {
  await Hue.put(`/groups/${group.id}/action`, {
    on: !group.state.any_on
  });
  // TODO: FIX
  dispatch({
    type: SET_GROUP,
    payload: {
      ...group,
      state: { ...group.state, any_on: !group.state.any_on }
    }
  });
};

export const setActiveGroup = group => dispatch => {
  dispatch({
    type: SET_ACTIVE_GROUP,
    payload: group
  });
};

export const createGroup = group => async dispatch => {
  const response = await Hue.post("/groups", group);
  if (response.data[0].error) {
    return { error: response.data[0].error.description };
  } else {
    dispatch(fetchGroups());
    return { success: response.data };
  }
};

export const deleteGroup = id => async dispatch => {
  const response = await Hue.delete(`/groups/${id}`);
  if (response.data[0].error) {
    // TODO: handle like create
    window.alert(`Error: ${response.data[0].error.description}`);
  }

  dispatch(fetchGroups());
};

export const addLight = (group, light) => async dispatch => {
  await Hue.put(`/groups/${group.id}/lights`, [...group.lights, light.id]);
  dispatch(fetchGroups());
};

export const removeLight = light => async dispatch => {
  const response = await Hue.put(`/groups/${light.group.id}`, {
    lights: light.group.lights.filter(id => id !== light.id)
  });
  // console.log(response);
  // TODO: check for errors and display relevant popup
  dispatch(fetchGroups());
};
