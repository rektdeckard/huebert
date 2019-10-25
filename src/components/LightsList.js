import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { fetchLights, setLight, alertLight, toggleLight } from "../actions";
import LightItem from "./LightItem";

class LightsList extends React.Component {
  componentDidMount() {
    this.props.fetchLights();
  }

  renderItems() {
    return this.props.lights.map(light => {
      return (
        <LightItem
          key={light.id}
          light={light}
          toggle={this.props.toggleLight}
          alert={this.props.alertLight}
        />
      );
    });
  }

  render() {
    return (
      <div className="ui three stackable link cards">
        {this.props.lights ? this.renderItems() : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    lights: state.lights
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { fetchLights, setLight, alertLight, toggleLight }
  )(LightsList)
);
