import React, { useState } from "react";
import {
  Table,
  Checkbox,
  Icon,
  Label,
  Form,
  Dropdown
} from "semantic-ui-react";
import useThrottled from "../../hooks/useThrottled";

export default ({ sensor, settings, onToggle, onAdjust }) => {
  const [expanded, setExpanded] = useState(false);
  const batteryLevel =
    sensor.config.battery > 75
      ? "full"
      : sensor.config.battery > 50
      ? "three quarters"
      : sensor.config.battery > 25
      ? "quarter"
      : "empty";
  const sensitivityOptions = [
    ...new Array(sensor.config.sensitivitymax + 1)
  ].map((v, i) => ({ key: i, text: i, value: i }));

  const handleExpand = event => {
    setExpanded(!expanded);
    event.stopPropagation();
  };

  const onChangeSensitivity = useThrottled(
    sensitivity => {
      onAdjust(sensor.id, { sensitivity });
    },
    1000,
    []
  );

  const onToggleIndicator = useThrottled(
    () => {
      onAdjust(sensor.id, { ledindication: !sensor.config.ledindication });
    },
    1000,
    []
  );

  const renderRows = () => (
    <>
      <Table.Row
        cells={[
          { key: 0, content: "Last Triggered" },
          { key: 1, content: Date(sensor.state.lastupdated).split("GMT")[0] },
          {
            key: 2,
            content: <Icon name={sensor.state.presence ? "eye" : "eye slash"} />
          }
        ]}
      />

      <Table.Row
        cells={[
          { key: 0, content: "Battery Level" },
          { key: 1, content: null },
          { key: 2, content: sensor.config.battery }
        ]}
      />

      <Table.Row
        cells={[
          { key: 0, content: "Sensitivity" },
          { key: 1, content: null },
          {
            key: 2,
            content: (
              <Dropdown
                size="small"
                className="middle aligned"
                inline
                value={sensor.config.sensitivity}
                options={sensitivityOptions}
                onChange={(e, { value }) => onChangeSensitivity(value)}
              />
            )
          }
        ]}
      />

      <Table.Row
        cells={[
          { key: 0, content: "LED Indicator" },
          { key: 1, content: null },
          {
            key: 2,
            content: (
              <Checkbox
                className="middle aligned"
                label=""
                checked={sensor.config.ledindication}
                onChange={onToggleIndicator}
              />
            )
          }
        ]}
      />
    </>
  );

  return (
    <Table
      size="small"
      compact
      singleLine
      striped
      inverted={settings.theme === "inverted"}
    >
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Icon
              name={`caret ${expanded ? "down" : "right"}`}
              style={{ cursor: "pointer" }}
              onClick={handleExpand}
            />
            <Label as="a" color="purple" image onClick={handleExpand}>
              {sensor.name}
              <Label.Detail>
                <Icon name={`battery ${batteryLevel}`} />
              </Label.Detail>
            </Label>
          </Table.HeaderCell>
          <Table.HeaderCell style={{ width: "40%" }}>
            {/* <Icon name={`battery ${batteryLevel}`} /> */}
          </Table.HeaderCell>
          <Table.HeaderCell collapsing>
            <Checkbox
              className="middle aligned"
              toggle
              label={""}
              disabled={!sensor.config.reachable}
              checked={sensor.config.on}
              onChange={() => onToggle(sensor)}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{expanded ? renderRows() : null}</Table.Body>
    </Table>
  );
};
