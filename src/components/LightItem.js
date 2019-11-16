import React from "react";
import { convertHSBToColor } from "../utils";
import reactCSS from "reactcss";
// import '../styles.css'

const LightItem = ({ light, toggle, alert, active, onSelect, onDim }) => {
  const color = convertHSBToColor(light.state);

  // Throttle calls to onChangeBrightness()
  let throttle = null;
  const onChangeBrightness = bri => {
    if (throttle !== null) {
      return;
    }

    throttle = bri;
    onDim({ ...light, state: { bri } });

    setTimeout(() => {
      throttle = null;
    }, 100);
  };

  // const styles = reactCSS({
  //   'default': {
  //     slidecontainer: { width: "100%" },
  //     slider: {
  //       appearance: "none" /* Override default CSS styles */,
  //       width: "100%" /* Full-width */,
  //       height: 25 /* Specified height */,
  //       background: "#FF0000" /* Grey background */,
  //       outline: "none" /* Remove outline */,
  //       opacity: 0.7 /* Set transparency (for mouse-over effects on hover) */,
  //       transition: "opacity .2s"
  //     }
  //   },
  //   'hover': {
  //     slider: {
  //       opacity: 1
  //     }
  //   },
  //   '-moz-range-thumb': {
  //     slider: {
  //       width: 25 /* Set a specific slider handle width */,
  //       height: 25 /* Slider handle height */,
  //       background: "#4CAF50" /* Green background */,
  //       cursor: "pointer"
  //     }
  //   }
  // });

  return (
    <div
      className={`ui card ${active ? "blue" : null}`}
      onClick={() => onSelect(light)}
    >
      <div className="content">
        {/* <i className="lightbulb outline icon"></i> */}
        {light.name}
      </div>
      <div
        className="ui square image"
        style={{
          flex: 1,
          minWidth: 100,
          minHeight: 100,
          backgroundColor: color
        }}
        onClick={() => alert(light)}
      />
      <div className="extra content">
        <div className="slidecontainer">
          <input
            className="slider"
            type="range"
            min={1}
            max={254}
            value={light.state.bri}
            onChange={event => onChangeBrightness(Number(event.target.value))}
          />
        </div>
      </div>
      <div className="extra content">
        <span className="ui fitted right floated toggle checkbox">
          <input
            type="checkbox"
            checked={light.state.on}
            onChange={() => toggle(light)}
            disabled={!light.state.reachable}
          />
          <label></label>
        </span>
      </div>
    </div>
  );
};

export default LightItem;
