import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  fetchRooms,
  setActiveRoom,
  setView,
  setTheme,
  toggleExpanded
} from "../../actions";
import LightsTable from "./LightsTable";
import LightsList from "./LightsList";
import ScenesList from "../ScenesList";
import ColorPicker from "../ColorPicker";
import CenterPanel from "../CenterPanel";
import ToolPanel from "../ToolPanel";

const CARD = "card";
const LIST = "list";

const GroupsView = ({
  lights,
  rooms,
  active,
  settings,
  fetchRooms,
  setActiveRoom,
  setView,
  toggleExpanded
}) => {
  useEffect(() => {
    fetchRooms();
  }, []);

  const renderTables = () => {
    return rooms
      // .filter(room => room.name !== "All")
      .map(room => {
        return (
          <LightsTable
            room={room}
            lights={ lights.filter(light => room.lights.includes(light.id)) }
            expanded={settings.expanded.includes(room.id)}
            key={room.id}
          />
        );
      });
  };

  const renderCards = () => {
    return (
      <LightsList
        // rooms={rooms.filter(room => room.name !== "All")}
        rooms={rooms}
        lights={settings.expandAll ? lights : []}
      />
    );
  };

  const renderToolbar = () => {
    return (
      <div
        className={`ui ${settings.theme} mini icon menu`}
        onClick={e => e.stopPropagation()}
      >
        <div
          className={`${settings.view !== CARD ? "active" : null} link item`}
          title="List View"
          onClick={() => setView(LIST)}
        >
          <i className="list icon"></i>
        </div>
        <div
          className={`${settings.view === CARD ? "active" : null} link item`}
          title="Card View"
          onClick={() => setView(CARD)}
        >
          <i className="th icon"></i>
        </div>
        <div
            className={`link item`}
            title={`${settings.expandAll ? "Collapse" : "Expand"} All`}
            onClick={toggleExpanded}
          >
            <i
              className={`angle double ${settings.expandAll ? "up" : "down"} icon`}
            ></i>
          </div>
        {/* <div className="item" style={{ width: 48 }} />
        <div className="menu">
          
          <div className={`disabled link item`} title="Filter Groups">
            <i className="filter icon"></i>
          </div>
          <div className={`disabled link item`} title="Edit Groups">
            <i className="edit icon"></i>
          </div>
          <div className={`disabled link item`} title="Add Group">
            <i className="plus icon"></i>
          </div>
        </div>
        <div className="right menu">
          <div className={`disabled link item`} title="Delete">
            <i className="trash icon"></i>
          </div>
        </div> */}
      </div>
    );
  };

  const renderControls = () => {
    return (
      <ToolPanel>
        {active.light || active.room ? <ColorPicker /> : null}
        {active.room ? <ScenesList /> : null}
      </ToolPanel>
    );
  };

  return (
    <>
      <CenterPanel onClick={() => setActiveRoom(null)}>
        {renderToolbar()}
        {settings.view === CARD ? renderCards() : renderTables()}
      </CenterPanel>
      {renderControls()}
    </>
  );
};

const mapStateToProps = state => {
  return {
    lights: state.lights,
    rooms: state.rooms,
    active: state.active,
    settings: state.settings
  };
};

export default connect(mapStateToProps, {
  fetchRooms,
  setActiveRoom,
  setView,
  setTheme,
  toggleExpanded
})(GroupsView);
