import React, { useState } from "react";
import { Table, Checkbox, Icon, Label } from "semantic-ui-react";

export default ({ sensor, settings, onToggle }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = event => {
    setExpanded(!expanded);
    event.stopPropagation();
  };

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
            <Label
              fluid="true"
              // style={{
              //   color: "white",
              //   width: "90%",
              //   cursor: "pointer",
              //   backgroundImage: `linear-gradient(to right, ${
              //     colors.length > 1 ? colors : [colors[0], colors[0]]
              //   })`
              // }}
              content={sensor.name}
              // detail={group.lights.length}
            />
          </Table.HeaderCell>
          <Table.HeaderCell style={{ width: "40%" }}>
            <div className="slidecontainer">
              <input
                className="middle aligned slide"
                type="range"
                min={0}
                max={254}
                // value={group.action.bri}
                // onChange={event =>
                //   onChangeBrightness(Number(event.target.value))
                // }
              />
            </div>
          </Table.HeaderCell>
          <Table.HeaderCell collapsing>
            <Checkbox
              className="middle aligned"
              toggle
              label={""}
              checked={sensor.config.on}
              onChange={() => onToggle(sensor)}
            />
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
    </Table>
  );
};
