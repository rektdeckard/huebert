import React, { useEffect } from "react";
import { connect } from "react-redux";

import { fetchRooms, setActiveRoom, setView, setTheme } from "../actions";
import LightsTable from "./LightsTable";
import LightsList from "./LightsList";
import ScenesList from "./ScenesList";
import ColorPicker from "./ColorPicker";
import CenterPanel from "./CenterPanel";
import ToolPanel from "./ToolPanel";

const GroupsView = ({
  lights,
  rooms,
  active,
  init,
  fetchRooms,
  setActiveRoom,
  setView,
  setTheme
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
            lights={lights.filter(light => room.lights.includes(light.id))}
            key={room.id}
          />
        );
      });
  };

  const renderCards = () => {
    return (
      <LightsList
        rooms={rooms.filter(room => room.name !== "All")}
        lights={lights}
      />
    );
  };

  const renderToolbar = () => {
    return (
      // <>
      <div 
        className={`ui ${init.theme} secondary fitted menu`}
        onClick={e => e.stopPropagation()}
      >
        <div className="item">
          <div
            className={`ui mini left floated ${
              init.theme === "inverted" ? "secondary" : "basic"
            } icon buttons`}
          >
            <button
              className={`ui ${init.view !== "card" ? "active" : null} button`}
              title="List View"
              onClick={() => setView(null)}
            >
              <i className="list ul icon"></i>
            </button>
            <button
              className={`ui ${init.view === "card" ? "active" : null} button`}
              title="Card View"
              onClick={() => setView("card")}
            >
              <i className="th icon"></i>
            </button>
          </div>
        </div>
        <div className="item">
          <div
            className={`ui mini ${
              init.theme === "inverted" ? "secondary" : "basic"
            } icon buttons`}
          >
            <button className={`ui button`} title="Hide Groups">
              <i className="eye slash icon"></i>
            </button>
            <button className={`ui button`} title="Filter Groups">
              <i className="filter icon"></i>
            </button>
            <button className={`ui button`} title="Edit Groups">
              <i className="edit icon"></i>
            </button>
            <button className={`ui button`} title="Add Group">
              <i className="plus icon"></i>
            </button>
          </div>
        </div>
        <div className="right menu">
          {}
        </div>
      </div>
      // </>
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
        {init.view === "card" ? renderCards() : renderTables()}
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
  setTheme
})(GroupsView);
