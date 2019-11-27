import React, { useEffect } from "react";
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
import Info from "./Info";
import RoomsList from "./RoomsList";
import LightsList from "./LightsList";
import ScenesList from "./ScenesList";
import RulesList from './RulesList';
import ColorPicker from "./ColorPicker";
import Setup from "./Setup";
import useRefresh from "../hooks/useRefresh";

const App = props => {
  const { refresh, cancel } = useRefresh(props.fetchRooms, 5000);

  useEffect(() => {
    props.initializeApp();
    refresh();
    return cancel;
  }, []);

  const renderControls = () => {
    return (
      <div className="four wide column">
          {props.active.light || props.active.room ? <ColorPicker /> : null}
          {props.active.room ? <ScenesList /> : null}
      </div>
    );
  };

  return (
    <div className="ui segment">
      <div className="ui grid" style={{ overflowY: "hidden", height: "100vh" }}>
        <div className="four wide column">
          <Menu location={props.location} />
          <Info />
        </div>
        <div
          className="eight wide column"
          style={{ overflowY: "auto", height: "100%" }}
          onClick={() => props.setActiveLight(null)}
        >
          <Switch>
            <Route path="/rooms" exact component={RoomsList} />
            <Route path="/lights" exact component={LightsList} />
            <Route path="/schedules" exact />
            <Route path="/rules" exact component={RulesList} />
            <Route path="/sensors" exact />
            <Route path="/setup" exact component={Setup} />
            <Redirect to={props.init.ip ? "/lights" : "/setup"} />;
          </Switch>
        </div>
        {renderControls()}
      </div>
    </div>
  );
};

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
