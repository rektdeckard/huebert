import React from "react";
import { connect } from "react-redux";
import { fetchRooms } from "../actions";
import Hue from "../api/Hue";
import { colorTemperature2rgb } from "color-temperature";
import { miredToKelvin } from "mired";

class RoomsList extends React.Component {
  componentDidMount() {
    this.props.fetchRooms();
  }

  renderItems() {
    return this.props.rooms.map(room => {
      const hue = Math.round(room.action.hue / 182.041667);
      const sat = Math.round(room.action.sat / 2.54);
      const val = Math.round(room.action.bri / 2.54);

      let color;
      if (hue) {
        color = `hsl(${hue}, ${sat}%, ${val}%)`;
      } else {
        const rgb = colorTemperature2rgb(miredToKelvin(room.action.ct));
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
          key={room.id}
          onClick={() =>
            Hue.put(`/lights/${room.lights[0]}/state`, { alert: "select" })
          }
        >
          <div className="fluid image">
            <div
              style={{ height: 222, width: 222, backgroundColor: color }}
            />
          </div>
          <div className="content">
            <div className="header">{room.name}</div>
          </div>
        </div>
      );
    });
  }

  render() {
    console.log(this.props.rooms);
    return (
      <div className="ui three stackable link cards">
        {this.props.rooms ? this.renderItems() : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    rooms: state.rooms
  };
};

export default connect(
  mapStateToProps,
  { fetchRooms }
)(RoomsList);
