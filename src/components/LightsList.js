import React from "react";
import { connect } from "react-redux";
import {
  fetchLights,
  alertLight,
  toggleLight,
  setActiveLight
} from "../actions";
import LightItem from "./LightItem";

class LightsList extends React.Component {
  componentDidMount() {
    this.props.fetchLights();
  }

  // componentDidUpdate() {
  //   this.props.fetchLights();
  // }

  renderItems() {
    return this.props.lights.map(light => {
      return (
        <LightItem
          key={light.id}
          light={light}
          toggle={this.props.toggleLight}
          alert={this.props.alertLight}
          active={this.props.active ? light.id == this.props.active.id : false}
          onSelect={this.props.setActiveLight}
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
    lights: state.lights,
    active: state.active.light
  };
};

export default connect(
  mapStateToProps,
  { fetchLights, alertLight, toggleLight, setActiveLight }
)(LightsList);
