import React from "react";
import { convertHSBToColor } from "../utils";

const RoomItem = ({ room, toggle, alert, active, onSelect }) => {
  const color = convertHSBToColor(room.action);

  return (
    <div
      className={`ui card ${active ? "blue" : null}`}
      onClick={() => onSelect(room)}
    >
      <div className="content">
        <div className="description">{room.name}</div>
      </div>
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
