import React from "react";
import { connect } from "react-redux";
import { fetchRooms, setRoom, alertRoom, toggleRoom } from "../actions";
import RoomItem from "./RoomItem";

class RoomsList extends React.Component {
  componentDidMount() {
    this.props.fetchRooms();
  }

  renderItems() {
    return this.props.rooms.map(room => {
      return (
        <RoomItem
          key={room.id}
          room={room}
          alert={this.props.alertRoom}
          toggle={this.props.toggleRoom}
        />
      );
    });
  }

  render() {
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
  { fetchRooms, alertRoom, toggleRoom }
)(RoomsList);
