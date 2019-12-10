import React from "react";
import { Modal, Form, Menu } from "semantic-ui-react";

const CreateGroupModal = ({ trigger, lights, theme, onsubmit }) => {
  return (
    <Modal
      size="small"
      as={Form}
      dimmer={theme === "inverted" ? true : "inverted"}
      trigger={trigger}
      header={{ icon: "plus", content: "Create Group" }}
      content={
        <Modal.Content>
          <Form.Group widths="equal">
            <Form.Input
              name="group"
              label="Group Name"
              placeholder="My Group"
            />
            <Form.Select
              name="type"
              label="Type"
              placeholder="LightGroup"
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
            />
          </Form.Group>
          <Form.Dropdown
            name="lights"
            label="Lights"
            placeholder="Select Lights"
            search
            multiple
            selection
            options={lights.map(light => {
              return { text: light.name, value: light.id };
            })}
          />
        </Modal.Content>
      }
      actions={[
        "Cancel",
        {
          key: "done",
          content: "Save",
          positive: true,
          onClick: onsubmit
        }
      ]}
    />
  );
};

export default CreateGroupModal;
