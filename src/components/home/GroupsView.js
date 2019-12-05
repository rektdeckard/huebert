import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchRooms, setActiveRoom, setView, setTheme, toggleExpanded } from "../../actions";
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
  init,
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
      .filter(room => room.name !== "All")
      .map(room => {
        return (
          <LightsTable
            room={room}
            lights={init.expanded ? lights.filter(light => room.lights.includes(light.id)) : []}
            key={room.id}
          />
        );
      });
  };

  const renderCards = () => {
    return (
      <LightsList
        rooms={rooms.filter(room => room.name !== "All")}
        lights={init.expanded ? lights : []}
      />
    );
  };

  const renderToolbar = () => {
    return (
      <div
        className={`ui ${init.theme} mini icon menu`}
        onClick={e => e.stopPropagation()}
      >
        <div
          className={`${init.view !== CARD ? "active" : null} link item`}
          title="List View"
          onClick={() => setView(LIST)}
        >
          <i className="list icon"></i>
        </div>
        <div
          className={`${init.view === CARD ? "active" : null} link item`}
          title="Card View"
          onClick={() => setView(CARD)}
        >
          <i className="th icon"></i>
        </div>
        <div className="item" style={{ width: 48 }} />
        <div className="menu">
          <div className={`link item`} 
            title={`${init.expanded ? "Hide" : "Show"} Lights`}
            onClick={toggleExpanded}
          >
            <i className={`eye ${init.expanded ? "slash" : null} icon`}></i>
          </div>
          <div className={`link item`} title="Filter Groups">
            <i className="filter icon"></i>
          </div>
          <div className={`link item`} title="Edit Groups">
            <i className="edit icon"></i>
          </div>
          <div className={`link item`} title="Add Group">
            <i className="plus icon"></i>
          </div>
        </div>
        <div className="right menu">
          <div className={`link item`} title="Delete">
            <i className="trash icon"></i>
          </div>
        </div>
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
        {init.view === CARD ? renderCards() : renderTables()}
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
    init: state.init
  };
};

export default connect(mapStateToProps, {
  fetchRooms,
  setActiveRoom,
  setView,
  setTheme,
  toggleExpanded
})(GroupsView);
