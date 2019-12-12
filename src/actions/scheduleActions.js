import Hue from "../api/Hue";
import { FETCH_SCHEDULES } from "./types";

export const fetchSchedules = () => async dispatch => {
  const { data } = await Hue.get("/schedules");
  dispatch(updateSchedules(data));
};

export const updateSchedules = data => dispatch => {
  const schedules = Object.keys(data).map(key => ({ ...data[key], id: key }));

  dispatch({
    type: FETCH_SCHEDULES,
    payload: schedules
  });
};
