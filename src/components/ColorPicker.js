import React, { useRef } from "react";
import SketchPicker from "./picker/components/sketch/Sketch";
import { connect } from "react-redux";
import { setLight, setRoom } from "../actions";
import { convertHSBToColor, convertHSVToHSB, convertHSVToCT } from "../utils";

const LIGHT_ELEMENT = "light_element";
const GROUP_ELEMENT = "group_element";

const ColorPicker = ({ active, setLight, setRoom }) => {
  const type = active ? (active.action ? GROUP_ELEMENT : LIGHT_ELEMENT) : null;

  const extractColor = () => {
    switch (type) {
      case LIGHT_ELEMENT:
        return convertHSBToColor(active.state);
      case GROUP_ELEMENT:
        return convertHSBToColor(active.action);
      default:
        return "#2185D0";
    }
  };

  // Throttle calls to handleChange()
  let bufferedColor = null;

  const handleChange = (color, event) => {
    if (bufferedColor !== null) {
      return;
    }
    bufferedColor = color;

    switch (type) {
      case LIGHT_ELEMENT:
        if (active.state.hue) {
          const { hue, sat, bri } = convertHSVToHSB(color);
          const newLight = { id: active.id, state: { hue, sat, bri } };
          setLight(newLight);
        } else {
          const ct = convertHSVToCT(color);
          console.log(ct);
          const newLight = { id: active.id, state: { ct } };
          setLight(newLight);
        }
        break;
      case GROUP_ELEMENT:
        const { hue, sat, bri } = convertHSVToHSB(color);
        const newRoom = { id: active.id, action: { hue, sat, bri } };
        setRoom(newRoom);
        break;
      default:
        break;
    }

    setTimeout(() => {
      bufferedColor = null;
    }, 100);
  };

  return (
    <div className="ui segment">
      <div className={`ui top attached ${active ? "blue" : ""} label`}>{active ? active.name : "Color"}</div>
      <SketchPicker
        width={null}
        color={extractColor()}
        onChange={handleChange}
        disableAlpha
      />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    active: state.active.light ? state.active.light : state.active.room
  };
};

export default connect(mapStateToProps, { setLight, setRoom })(ColorPicker);
