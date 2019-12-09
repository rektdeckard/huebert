import React, { useRef } from "react";
import { connect } from "react-redux";
import { convertHSBToColor, compatibleText } from "../../utils";
import LightRow from "./LightRow";
import {
  alertLight,
  toggleLight,
  setLight,
  setActiveLight,
  alertGroup,
  toggleGroup,
  setGroup,
  setActiveGroup,
  expand
} from "../../actions";

const LightsTable = ({
  group,
  lights,
  active,
  expanded,
  setGroup,
  alertGroup,
  toggleGroup,
  setActiveGroup,
  setLight,
  alertLight,
  toggleLight,
  setActiveLight,
  expand,
  theme
}) => {
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
    setGroup({ ...group, action: { bri } });
    setTimeout(() => {
      throttle.current = null;
    }, 400);
  };

  const handleClick = event => {
    event.ctrlKey ? alertGroup(group) : setActiveGroup(group);
    event.stopPropagation();
  };

  const handleExpand = event => {
    expand(group.id);
    event.stopPropagation();
  };

  const renderRows = () => {
    return lights.map(light => {
      return (
        <LightRow
          light={light}
          group={group}
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
            active.group && active.group.id === group.id
              ? { backgroundColor: "#AAAAAA24" }
              : null
          }
        >
          <th>
            {/* <div className="ui middle aligned checkbox">
              <input type="checkbox" />
              <label></label>
            </div> */}
            <i 
              className={`caret ${expanded ? "down" : "right"} icon`}
              style={{ cursor: "pointer" }}
              onClick={handleExpand}
            />
            <span
              className="ui fluid label"
              style={{
                color: textColor,
                width: "90%",
                cursor: "pointer",
                backgroundImage: `linear-gradient(to right, ${
                  colors.length > 1 ? colors : [colors[0], colors[0]]
                })`
              }}
            >
              {group.name}
            </span>
          </th>
          <th style={{ width: "40%" }}>
            <div className="slidecontainer">
              <input
                className="middle aligned slide"
                type="range"
                min={0}
                max={254}
                value={group.action.bri}
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
                checked={group.state.any_on}
                onChange={() => toggleGroup(group)}
                // disabled={!light.state.reachable}
              />
              <label></label>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {expanded ? renderRows() : null}
        {/* {active.group && active.group.id === group.id ? renderRows() : null} */}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => {
  return {
    active: state.active,
    theme: state.settings.theme,
  };
};

export default connect(mapStateToProps, {
  alertLight,
  toggleLight,
  setLight,
  setActiveLight,
  alertGroup,
  toggleGroup,
  setGroup,
  setActiveGroup,
  expand
})(LightsTable);
