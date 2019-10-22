import React from "react";
import { connect } from "react-redux";
import { withRouter, Switch, Route, Link } from "react-router-dom";

import { fetchRooms, fetchLights } from "../actions";
import RoomsList from "./RoomsList";
import LightsList from "./LightsList";

class MainScreen extends React.Component {
  componentDidMount() {
    this.props.fetchRooms();
    this.props.fetchLights();
  }

  componentDidUpdate() {
    console.log(this.props.location.pathname);
  }

  isActive(path) {
    path === this.props.location.pathname ? "active" : "";
  }

  render() {
    return (
      <div className="ui segment">
        <div className="ui grid">
          <div className="four wide column">
            <div className="ui vertical menu">
              <Link className={`item ${this.isActive("/rooms")}`} to="/rooms">
                Rooms
                <div className="ui label">{this.props.rooms.length}</div>
              </Link>
              <Link className={`item ${this.isActive("/lights")}`} to="/lights">
                Lights
                <div className="ui label">{this.props.lights.length}</div>
              </Link>
              <a className="item">Settings</a>
            </div>
          </div>
          <div className="twelve wide column">
            <Switch>
              <Route path="/rooms" exact component={RoomsList} />
              <Route path="/lights" exact component={LightsList} />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.rooms,
    lights: state.lights
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchRooms, fetchLights }
  )(MainScreen)
);
