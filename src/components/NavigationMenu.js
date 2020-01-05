import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Menu, Label } from 'semantic-ui-react';

const NavigationMenu = ({ lights, rooms, schedules, rules, sensors, location, theme }) => {
  const isActive = path => {
    return path === location.pathname ? "active" : "";
  };

  return (
    <Menu 
      fluid
      vertical
      inverted={theme === "inverted"}
    >
      <Link className={`item ${isActive("/")}`} to="/">
        Home
        <Label color="blue">{lights.length}</Label>
      </Link>
      <Link className={`item ${isActive("/routines")}`} to="/routines">
        Routines
        <Label color="blue">{schedules.length}</Label>
      </Link>
      <Link className={`item ${isActive("/sensors")}`} to="/sensors">
        Sensors
        <Label color="blue">{sensors.length}</Label>
      </Link>
      <Link className={`disabled item ${isActive("/rules")}`} to="/rules">
        Rules
        <Label color="blue">{rules.length}</Label>
      </Link>
      <Link className={`item ${isActive("/settings")}`} to="/settings">
        Settings
      </Link>
    </Menu>
  );
};

const mapStateToProps = state => {
  return {
    rooms: state.rooms,
    lights: state.lights,
    schedules: state.schedules,
    rules: state.rules,
    sensors: state.sensors,
    theme: state.settings.theme
  };
};

export default connect(mapStateToProps, {})(NavigationMenu);
