import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";

import { fetchGroups, initializeApp, setTheme } from "../actions";
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
  // FIXME: Should use the fetchAll() function, once I make it
  const { refresh, cancel } = useRefresh(props.fetchGroups, 5000);

  useEffect(() => {
    props.initializeApp();
    refresh();

    return cancel;
  }, []);

  return (
    <div
      style={{
        padding: 16,
        backgroundColor: props.settings.theme === INVERTED ? "#080808" : "white"
      }}
    >
      <div
        className="ui grid"
        style={{ overflowY: "hidden", height: "99.5vh" }}
      >
        <ToolPanel>
          <Menu location={props.location} />
          <Info />
          <div className={`ui ${props.settings.theme} mini icon menu`}>
            <div
              className={`${
                props.settings.theme === INVERTED ? "active" : null
              } link item`}
              title="Toggle Dark Mode"
              onClick={() =>
                props.setTheme(
                  props.settings.theme === INVERTED ? null : INVERTED
                )
              }
            >
              <i className="adjust icon"></i>
            </div>
          </div>
        </ToolPanel>
        <Switch>
          <Route exact path="/" component={GroupsView} />
          <Route exact path="/groups" component={RoomsList} />
          <Route exact path="/schedules" />
          <Route exact path="/rules" component={RulesList} />
          <Route exact path="/sensors" />
          <Route exact path="/settings" component={Setup} />
          <Redirect to={!props.settings.config ? "/" : "/settings"} />
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { settings: state.settings };
};

export default withRouter(
  connect(mapStateToProps, {
    fetchGroups,
    initializeApp,
    setTheme
  })(App)
);
