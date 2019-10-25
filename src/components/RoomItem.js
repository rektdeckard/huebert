import React from "react";
import { convertHSLToColor } from "../utils";

const RoomItem = ({ room, toggle, alert, active}) => {
  const color = convertHSLToColor(room.action);

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
        onClick={() => alert(room)}
      />
      <div className="content">
        <div className="description">{room.name}</div>
      </div>
      <div className="extra content">
        <div className="ui fitted right floated toggle checkbox">
          <input
            type="checkbox"
            checked={room.action.on}
            onChange={() => toggle(room)}
          />
          <label></label>
        </div>
      </div>
    </div>
  );
};

export default RoomItem;
