import React, { useRef } from "react";
import { convertHSBToColor, compatibleText } from "../../utils";

const LightItem = ({ light, toggle, alert, active, onSelect, onDim }) => {
  const color = convertHSBToColor(light.state);
  const textColor = compatibleText(color);

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
    onSelect(light);
    event.stopPropagation();
  };

  const handleAlert = event => {
    if (event.ctrlKey) {
      alert(light);
      event.stopPropagation();
    }
  };

  return (
    <div
      className="ui card"
      style={{ backgroundColor: color }}
      onClick={handleSelect}
    >
      <div className="content" style={{ backgroundColor: color }}>
        {/* <i className="lightbulb outline icon"></i> */}
        {/* {light.name} */}
        <div
          style={{ color: textColor, opacity: 0.7, userSelect: "none" }}
          // onDoubleClick={() => alert(light)}
          onClick={handleAlert}
        >
          {light.name}
          <span className="ui right floated icon">
            <i
              className={`${active ? "check" : null} icon`}
              style={{ color: textColor, opacity: 0.7 }}
            ></i>
          </span>
        </div>
        {/* <span
          className="ui right floated avatar image"
          style={{
            flex: 1,
            minWidth: 20,
            minHeight: 20,
            backgroundColor: color
          }}
          onClick={() => alert(light)}
        /> */}
      </div>
      <div className="extra content" style={{ backgroundColor: "#FFFFFF48" }}>
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
      <div className="extra content" style={{ backgroundColor: "#FFFFFF48" }}>
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
