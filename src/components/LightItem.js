import React from "react";
import { convertHSBToColor } from "../utils";

const LightItem = ({ light, toggle, alert, active, onSelect }) => {
  const color = convertHSBToColor(light.state);

  return (
    <div
      className={`ui card ${active ? "blue" : null}`}
      onClick={() => onSelect(light)}
    >
      <div className="content">
        <i className="lightbulb outline icon"></i>
        {light.name}
        {/* <i className="ui avatar image" src="/images/avatar/large/elliot.jpg" /> Elliot */}
        {/* <div className="description">{light.name}</div> */}
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
