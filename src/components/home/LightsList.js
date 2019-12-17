import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Card, Segment } from "semantic-ui-react";

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
  }, [fetchLights]);

  const handleSelect = (event, group) => {
    setActiveGroup(group);
    event.stopPropagation();
  };

  const renderGroups = () => {
    return groups.map(group => {
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
          <Card.Group doubling stackable itemsPerRow={3}>
            {renderItems(
              lights.filter(light => group.lights.includes(light.id)),
              group
            )}
          </Card.Group>
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

  return <Segment.Group>{lights ? renderGroups() : null}</Segment.Group>;
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
