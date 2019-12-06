import React, { useRef } from "react";
import { connect } from "react-redux";
import { convertHSBToColor, compatibleText } from "../../utils";
import LightRow from "./LightRow";
import {
  alertLight,
  toggleLight,
  setLight,
  setActiveLight,
  alertRoom,
  toggleRoom,
  setRoom,
  setActiveRoom
} from "../../actions";

const LightsTable = ({
  room,
  lights,
  active,
  setRoom,
  alertRoom,
  toggleRoom,
  setActiveRoom,
  setLight,
  alertLight,
  toggleLight,
  setActiveLight,
  theme
}) => {
  const colors = [
    ...new Set(
      room.colors
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
    setRoom({ ...room, action: { bri } });
    setTimeout(() => {
      throttle.current = null;
    }, 400);
  };

  const handleClick = event => {
    event.ctrlKey ? alertRoom(room) : setActiveRoom(room);
    event.stopPropagation();
  };

  const renderRows = () => {
    return lights.map(light => {
      return (
        <LightRow
          light={light}
          active={active.light && active.light.id === light.id}
          setLight={setLight}
          setActiveLight={setActiveLight}
          alertLight={alertLight}
          toggleLight={toggleLight}
          theme={theme}
          key={light.id}
        />
      );
    });
  };

  return (
    <table className={`ui selectable large single line ${theme} table`}>
      <thead onClick={handleClick}>
        <tr
          style={
            active.room && active.room.id === room.id
              ? { backgroundColor: "#AAAAAA24" }
              : null
          }
        >
          <th>
            {/* <div className="ui middle aligned checkbox">
              <input type="checkbox" />
              <label></label>
            </div> */}
            <span
              className="ui fluid label"
              style={{
                color: textColor,
                // width: 224,
                backgroundImage: `linear-gradient(to right, ${
                  colors.length > 1 ? colors : [colors[0], colors[0]]
                })`
              }}
            >
              {room.name}
            </span>
          </th>
          <th style={{ width: "40%" }}>
            <div className="slidecontainer">
              <input
                className="middle aligned slide"
                type="range"
                min={0}
                max={254}
                value={room.action.bri}
                onChange={event =>
                  onChangeBrightness(Number(event.target.value))
                }
              />
            </div>
          </th>
          <th className="collapsing">
            <span className="ui middle aligned toggle checkbox">
              <input
                type="checkbox"
                checked={room.state.any_on}
                onChange={() => toggleRoom(room)}
                // disabled={!light.state.reachable}
              />
              <label></label>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {renderRows()}
        {/* {active.room && active.room.id === room.id ? renderRows() : null} */}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => {
  return {
    active: state.active,
    theme: state.init.theme
  };
};

export default connect(mapStateToProps, {
  alertLight,
  toggleLight,
  setLight,
  setActiveLight,
  alertRoom,
  toggleRoom,
  setRoom,
  setActiveRoom
})(LightsTable);
