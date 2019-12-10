import React from "react";
import { connect } from "react-redux";
import { fetchSchedules } from "../actions";

const SchedulesView = ({ schedules }) => {
  return <div>SchedulesList</div>;
};

const mapStateToProps = state => {
  return { rules: state.schedules };
};

export default connect(mapStateToProps, { fetchSchedules })(SchedulesView);
