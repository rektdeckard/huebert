import Hue from "../api/Hue";
import { FETCH_SCENES } from "./types";

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

// export const storeSceneInfo = scenes => async dispatch => {
//   const promises = Object.keys(scenes).map(id => {
//     console.log("promised");
//     return Hue.get(`/scenes/${id}`);
//   });
//   const sceneInfo = await Promise.all(promises);

//   console.log(sceneInfo);
//   scenes.forEach()
// }
