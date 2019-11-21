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

const RoomsList = props => {
  useEffect(() => {
    props.fetchRooms();
  }, []);

  const renderItems = () => {
    return props.rooms.map(room => {
      return (
        <RoomItem
          key={room.id}
          room={room}
          alert={props.alertRoom}
          toggle={props.toggleRoom}
          active={props.active ? room.id == props.active.id : false}
          onSelect={props.setActiveRoom}
          onDim={props.setRoom}
        />
      );
    });
  };

  return (
    <div className="ui three stackable link cards">
      {props.rooms ? renderItems() : null}
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
