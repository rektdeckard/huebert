import React, { useState } from "react";
import {
  Table,
  Checkbox,
  Icon,
  Label,
  Form,
  Dropdown
} from "semantic-ui-react";

export default ({ sensor, settings, onToggle }) => {
  const [expanded, setExpanded] = useState(false);
  const batteryLevel =
    sensor.config.battery > 75
      ? "full"
      : sensor.config.battery > 50
      ? "three quarters"
      : sensor.config.battery > 25
      ? "quarter"
      : "empty";

  const handleExpand = event => {
    setExpanded(!expanded);
    event.stopPropagation();
  };

  const renderRows = () => (
    <>
      <Table.Row
        cells={[
          { key: 0, content: "Last Triggered" },
          { key: 1, content: sensor.state.lastupdated ? Date(sensor.state.lastupdated).split("GMT")[0] : null },
          { key: 2, content: sensor.state.buttonevent }
        ]}
      />

      <Table.Row
        cells={[
          { key: 0, content: "Battery Level" },
          { key: 1, content: null },
          { key: 2, content: sensor.config.battery }
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
            <Label as="a" color="teal" image onClick={handleExpand}>
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
