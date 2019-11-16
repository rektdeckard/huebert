import React, { useRef } from "react";
import { convertHSBToColor } from "../utils";

const RoomItem = ({ room, toggle, alert, active, onSelect, onDim }) => {
  const color = convertHSBToColor(room.action);

  // Throttle calls to onChangeBrightness()
  const throttle = useRef(null);
  const onChangeBrightness = bri => {
    if (throttle.current !== null) {
      return;
    }

    throttle.current = bri;
    onDim({ ...room, action: { bri } });
    setTimeout(() => {
      throttle.current = null;
    }, 500);
  };

  return (
    <div
      className={`ui card ${active ? "blue" : null}`}
      onClick={() => onSelect(room)}
    >
      <div className="content">{room.name}</div>
      <div
        className="ui square image"
        style={{
          flex: 1,
          minWidth: 100,
          minHeight: 100,
          backgroundColor: color
        }}
        onClick={() => alert(room)}
      />
      <div className="extra content">
        <div className="slidecontainer">
          <input
            className="slide"
            type="range"
            min={0}
            max={254}
            value={room.action.bri}
            onChange={event => onChangeBrightness(Number(event.target.value))}
          />
        </div>
      </div>
      <div className="extra content">
        <span className="ui fitted right floated toggle checkbox">
          <input
            type="checkbox"
            checked={room.action.on}
            onChange={() => toggle(room)}
          />
          <label></label>
        </span>
      </div>
    </div>
  );
};

export default RoomItem;
