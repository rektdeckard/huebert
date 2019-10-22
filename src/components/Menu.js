import React from "react";
import { Link } from "react-router-dom";

class Menu extends React.Component {
  render() {
    return (
      <div className="four wide column">
        <div className="ui vertical menu">
          <Link className="item active" to="/rooms">
            Rooms
            <div className="ui label">{this.props.rooms.length}</div>
          </Link>
          <Link className="item" to="/lights">
            Lights
            <div className="ui label">{this.props.lights.length}</div>
          </Link>
          <a className="item">Settings</a>
        </div>
      </div>
    );
  }
}

export default Menu;
