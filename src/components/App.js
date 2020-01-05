import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";
import { Grid, Menu } from "semantic-ui-react";

import { fetchGroups, initializeApp, setTheme } from "../actions";
import useRefresh from "../hooks/useRefresh";
import ToolPanel from "./ToolPanel";
import NavigationMenu from "./NavigationMenu";
import Info from "./Info";
import HomeView from "./home/HomeView";
import RulesView from "./RulesView";
import SettingsView from "./SettingsView";
import RoutinesView from "./routines/RoutinesView";
import SensorsView from "./sensors/SensorsView";

const INVERTED = "inverted";

const App = props => {
  const { initializeApp, fetchGroups } = props;
  // FIXME: Should use the fetchAll() function, once I make it
  const [ beginRefresh, cancelRefresh ] = useRefresh(fetchGroups, 5000);

  useEffect(() => {
    initializeApp();
    beginRefresh();

    return cancelRefresh;
  }, [initializeApp, beginRefresh, cancelRefresh]);

  return (
    <div
      style={{
        paddingTop: 16,
        paddingLeft: 16,
        paddingRight: 16,
        backgroundColor: props.settings.theme === INVERTED ? "#080808" : "white",
        height: "100vh"
      }}
    >
      <Grid style={{ overflowY: "hidden", height: "100%" }}>
        <ToolPanel>
          <NavigationMenu location={props.location} />
          <Info />
          <Menu inverted={props.settings.theme === INVERTED} size="mini" icon>
            <Menu.Item
              active={props.settings.theme === INVERTED}
              title="Toggle Dark Mode"
              icon="adjust"
              onClick={() =>
                props.setTheme(
                  props.settings.theme === INVERTED ? null : INVERTED
                )
              }
            />
          </Menu>
        </ToolPanel>
        <Switch>
          <Route exact path="/" component={HomeView} />
          <Route exact path="/routines" component={RoutinesView}/>
          <Route exact path="/sensors" component={SensorsView}/>
          <Route exact path="/rules" component={RulesView} />
          <Route exact path="/settings" component={SettingsView} />
          <Redirect to={!props.settings.config ? "/settings" : "/"} />
        </Switch>
      </Grid>
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
