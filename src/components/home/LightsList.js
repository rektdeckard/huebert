import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchLights,
  alertLight,
  toggleLight,
  setLight,
  setActiveLight,
  setGroup,
  alertGroup,
  toggleGroup,
  setActiveGroup
} from "../../actions";
import LightItem from "./LightItem";
import RoomItem from "./RoomItem";

const LightsList = ({
  lights,
  groups,
  active,
  fetchLights,
  alertLight,
  toggleLight,
  setLight,
  setActiveLight,
  setGroup,
  alertGroup,
  toggleGroup,
  setActiveGroup,
  theme
}) => {
  useEffect(() => {
    fetchLights();
  }, []);

  const handleSelect = (event, group) => {
    setActiveGroup(group);
    event.stopPropagation();
  };

  const handleAlert = (event, group) => {
    if (event.ctrlKey) {
      alertGroup(group);
      event.stopPropagation();
    }
  };

  const renderGroups = () => {
    return groups
      .map(group => {
        return (
          <div
            className={`ui ${theme} segment`}
            key={group.id}
            onClick={event => handleSelect(event, group)}
          >
            <RoomItem
              group={group}
              alert={alertGroup}
              toggle={toggleGroup}
              active={active.group ? group.id === active.group.id : false}
              onSelect={setActiveGroup}
              onDim={setGroup}
            />
            {/* <div
              className={`ui top attached ${
                active.group && active.group.id == group.id ? "blue" : ""
              } label`}
              style={{ cursor: "pointer" }}
              onClick={event => handleAlert(event, group)}
            >
              {group.name}
              <span className="ui right floated icon">
                <i
                  className={`${
                    active.group && active.group.id == group.id ? "check" : ""
                  } icon`}
                  style={{ float: "right", margin: 0 }}
                ></i>
              </span>
            </div> */}
            <div className="ui three doubling stackable link cards">
              {renderItems(
                lights.filter(light => group.lights.includes(light.id)), group
              )}
            </div>
            {/* <div className="ui stackable link cards"><div className="fluid card">sadfsad</div></div> */}
          </div>
        );
      });
  };

  const renderItems = (lights, group) => {
    return lights.map(light => {
      return (
        <LightItem
          key={light.id}
          light={light}
          group={group}
          toggle={toggleLight}
          alert={alertLight}
          active={active.light ? light.id === active.light.id : false}
          onSelect={setActiveLight}
          onDim={setLight}
        />
      );
    });
  };

  return (
    <div className="ui segments">
      {/* <div className="ui top attached label">Groups</div> */}
      {lights ? renderGroups() : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    active: state.active,
    theme: state.settings.theme
  };
};

export default connect(mapStateToProps, {
  fetchLights,
  alertLight,
  toggleLight,
  setLight,
  setActiveLight,
  setGroup,
  alertGroup,
  toggleGroup,
  setActiveGroup
})(LightsList);
