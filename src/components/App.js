import React from "react";
import { connect } from "react-redux";
import { withRouter, Switch, Route, Link, Redirect } from "react-router-dom";

import { fetchRooms, fetchLights } from "../actions";
import Menu from './Menu';
import RoomsList from "./RoomsList";
import LightsList from "./LightsList";
import ColorPicker from "./ColorPicker";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchRooms();
    this.props.fetchLights();
  }

  render() {
    return (
      <div className="ui segment">
        <div className="ui grid">
          <Menu location={this.props.location}/>
          <div className="eight wide column">
            <Switch>
              <Route path="/rooms" exact component={RoomsList} />
              <Route path="/lights" exact component={LightsList} />
              <Route path="/picker" component={ColorPicker} />
              <Redirect to="/lights" />
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
    lights: state.lights
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchRooms, fetchLights }
  )(App)
);
