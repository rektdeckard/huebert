import React from "react";
import { connect } from "react-redux";
import { withRouter, Switch, Route, Link, Redirect } from "react-router-dom";

import { fetchRooms, fetchLights, initializeApp, createUser } from "../actions";
import Menu from "./Menu";
import RoomsList from "./RoomsList";
import LightsList from "./LightsList";
import ColorPicker from "./ColorPicker";
import Setup from "./Setup";

class App extends React.Component {
  componentDidMount() {
    // localStorage.clear();
    localStorage.setItem("ip", "192.168.1.5");
    localStorage.setItem(
      "username",
      "9vsJop8As2ZXY1ySSVz2EjoHcenpl1cMMLZuBA92"
    );
    this.props.initializeApp();
    if (this.props.init) {
      this.props.fetchRooms();
      this.props.fetchLights();
    }
  }

  render() {
    return (
      <div className="ui segment">
        <div className="ui grid">
          <Menu location={this.props.location} />
          <div className="eight wide column">
            <Switch>
              <Route path="/rooms" exact component={RoomsList} />
              <Route path="/lights" exact component={LightsList} />
              <Route path="/setup" exact component={Setup} />
              <Redirect to={this.props.init ? "/lights" : "/setup"} />;
              {/* <Redirect to="/setup" />; */}
            </Switch>
          </div>
          <div className="four wide column">
            <ColorPicker />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.rooms,
    lights: state.lights,
    init: state.init
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchRooms, fetchLights, initializeApp, createUser }
  )(App)
);
