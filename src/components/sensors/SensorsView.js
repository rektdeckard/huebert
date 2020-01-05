import React, { useState } from "react";
import { connect } from "react-redux";

import { toggleSensor, configureSensor } from "../../actions";
import * as Device from "../../devices";
import CenterPanel from "../CenterPanel";
import ToolPanel from "../ToolPanel";
import GenericSensorItem from "./GenericSensorItem";
import MotionSensorItem from "./MotionSensorItem";
import DimmerSwitchItem from "./DimmerSwitchItem";

const SensorsView = ({ sensors, settings, toggleSensor, configureSensor }) => {
  const renderTables = () => {
    return sensors
      .filter(s => Device[s.type] !== null)
      .map(s => {
        switch (s.type) {
          case Device.HUE_DIMMER_SWITCH:
            return (
              <DimmerSwitchItem
                sensor={s}
                settings={settings}
                onToggle={toggleSensor}
                key={s.id}
              />
            );
          case Device.HUE_TAP_SWITCH:
          case Device.HUE_SMART_BUTTON:
          case Device.HUE_SMART_PLUG:
          case Device.HUE_MOTION_SENSOR:
            return (
              <MotionSensorItem
                sensor={s}
                settings={settings}
                onAdjust={configureSensor}
                onToggle={toggleSensor}
                key={s.id}
              />
            );
          case Device.HUE_AMBIENT_LIGHT_SENSOR:
          case Device.HUE_TEMPERATURE_SENSOR:
          default:
            return;
            // return (
            //   <GenericSensorItem
            //     sensor={s}
            //     settings={settings}
            //     onToggle={toggleSensor}
            //     key={s.id}
            //   />
            // );
        }
      });
  };

  return (
    <>
      <CenterPanel>{renderTables()}</CenterPanel>
      <ToolPanel></ToolPanel>
    </>
  );
};

const mapStateToProps = state => {
  return { sensors: state.sensors, settings: state.settings };
};

export default connect(mapStateToProps, { toggleSensor, configureSensor })(
  SensorsView
);
