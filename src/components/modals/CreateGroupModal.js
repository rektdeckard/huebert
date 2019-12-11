import React, { useState } from "react";
import { Modal, Form, Divider } from "semantic-ui-react";
import { connect } from "react-redux";
import { createGroup } from "../../actions";

const CreateGroupModal = ({ trigger, lights, theme, createGroup }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState(null);
  const [selected, setSelected] = useState([]);

  // Lights already assigned to a Room cannot be assigned to another
  const assigned = [];

  const handleCreate = () => {
    const newGroup = {
      name,
      type,
      lights: selected
    };
    createGroup(newGroup);
  };

  return (
    <Modal
      size="small"
      as={Form}
      dimmer={theme === "inverted" ? true : "inverted"}
      trigger={trigger}
      header="Create Group"
      content={
        <Modal.Content>
          <Modal.Description>
            <b>Note</b>: Lights can only belong to a single{" "}
            <i>
              <code>Room</code>
            </i>{" "}
            at a time. A{" "}
            <i>
              <code>Zone</code>
            </i>{" "}
            can group lights from multiple rooms, or within a certain area of a
            room. A{" "}
            <i>
              <code>LightGroup</code>
            </i>{" "}
            is similar to a Zone, but will not appear in other Hue applications.
          </Modal.Description>
          <Divider />
          <Form.Group widths="equal">
            <Form.Input
              name="group"
              label="Group Name"
              placeholder="Enter name"
              required
              onChange={(e, { value }) => setName(value)}
            />
            <Form.Select
              name="type"
              label="Type"
              placeholder="Select type"
              required
              options={[
                { key: "l", text: "LightGroup", value: "LightGroup" },
                { key: "r", text: "Room", value: "Room" },
                { key: "z", text: "Zone", value: "Zone" },
                {
                  key: "e",
                  text: "Entertainment",
                  value: "Entertainment",
                  disabled: true
                }
              ]}
              onChange={(e, { value }) => setType(value)}
            />
          </Form.Group>
          <Form.Dropdown
            name="lights"
            label="Lights"
            placeholder="Select lights"
            search
            multiple
            selection
            required={type === "Room"}
            options={lights
              .filter(it => !assigned.includes(it))
              .map(light => {
                return { text: light.name, value: light.id };
              })}
            onChange={(e, { value }) => setSelected(value)}
          />
        </Modal.Content>
      }
      actions={[
        "Cancel",
        {
          key: "done",
          content: "Save",
          positive: true,
          disabled:
            name.length === 0 ||
            !type ||
            (type === "Room" && selected.length === 0),
          onClick: handleCreate
        }
      ]}
    />
  );
};

export default connect(null, { createGroup })(CreateGroupModal);
