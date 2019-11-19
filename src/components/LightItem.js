import React, { useRef } from "react";
import { convertHSBToColor } from "../utils";

const LightItem = ({ light, toggle, alert, active, onSelect, onDim }) => {
  const color = convertHSBToColor(light.state);

  // Throttle calls to onChangeBrightness()
  const throttle = useRef(null);
  const onChangeBrightness = bri => {
    if (throttle.current !== null) {
      return;
    }

    throttle.current = bri;
    onDim({ ...light, state: { bri } });
    setTimeout(() => {
      throttle.current = null;
    }, 100);
  };

  const handleSelect = event => {
    event.preventDefault();
    onSelect(light);
  }

  return (
    <div
      className={`ui card ${active ? "blue" : null}`}
      onClick={event => handleSelect(event)}
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
          backgroundColor: color,
        }}
        onClick={() => alert(light)}
      />
      <div className="extra content">
        <div className="slidecontainer">
          <input
            className="slide"
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
