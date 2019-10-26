import React, { useRef } from "react";
import SketchPicker from "./picker/components/sketch/Sketch";
import reactCSS from "reactcss";
import { connect } from "react-redux";
import { setLight, setRoom } from "../actions";
import { convertHSBToColor, convertHSVToHSB } from "../utils";

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

  // Debounce calls to handleChange()
  let bufferedColor = null;

  const handleChange = (color, event) => {
    if (bufferedColor !== null) {
      return;
    }
    bufferedColor = color;

    switch (type) {
      case LIGHT_ELEMENT:
        const { hue, sat, bri } = convertHSVToHSB(color);
        const newLight = { id: active.id, state: { hue, sat, bri } };
        setLight(newLight);
        break;
      case GROUP_ELEMENT:
        
        break;
      default:
        break;
    }

    setTimeout(() => {
      bufferedColor = null;
    }, 100);

    // color = {
    //   hex: '#333',
    //   rgb: {
    //     r: 51,
    //     g: 51,
    //     b: 51,
    //     a: 1,
    //   },
    //   hsl: {
    //     h: 0,
    //     s: 0,
    //     l: .20,
    //     a: 1,
    //   },
    // }
  };

  return (
    // <div style={styles.sketchPicker}>
    <SketchPicker
      width={null}
      color={extractColor()}
      onChange={handleChange}
      disableAlpha
      // styles={styles.sketchPicker}
    />
    // </div>
  );
};

const mapStateToProps = state => {
  return {
    active: state.active.light ? state.active.light : state.active.room
  };
};

export default connect(
  mapStateToProps,
  { setLight, setRoom }
)(ColorPicker);
