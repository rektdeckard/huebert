import React from "react";
import { connect } from "react-redux";

import CenterPanel from "../CenterPanel";
import ToolPanel from "../ToolPanel";
import SchedulesList from './SchedulesList';
import { fetchSchedules } from "../../actions";
import RulesList from "./RulesList";

const RoutinesView = ({ schedules, rules, theme }) => {
  return (
    <>
      <CenterPanel>
        <SchedulesList theme={theme} schedules={schedules} />
        <RulesList theme={theme} rules={rules} />
      </CenterPanel>
      <ToolPanel></ToolPanel>
    </>
  );
};

const mapStateToProps = state => {
  return {
    schedules: state.schedules,
    rules: state.rules,
    theme: state.settings.theme
  };
};

export default connect(mapStateToProps, { fetchSchedules })(RoutinesView);
