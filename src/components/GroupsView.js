import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchRooms,
  setActiveRoom
} from "../actions";
import LightsTable from "./LightsTable";

const GroupsView = ({ lights, rooms, fetchRooms, setActiveRoom }) => {
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

  return (
    <div style={{ height: "95vh" }} onClick={() => setActiveRoom(null)}>
      {renderTables()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    lights: state.lights,
    rooms: state.rooms,
  };
};

export default connect(mapStateToProps, {
  fetchRooms,
  setActiveRoom
})(GroupsView);
