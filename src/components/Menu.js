import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Menu = ({ lights, rooms, schedules, rules, sensors, location }) => {
  const isActive = path => {
    return path === location.pathname ? "active" : "";
  };

  return (
    <div className="ui fluid vertical menu">
      <Link className={`item ${isActive("/lights")}`} to="/lights">
        Lights
        <div className="ui label blue">{lights.length}</div>
      </Link>
      <Link className={`item ${isActive("/rooms")}`} to="/rooms">
        Groups
        <div className="ui label blue">{rooms.length}</div>
      </Link>
      <Link className={`item ${isActive("/schedules")}`} to="/schedules">
        Schedules
        <div className="ui label blue">{schedules.length}</div>
      </Link>
      <Link className={`item ${isActive("/rules")}`} to="/rules">
        Rules
        <div className="ui label blue">{rules.length}</div>
      </Link>
      <Link className={`item ${isActive("/sensors")}`} to="/sensors">
        Sensors
        <div className="ui label blue">{sensors.length}</div>
      </Link>
      <Link className={`item ${isActive("/setup")}`} to="/setup">
        Settings
      </Link>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    rooms: state.rooms,
    lights: state.lights,
    schedules: state.schedules,
    rules: state.rules,
    sensors: state.sensors
  };
};

export default connect(mapStateToProps, {})(Menu);
