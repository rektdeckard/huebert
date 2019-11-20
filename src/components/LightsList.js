import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchLights,
  alertLight,
  toggleLight,
  setLight,
  setActiveLight,
  setActiveRoom
} from "../actions";
import LightItem from "./LightItem";

const LightsList = ({
  lights,
  rooms,
  active,
  fetchLights,
  alertLight,
  toggleLight,
  setLight,
  setActiveLight,
  setActiveRoom
}) => {

  useEffect(() => {
    fetchLights();
  }, []);

  const handleSelect = (event, room) => {
    setActiveRoom(room);
    event.stopPropagation();
  }

  const renderGroups = () => {
    return rooms.filter(room => room.name !== "All").map(room => {
      return (
        <div className="ui segment" 
          key={room.id}
          onClick={event => handleSelect(event, room)}
        >
          <div
            className={`ui top attached ${
              active.room && active.room.id == room.id ? "blue" : ""
            } label`}
            style={{ cursor: "pointer" }}
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
          </div>
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
          active={active.light ? light.id == active.light.id : false}
          onSelect={setActiveLight}
          onDim={setLight}
        />
      );
    });
  };

  return lights ? renderGroups() : null;
};

const mapStateToProps = state => {
  return {
    lights: state.lights,
    rooms: state.rooms,
    active: state.active
  };
};

export default connect(mapStateToProps, {
  fetchLights,
  alertLight,
  toggleLight,
  setLight,
  setActiveLight,
  setActiveRoom
})(LightsList);
