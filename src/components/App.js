import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";

import { fetchRooms, initializeApp, setTheme } from "../actions";
import Menu from "./Menu";
import Info from "./Info";
import RoomsList from "./RoomsList";
import RulesList from "./RulesList";
import Setup from "./Setup";
import useRefresh from "../hooks/useRefresh";
import GroupsView from "./home/GroupsView";
import ToolPanel from "./ToolPanel";

const INVERTED = "inverted";

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
        padding: 24,
        backgroundColor: props.init.theme === INVERTED ? "#080808" : "white"
      }}
    >
      <div
        className="ui grid"
        style={{ overflowY: "hidden", height: "99.5vh" }}
      >
        <ToolPanel>
          <Menu location={props.location} />
          <Info />
          <div className={`ui ${props.init.theme} mini icon menu`}>
            <a
              className={`${
                props.init.theme === INVERTED ? "active" : null
              } item`}
              title="Toggle Dark Mode"
              onClick={() =>
                props.setTheme(
                  props.init.theme === INVERTED ? null : INVERTED
                )
              }
            >
              <i className="adjust icon"></i>
            </a>
          </div>
        </ToolPanel>
        <Switch>
          <Route path="/home" exact component={GroupsView} />
          <Route path="/rooms" exact component={RoomsList} />
          <Route path="/schedules" exact />
          <Route path="/rules" exact component={RulesList} />
          <Route path="/sensors" exact />
          <Route path="/settings" exact component={Setup} />
          <Redirect to={props.init.ip ? "/lights" : "/settings"} />;
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { init: state.init };
};

export default withRouter(
  connect(mapStateToProps, {
    fetchRooms,
    initializeApp,
    setTheme
  })(App)
);
