import Hue from "../api/Hue";
import {
  FETCH_SCENES
} from "./types";

export const fetchScenes = () => async dispatch => {
  const response = await Hue.get("/scenes");

  dispatch({
    type: FETCH_SCENES,
    payload: response.data
  });

  // dispatch(storeSceneInfo(response.data));
  // localStorage.setItem("scenes", JSON.stringify(response.data));
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