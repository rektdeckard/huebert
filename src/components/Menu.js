import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Menu = ({ lights, rooms, schedules, rules, sensors, location, theme }) => {
  const isActive = path => {
    return path === location.pathname ? "active" : "";
  };

  return (
    <div className={`ui fluid ${theme} vertical menu`}>
      <Link className={`item ${isActive("/home")}`} to="/home">
        Home
        <div className="ui label blue">{lights.length}</div>
      </Link>
      {/* <Link className={`item ${isActive("/groups")}`} to="/groups">
        Groups
        <div className="ui label blue">{rooms.length}</div>
      </Link> */}
      <Link className={`disabled item ${isActive("/schedules")}`} to="/schedules">
        Schedules
        <div className="ui label blue">{schedules.length}</div>
      </Link>
      <Link className={`disabled item ${isActive("/rules")}`} to="/rules">
        Rules
        <div className="ui label blue">{rules.length}</div>
      </Link>
      <Link className={`disabled item ${isActive("/sensors")}`} to="/sensors">
        Sensors
        <div className="ui label blue">{sensors.length}</div>
      </Link>
      <Link className={`item ${isActive("/settings")}`} to="/settings">
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
    sensors: state.sensors,
    theme: state.init.theme
  };
};

export default connect(mapStateToProps, {})(Menu);
