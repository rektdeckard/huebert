import React from "react";
import { connect } from "react-redux";
import { fetchLights } from "../actions";
import Hue from "../api/Hue";
import { colorTemperature2rgb } from "color-temperature";
import { miredToKelvin } from "mired";

class LightsList extends React.Component {
  componentDidMount() {
    this.props.fetchLights();
  }

  renderItems() {
    return this.props.lights.map(light => {
      const hue = Math.round(light.state.hue / 182.041667);
      const sat = Math.round(light.state.sat / 2.54);
      const val = Math.round(light.state.bri / 2.54);

      let color;
      if (hue) {
        color = `hsl(${hue}, ${sat}%, ${val}%)`;
      } else {
        const rgb = colorTemperature2rgb(miredToKelvin(light.state.ct));
        color = `rgb(${rgb.red},${rgb.green},${rgb.blue})`;
      }

      // const getIcon = () => {
      //   switch (room.class) {
      //     case "Living room":
      //       return "home";
      //     case "Bedroom":
      //       return "bed";
      //     case "Kitchen":
      //       return "utensils";
      //     default:
      //       return "lightbulb";
      //   }
      // }

      return (
        <div
          className="card"
          key={light.id}
          onClick={() =>
            Hue.put(`/lights/${light.id}/state`, { alert: "select" })
          }
        >
          <div className="fluid image">
            <div
              style={{ height: 222, width: 222, backgroundColor: color }}
            />
          </div>
          <div className="content">
            <div className="header">{light.name}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    console.log(this.props.lights);
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

export default connect(
  mapStateToProps,
  { fetchLights }
)(LightsList);
