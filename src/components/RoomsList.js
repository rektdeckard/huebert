import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchGroups,
  alertGroup,
  toggleGroup,
  setGroup,
  setActiveGroup
} from "../actions";
import RoomItem from "./RoomItem";
import ScenesList from "./ScenesList";
import ColorPicker from "./ColorPicker";
import CenterPanel from "./CenterPanel";
import ToolPanel from './ToolPanel';

const RoomsList = ({
  groups,
  active,
  fetchGroups,
  alertGroup,
  toggleGroup,
  setGroup,
  setActiveGroup
}) => {
  useEffect(() => {
    fetchGroups();
  }, []);

  const renderItems = () => {
    return groups.map(group => {
      return (
        <RoomItem
          key={group.id}
          group={group}
          alert={alertGroup}
          toggle={toggleGroup}
          active={active.group ? group.id === active.group.id : false}
          onSelect={setActiveGroup}
          onDim={setGroup}
        />
      );
    });
  };

  const renderControls = () => {
    return (
      <ToolPanel>
        {active.light || active.group ? <ColorPicker /> : null}
        {active.group ? <ScenesList /> : null}
      </ToolPanel>
    );
  };

  return (
    <>
      <CenterPanel onClick={() => setActiveGroup(null)} >
        <div className="ui three stackable link cards">
          {groups ? renderItems() : null}
        </div>
      </CenterPanel>
      {renderControls()}
    </>
  );
};

const mapStateToProps = state => {
  return {
    groups: state.groups,
    active: state.active
  };
};

export default connect(mapStateToProps, {
  fetchGroups,
  alertGroup,
  toggleGroup,
  setGroup,
  setActiveGroup
})(RoomsList);
