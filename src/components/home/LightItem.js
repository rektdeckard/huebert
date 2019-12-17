import React, { useRef } from "react";
import { Card, Icon, Checkbox } from "semantic-ui-react";
import { convertHSBToColor, compatibleText } from "../../utils";

const LightItem = ({
  light,
  group,
  toggle,
  alert,
  active,
  onSelect,
  onDim
}) => {
  const color = convertHSBToColor(light.state);
  const textColor = compatibleText(color);

  // Throttle calls to onChangeBrightness()
  const throttle = useRef(null);
  const onChangeBrightness = bri => {
    if (throttle.current !== null) {
      return;
    }

    throttle.current = bri;
    onDim({ ...light, state: { bri } });
    setTimeout(() => {
      throttle.current = null;
    }, 100);
  };

  const handleSelect = event => {
    onSelect(light, group);
    event.stopPropagation();
  };

  const handleAlert = event => {
    if (event.ctrlKey) {
      alert(light);
      event.stopPropagation();
    }
  };

  return (
    <Card style={{ backgroundColor: color }} onClick={handleSelect}>
      <Card.Content>
        <div
          style={{ color: textColor, opacity: 0.7, userSelect: "none" }}
          onClick={handleAlert}
        >
          {light.name}
          <Icon
            className="right floated"
            name={active ? "check" : null}
            style={{ color: textColor, opacity: 0.7 }}
          />
        </div>
      </Card.Content>
      <Card.Content style={{ backgroundColor: "#FFFFFF48" }}>
        <div className="slidecontainer">
          <input
            className="slide"
            type="range"
            min={1}
            max={254}
            value={light.state.bri}
            onChange={event => onChangeBrightness(Number(event.target.value))}
          />
        </div>
      </Card.Content>
      <Card.Content style={{ backgroundColor: "#FFFFFF48" }}>
        <Checkbox
          className="right floated"
          fitted
          toggle
          checked={light.state.on}
          onChange={() => toggle(light)}
          disabled={!light.state.reachable}
        />
      </Card.Content>
    </Card>
  );
};

export default LightItem;
