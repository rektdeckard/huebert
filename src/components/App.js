import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";

import {
  fetchRooms,
  fetchLights,
  initializeApp,
  resetApp,
  createUser,
  setActiveLight,
  setTheme, 
  setView
} from "../actions";
import Menu from "./Menu";
import Info from "./Info";
import RoomsList from "./RoomsList";
import LightsList from "./LightsList";
import ScenesList from "./ScenesList";
import RulesList from "./RulesList";
import ColorPicker from "./ColorPicker";
import Setup from "./Setup";
import useRefresh from "../hooks/useRefresh";
import LightsTable from "./LightsTable";
import GroupsView from "./GroupsView";

const App = props => {
  // FIXME: Shoule use the fetchAll() function, once I make it
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
    <div
      style={{
        padding: 16,
        backgroundColor: props.init.theme === "inverted" ? "#080808" : "white"
      }}
    >
      <div
        className="ui grid"
        style={{ overflowY: "hidden", height: "99.5vh" }}
      >
        <div className="four wide column">
          <Menu location={props.location} />
          <Info />
          <div className={`ui ${props.init.theme} segment`}>
            <div
              className={`ui mini ${
                props.init.theme === "inverted" ? "secondary" : "basic"
              } icon buttons`}
            >
              <button 
                className={`ui ${props.init.view !== "card" ? "active" : null} button`}
                onClick={() => props.setView(null)}
              >
                <i className="list ul icon"></i>
              </button>
              <button
                className={`ui ${props.init.view === "card" ? "active" : null} button`}
                onClick={() => props.setView("card")}
              >
                <i className="th icon"></i>
              </button>
            </div>
            <div
              className={`ui mini right floated 
                ${props.init.theme === "inverted" ? "secondary" : "basic"} 
                icon buttons`
              }
            >
              <button 
                className={`ui ${props.init.theme === "inverted" ? "active" : null} button`}
                onClick={() =>
                  props.setTheme(props.init.theme ? null : "inverted")
                }
              >
                <i className="adjust icon"></i>
              </button>
            </div>
            {/* <div className={`ui mini ${props.init.theme} slider checkbox`}>
              <input
                type="checkbox"
                checked={props.init.theme === "inverted"}
                onChange={() =>
                  props.setTheme(props.init.theme ? null : "inverted")
                }
              />
              <label>DARK MODE</label>
            </div> */}
          </div>
        </div>
        <div
          className="eight wide column"
          style={{ overflowY: "auto", height: "100%" }}
          onClick={() => props.setActiveLight(null)}
        >
          <Switch>
            <Route path="/rooms" exact component={RoomsList} />
            <Route path="/lights" exact component={GroupsView} />
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
    createUser,
    setTheme,
    setView
  })(App)
);
