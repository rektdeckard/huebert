import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchRooms, setActiveRoom } from "../actions";
import LightsTable from "./LightsTable";
import LightsList from './LightsList';

const GroupsView = ({ lights, rooms, fetchRooms, setActiveRoom, view }) => {
  useEffect(() => {
    fetchRooms();
  }, []);

  console.log(view);

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

  return (
    <div onClick={() => setActiveRoom(null)}>
      {view == "card" ? renderCards() : renderTables()}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    lights: state.lights,
    rooms: state.rooms,
    view: state.init.view
  };
};

export default connect(mapStateToProps, {
  fetchRooms,
  setActiveRoom
})(GroupsView);
