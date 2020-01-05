import Hue from "../api/Hue";
import { FETCH_SENSORS } from "./types";

export const fetchSensors = () => async dispatch => {
  const { data } = await Hue.get("/sensors");
  dispatch(updateSensors(data));
};

export const updateSensors = data => dispatch => {
  const sensors = Object.keys(data).map(key => ({ ...data[key], id: key }));

  dispatch({
    type: FETCH_SENSORS,
    payload: sensors
  });
};

export const toggleSensor = sensor => async dispatch => {
  await Hue.put(`/sensors/${sensor.id}/config`, { on: !sensor.config.on });
  dispatch(fetchSensors());
};

export const configureSensor = (id, config) => async dispatch => {
  const response = await Hue.put(`/sensors/${id}/config`, config);
  console.log(response);
  dispatch(fetchSensors());
};
