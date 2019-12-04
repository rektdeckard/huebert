import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchLights,
  alertLight,
  toggleLight,
  setLight,
  setActiveLight,
  setRoom,
  alertRoom,
  toggleRoom,
  setActiveRoom
} from "../../actions";
import LightItem from "./LightItem";
import RoomItem from "../RoomItem";

const LightsList = ({
  lights,
  rooms,
  active,
  fetchLights,
  alertLight,
  toggleLight,
  setLight,
  setActiveLight,
  setRoom,
  alertRoom,
  toggleRoom,
  setActiveRoom,
  theme
}) => {
  useEffect(() => {
    fetchLights();
  }, []);

  const handleSelect = (event, room) => {
    setActiveRoom(room);
    event.stopPropagation();
  };

  const handleAlert = (event, room) => {
    if (event.ctrlKey) {
      alertRoom(room);
      event.stopPropagation();
    }
  };

  const renderGroups = () => {
    return rooms
      .map(room => {
        return (
          <div
            className={`ui ${theme} segment`}
            key={room.id}
            onClick={event => handleSelect(event, room)}
          >
            <RoomItem
              room={room}
              alert={alertRoom}
              toggle={toggleRoom}
              active={active.room ? room.id === active.room.id : false}
              onSelect={setActiveRoom}
              onDim={setRoom}
            />
            {/* <div
              className={`ui top attached ${
                active.room && active.room.id == room.id ? "blue" : ""
              } label`}
              style={{ cursor: "pointer" }}
              onClick={event => handleAlert(event, room)}
            >
              {room.name}
              <span className="ui right floated icon">
                <i
                  className={`${
                    active.room && active.room.id == room.id ? "check" : ""
                  } icon`}
                  style={{ float: "right", margin: 0 }}
                ></i>
              </span>
            </div> */}
            <div className="ui three doubling stackable link cards">
              {renderItems(
                lights.filter(light => room.lights.includes(light.id))
              )}
            </div>
            {/* <div className="ui stackable link cards"><div className="fluid card">sadfsad</div></div> */}
          </div>
        );
      });
  };

  const renderItems = lights => {
    return lights.map(light => {
      return (
        <LightItem
          key={light.id}
          light={light}
          toggle={toggleLight}
          alert={alertLight}
          active={active.light ? light.id === active.light.id : false}
          onSelect={setActiveLight}
          onDim={setLight}
        />
      );
    });
  };

  return (
    <div className="ui segments">
      {/* <div className="ui top attached label">Groups</div> */}
      {lights ? renderGroups() : null}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    active: state.active,
    theme: state.init.theme
  };
};

export default connect(mapStateToProps, {
  fetchLights,
  alertLight,
  toggleLight,
  setLight,
  setActiveLight,
  setRoom,
  alertRoom,
  toggleRoom,
  setActiveRoom
})(LightsList);
