import React, { useRef } from "react";
import { convertHSBToColor, compatibleText } from "../utils";

const RoomItem = ({ group, toggle, alert, active, onSelect, onDim }) => {
  const colors = [
    ...new Set(
      group.colors
        .filter(light => light.hue)
        .map(light => convertHSBToColor(light))
        .sort()
    )
  ];
  const textColor = compatibleText(colors[0] || "#FFFFFF");
  // const iconColor = compatibleText(colors[colors.length - 1] || "#FFFFFF");

  // Throttle calls to onChangeBrightness()
  const throttle = useRef(null);
  const onChangeBrightness = bri => {
    if (throttle.current !== null) {
      return;
    }

    throttle.current = bri;
    onDim({ ...group, action: { bri } });
    setTimeout(() => {
      throttle.current = null;
    }, 500);
  };

  const handleSelect = event => {
    onSelect(group);
    event.stopPropagation();
  };

  const handleAlert = event => {
    if (event.ctrlKey) {
      alert(group);
      event.stopPropagation();
    }
  }

  return (
    <div
      className="ui card"
      style={{
        backgroundImage: `linear-gradient(to right, ${
          colors.length > 1 ? colors : [colors[0], colors[0]]
        })`,
        width: "100%"
      }}
      onClick={handleSelect}
    >
      <div className="content">
        <div
          style={{ color: textColor, opacity: 0.7, userSelect: "none" }}
          onClick={handleAlert}
        >
          {group.name}
          <span className="ui right floated icon">
            <i
              className={`${active ? "check" : null} icon`}
              style={{ color: textColor, opacity: 0.7 }}
            />
          </span>
        </div>
      </div>
      <div className="extra content" style={{ backgroundColor: "#FFFFFF48" }}>
        <div className="slidecontainer">
          <input
            className="slide"
            type="range"
            min={0}
            max={254}
            value={group.action.bri}
            onChange={event => onChangeBrightness(Number(event.target.value))}
          />
        </div>
      </div>
      <div className="extra content" style={{ backgroundColor: "#FFFFFF48" }}>
        <span className="ui fitted right floated toggle checkbox">
          <input
            type="checkbox"
            checked={group.state.any_on}
            onChange={() => toggle(group)}
            // disabled={!light.state.reachable}
          />
          <label></label>
        </span>
      </div>
    </div>
  );
};

export default RoomItem;
