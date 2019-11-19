import React, { useRef } from "react";
import { convertHSBToColor, compatibleText } from "../utils";

const RoomItem = ({ room, toggle, alert, active, onSelect, onDim }) => {
  // const color = convertHSBToColor(room.action);
  const colors = room.colors.filter(it => it.hue).map(light => convertHSBToColor(light)).sort();
  const textColor = compatibleText(colors[0]);
  // const textColor = compatibleText(convertHSBToColor(room.action));

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
    className="ui card"
    style={{ backgroundImage: `linear-gradient(to right, ${colors})` }}
    onClick={() => onSelect(room)}
  >
    <div className="content" style={{ backgroundImage: `linear-gradient(to right, ${colors})` }}>
      <div
        style={{ color: textColor, opacity: 0.7, userSelect: "none" }}
        onAuxClick={() => alert(room)}
      >
        {room.name}
        <span className="ui right floated icon">
          <i
            className={`${active ? "check" : null} icon`}
            style={{ color: textColor, opacity: 0.7 }}
          ></i>
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
          value={room.action.bri}
          onChange={event => onChangeBrightness(Number(event.target.value))}
        />
      </div>
    </div>
    <div className="extra content" style={{ backgroundColor: "#FFFFFF48" }}>
      <span className="ui fitted right floated toggle checkbox">
        <input
          type="checkbox"
          checked={room.action.on}
          onChange={() => toggle(room)}
          // disabled={!light.state.reachable}
        />
        <label></label>
      </span>
    </div>
  </div>
    
  );
};

export default RoomItem;