import React, { useRef } from "react";
import { Table, Label, Icon, Form, Checkbox } from "semantic-ui-react";
import { convertHSBToColor, compatibleText } from "../../utils";
import "./LightRow.css"

const LightRow = ({
  light,
  group,
  active,
  setLight,
  setActiveLight,
  alertLight,
  toggleLight
}) => {
  const color = convertHSBToColor(light.state);
  const textColor = compatibleText(color);

  const throttle = useRef(null);
  const onChangeBrightness = bri => {
    if (throttle.current !== null) {
      return;
    }

    throttle.current = bri;
    setLight({ ...light, state: { bri } });
    setTimeout(() => {
      throttle.current = null;
    }, 100);
  };

  const handleClick = event => {
    event.ctrlKey ? alertLight(light) : setActiveLight(light, group);
    event.stopPropagation();
  };

  const renderCheckbox = () => (
      <Checkbox className="middle aligned" fitted />
  );

  return (
    <Table.Row
      style={active ? { backgroundColor: "#AAAAAA24" } : null}
      // className={active ? "left marked secondary" : null}
      onClick={handleClick}
    >
      <Table.Cell>
        {false ? renderCheckbox() : null}
        <Label
          style={{
            color: textColor,
            marginLeft: 32,
            backgroundColor: `${convertHSBToColor(light.state)}`
          }}
          content={light.name}
        />
      </Table.Cell>
      <Table.Cell>
        <Form>
          <Form.Field disabled={!light.state.reachable}>
            <div className="slidecontainer">
              <input
                className="middle aligned slide"
                type="range"
                min={1}
                max={254}
                value={light.state.bri}
                onChange={event => onChangeBrightness(Number(event.target.value))}
              />
            </div>
          </Form.Field>
        </Form>
      </Table.Cell>
      <Table.Cell>
        <Checkbox
          className="middle aligned"
          toggle
          checked={light.state.on && light.state.reachable}
          onChange={() => toggleLight(light)}
          disabled={!light.state.reachable}
        />
      </Table.Cell>
    </Table.Row>
  );
};

export default LightRow;
