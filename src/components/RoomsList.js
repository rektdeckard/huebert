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
import ScenesList from "./ScenesList";
import ColorPicker from "./ColorPicker";
import CenterPanel from "./CenterPanel";
import ToolPanel from './ToolPanel';

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
          active={active.room ? room.id === active.room.id : false}
          onSelect={setActiveRoom}
          onDim={setRoom}
        />
      );
    });
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
        <div className="ui three stackable link cards">
          {rooms ? renderItems() : null}
        </div>
      </CenterPanel>
      {renderControls()}
    </>
  );
};

const mapStateToProps = state => {
  return {
    rooms: state.rooms,
    active: state.active
  };
};

export default connect(mapStateToProps, {
  fetchRooms,
  alertRoom,
  toggleRoom,
  setRoom,
  setActiveRoom
})(RoomsList);
