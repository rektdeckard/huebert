import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Menu = ({ lights, rooms, location }) => {
  const isActive = path => {
    return path === location.pathname ? "active" : "";
  };

  return (
    <div className="four wide fluid column">
      <div className="ui fluid vertical menu" style={{ zIndex: 20 }}>
        <Link className={`item ${isActive("/rooms")}`} to="/rooms">
          Rooms
          <div className="ui label">{rooms.length}</div>
        </Link>
        <Link className={`item ${isActive("/lights")}`} to="/lights">
          Lights
          <div className="ui label">{lights.length}</div>
        </Link>
        <a className="item">Settings</a>
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
