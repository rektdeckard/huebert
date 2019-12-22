import React, { useRef } from "react";
import SketchPicker from "./picker/components/sketch/Sketch";
import { connect } from "react-redux";
import { Segment, Label, Dimmer } from "semantic-ui-react";

import { setLight, setGroup } from "../actions";
import {
  convertHSBToColor,
  convertHSVToHSB,
  convertHSVToCT,
  isAdjustable
} from "../utils";

const LIGHT_ELEMENT = 100;
const GROUP_ELEMENT = 500;

const ColorPicker = ({ active, setLight, setGroup, theme }) => {
  // Throttle calls to handleChange()
  let bufferedColor = useRef(null);

  // if (!isAdjustable(active?.action || active?.state)) {
  //   return null;
  // }

  const type = active ? (active.action ? GROUP_ELEMENT : LIGHT_ELEMENT) : null;

  const extractColor = () => {
    switch (type) {
      case LIGHT_ELEMENT:
        return convertHSBToColor(active.state);
      case GROUP_ELEMENT:
        return convertHSBToColor(active.action);
      default:
        return "#2185D0";
    }
  };

  const handleChange = (color, event) => {
    if (bufferedColor.current !== null) {
      return;
    }
    bufferedColor.current = color;

    switch (type) {
      case LIGHT_ELEMENT:
        if (active.state.hue) {
          const { hue, sat, bri } = convertHSVToHSB(color);
          setLight({ id: active.id, state: { hue, sat, bri } });
        } else {
          const { ct, bri } = convertHSVToCT(color);
          setLight({ id: active.id, state: { ct, bri } });
        }
        break;
      case GROUP_ELEMENT:
        const { hue, sat, bri } = convertHSVToHSB(color);
        const newGroup = { id: active.id, action: { hue, sat, bri } };
        setGroup(newGroup);
        break;
      default:
        break;
    }

    setTimeout(() => {
      bufferedColor.current = null;
    }, type);
  };

  return (
    <Dimmer.Dimmable
      as={Segment}
      dimmed={true}
      inverted={theme === "inverted"}
    >
      {/* <Segment inverted={theme === "inverted"}> */}
      <Label
        attached="top"
        color={theme === "inverted" ? "black" : null}
        content={active?.name.toUpperCase() ?? "COLOR"}
      />
      <SketchPicker
        width={null}
        color={extractColor()}
        onChange={handleChange}
        disableAlpha
      />
      <Dimmer
        active={!active}
        inverted={theme !== "inverted"}
      />
      {/* </Segment> */}
    </Dimmer.Dimmable>
  );
};

const mapStateToProps = state => {
  return {
    active: state.active?.light ?? state.active.group,
    theme: state.settings.theme
  };
};

export default connect(mapStateToProps, { setLight, setGroup })(ColorPicker);
