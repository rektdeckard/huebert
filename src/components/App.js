import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";

import {
  fetchRooms,
  fetchLights,
  initializeApp,
  createUser,
  setActiveLight,
  setTheme,
  setView
} from "../actions";
import Menu from "./Menu";
import Info from "./Info";
import RoomsList from "./RoomsList";
import RulesList from "./RulesList";
import Setup from "./Setup";
import useRefresh from "../hooks/useRefresh";
import GroupsView from "./GroupsView";
import ToolPanel from './ToolPanel';

const App = props => {
  // FIXME: Shoule use the fetchAll() function, once I make it
  const { refresh, cancel } = useRefresh(props.fetchRooms, 5000);

  useEffect(() => {
    props.initializeApp();
    refresh();
    return cancel;
  }, []);

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
        <ToolPanel>
          <Menu location={props.location} />
          <Info />
          <div className={`ui ${props.init.theme} segment`}>
            <div
              className={`ui mini ${
                props.init.theme === "inverted" ? "secondary" : "basic"
              } icon buttons`}
            >
              <button
                className={`ui ${
                  props.init.view !== "card" ? "active" : null
                } button`}
                onClick={() => props.setView(null)}
              >
                <i className="list ul icon"></i>
              </button>
              <button
                className={`ui ${
                  props.init.view === "card" ? "active" : null
                } button`}
                onClick={() => props.setView("card")}
              >
                <i className="th icon"></i>
              </button>
            </div>
            <div
              className={`ui mini right floated 
                ${props.init.theme === "inverted" ? "secondary" : "basic"} 
                icon buttons`}
            >
              <button
                className={`ui ${
                  props.init.theme === "inverted" ? "active" : null
                } button`}
                onClick={() =>
                  props.setTheme(
                    props.init.theme === "inverted" ? null : "inverted"
                  )
                }
              >
                <i className="adjust icon"></i>
              </button>
            </div>
          </div>
        </ToolPanel>
        <Switch>
          <Route path="/lights" exact component={GroupsView} />
          <Route path="/rooms" exact component={RoomsList} />
          <Route path="/schedules" exact />
          <Route path="/rules" exact component={RulesList} />
          <Route path="/sensors" exact />
          <Route path="/setup" exact component={Setup} />
          <Redirect to={props.init.ip ? "/lights" : "/setup"} />;
        </Switch>
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
