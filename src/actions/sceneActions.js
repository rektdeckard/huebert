import Hue from "../api/Hue";
import { FETCH_SCENES, SET_ACTIVE_SCENE } from "./types";

export const fetchScenes = () => async dispatch => {
  const response = await Hue.get("/scenes");

  dispatch(updateScenes(response.data));

  // dispatch(storeSceneInfo(response.data));
  // localStorage.setItem("scenes", JSON.stringify(response.data));
};

export const updateScenes = data => dispatch => {
  const scenes = Object.keys(data).map(key => ({ ...data[key], id: key }));

  dispatch({
    type: FETCH_SCENES,
    payload: scenes
  });
};

export const createScene = scene => async dispatch => {
  const response = await Hue.post("/scenes", scene);
  if (response.data[0].error) {
    return { error: response.data[0].error.description };
  } else {
    dispatch(fetchScenes());
    dispatch(setActiveScene({ id: response.data[0].success.id }));
    return { success: response.data[0].success }
  }
};

export const deleteScene = id => async dispatch => {
  await Hue.delete(`/scenes/${id}`);
  dispatch(fetchScenes());
  dispatch(setActiveScene(null));
};

export const modifyScene = scene => async dispatch => {
  const response = await Hue.put(`/scenes/${scene.id}`, { lightstates: scene.lightstates });
  
  if (response.data[0].error) {
    return { error: response.data[0].error.description };
  } else {
    dispatch(fetchScenes());
    // dispatch(setActiveScene({ id: response.data[0].success.id }));
    return { success: true }
  }
};

export const setActiveScene = scene => dispatch => {
  dispatch({
    type: SET_ACTIVE_SCENE,
    payload: scene
  });
};

// export const storeSceneInfo = scenes => async dispatch => {
//   const promises = Object.keys(scenes).map(id => {
//     console.log("promised");
//     return Hue.get(`/scenes/${id}`);
//   });
//   const sceneInfo = await Promise.all(promises);

//   console.log(sceneInfo);
//   scenes.forEach()
// }
