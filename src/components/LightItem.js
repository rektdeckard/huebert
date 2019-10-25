import React from "react";
import { convertHSLToColor } from "../utils";

const LightItem = ({ light, toggle, alert, active }) => {
  const color = convertHSLToColor(light.state);

  return (
    <div className={`card ${active ? "blue" : null}`}>
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
      <div className="content">
        <div className="description">{light.name}</div>
      </div>
      <div className="extra content">
        <div className="ui fitted right floated toggle checkbox">
          <input
            type="checkbox"
            checked={light.state.on}
            onChange={() => toggle(light)}
          />
          <label></label>
        </div>
      </div>
    </div>
  );
};

export default LightItem;
