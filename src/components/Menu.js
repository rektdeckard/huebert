import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Menu = ({ lights, rooms, location }) => {
  const isActive = path => {
    return path === location.pathname ? "active" : "";
  };

  return (
    <div className="four wide fluid column">
      {/* <div className="ui left fixed vertical menu"> */}
      <div className="ui fluid vertical menu">
        <Link className={`item ${isActive("/lights")}`} to="/lights">
          Lights
          <div className="ui label blue">{lights.length}</div>
        </Link>
        <Link className={`item ${isActive("/rooms")}`} to="/rooms">
          Groups
          <div className="ui label blue">{rooms.length}</div>
        </Link>
        <Link className={`item ${isActive("/setup")}`} to="/setup">Settings</Link>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { rooms: state.rooms, lights: state.lights };
};

export default connect(
  mapStateToProps,
  {}
)(Menu);
