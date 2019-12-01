import Hue from "../api/Hue";
import { FETCH_RULES } from "./types";

export const fetchRules = () => async dispatch => {
  const { data } = await Hue.get("/rules");
  dispatch(updateRules(data));
};

export const updateRules = data => dispatch => {
  const rules = Object.keys(data).map(key => ({ ...data[key], id: key }));

  dispatch({
    type: FETCH_RULES,
    payload: rules
  });
};
