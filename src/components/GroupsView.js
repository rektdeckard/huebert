import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchRooms, setActiveRoom } from "../actions";
import LightsTable from "./LightsTable";
import LightsList from "./LightsList";
import ScenesList from "./ScenesList";
import ColorPicker from "./ColorPicker";
import CenterPanel from "./CenterPanel";
import ToolPanel from './ToolPanel';

const GroupsView = ({ lights, rooms, active, fetchRooms, setActiveRoom, view }) => {
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
    return <LightsList />;
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
      <CenterPanel onClick={() => setActiveRoom(null)} >
        {view === "card" ? renderCards() : renderTables()}
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
    view: state.init.view
  };
};

export default connect(mapStateToProps, {
  fetchRooms,
  setActiveRoom
})(GroupsView);
