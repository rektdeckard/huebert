import React, { useRef } from "react";
import SketchPicker from "./picker/components/sketch/Sketch";
import { connect } from "react-redux";
import { setLight, setRoom } from "../actions";
import { convertHSBToColor, convertHSVToHSB, convertHSVToCT, isAdjustable } from "../utils";

const LIGHT_ELEMENT = 100;
const GROUP_ELEMENT = 500;

const ColorPicker = ({ active, setLight, setRoom }) => {
  // Throttle calls to handleChange()
  let bufferedColor = useRef(null);

  if (!isAdjustable(active.action || active.state)) {
    return null;
  }

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

  const handleChange = (color, event) => {
    if (bufferedColor.current !== null) {
      return;
    }
    bufferedColor.current = color;

    switch (type) {
      case LIGHT_ELEMENT:
        if (active.state.hue) {
          const { hue, sat, bri } = convertHSVToHSB(color);
          setLight({ id: active.id, state: { hue, sat, bri } });
        } else {
          const { ct, bri } = convertHSVToCT(color);
          setLight({ id: active.id, state: { ct, bri } });
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
      bufferedColor.current = null;
    }, type);
  };

  return (
    <div className="ui segment">
      {/* <div className={`ui top attached ${active ? "blue" : ""} label`}>{active ? active.name : "Color"}</div> */}
      <div className={`ui top attached label`}>{active ? active.name : "Color"}</div>
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
