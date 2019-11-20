import React from "react";
import { connect } from "react-redux";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";

import {
  fetchRooms,
  fetchLights,
  initializeApp,
  resetApp,
  createUser,
  setActiveLight
} from "../actions";
import Menu from "./Menu";
import Info from './Info';
import RoomsList from "./RoomsList";
import LightsList from "./LightsList";
import ColorPicker from "./ColorPicker";
import Setup from "./Setup";
import ScenesList from "./ScenesList";

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  renderControls() {
    return (
      <div className="four wide column">
        {this.props.active.light || this.props.active.room ? (
          <ColorPicker />
        ) : null}
        {this.props.active.room ? <ScenesList /> : null}
      </div>
    );
  }

  render() {
    return (
      <div className="ui segment">
        <div
          className="ui grid"
          style={{ overflowY: "hidden", height: "100vh" }}
        >
          <div className="four wide column">
            <Menu location={this.props.location} />
            <Info />
          </div>
          <div
            className="eight wide column"
            style={{ overflowY: "auto", height: "100%" }}
            onClick={() => this.props.setActiveLight(null)}
          >
            <Switch>
              <Route path="/rooms" exact component={RoomsList} />
              <Route path="/lights" exact component={LightsList} />
              <Route path="/schedules" exact />
              <Route path="/rules" exact />
              <Route path="/sensors" exact />
              <Route path="/setup" exact component={Setup} />
              <Redirect to={this.props.init ? "/lights" : "/setup"} />;
            </Switch>
          </div>
          {this.renderControls()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.rooms,
    lights: state.lights,
    init: state.init,
    active: state.active
  };
};

export default withRouter(
  connect(mapStateToProps, {
    fetchRooms,
    fetchLights,
    setActiveLight,
    initializeApp,
    createUser
  })(App)
);
