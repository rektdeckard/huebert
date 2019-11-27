import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchRooms,
  alertRoom,
  toggleRoom,
  setRoom,
  setActiveRoom
} from "../actions";
import RoomItem from "./RoomItem";

const RoomsList = ({
  rooms,
  active,
  fetchRooms,
  alertRoom,
  toggleRoom,
  setRoom,
  setActiveRoom
}) => {

  useEffect(() => {
    fetchRooms();
  }, []);

  const renderItems = () => {
    return rooms.map(room => {
      return (
        <RoomItem
          key={room.id}
          room={room}
          alert={alertRoom}
          toggle={toggleRoom}
          active={active ? room.id === active.id : false}
          onSelect={setActiveRoom}
          onDim={setRoom}
        />
      );
    });
  };

  return (
    <div className="ui three stackable link cards">
      {rooms ? renderItems() : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    rooms: state.rooms,
    active: state.active.room
  };
};

export default connect(mapStateToProps, {
  fetchRooms,
  alertRoom,
  toggleRoom,
  setRoom,
  setActiveRoom
})(RoomsList);
