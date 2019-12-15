import React, { useState, useEffect } from "react";
import { Modal, Form, Divider, Message } from "semantic-ui-react";
import { connect } from "react-redux";
import { createGroup } from "../../actions";

const CreateGroupModal = ({ triggerView, lights, groups, theme, createGroup, version }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [assigned, setAssigned] = useState([]);

  const [name, setName] = useState("");
  const [type, setType] = useState(null);
  const [clazz, setClazz] = useState(null);
  const [selected, setSelected] = useState([]);

  // Lights already assigned to a Room cannot be assigned to another
  useEffect(() => {
    setAssigned([...new Set(groups.map(group => group.lights).flat())]);
  }, [groups])

  const handleCreate = async event => {
    event.preventDefault();
    event.stopPropagation();
    const newGroup = {
      name,
      type,
      lights: selected
    };

    if (type === "Room") {
      newGroup.class = clazz;
    }

    const response = await createGroup(newGroup);
    console.log(response);
    if (response.success) {
      cleanup();
    } else {
      setError(response.error);
    }
  };

  const cleanup = () => {
    setName("");
    setType(null);
    setClazz(null);
    setSelected([]);
    setError(null);
    setOpen(false);
  };

  return (
    <Modal
      size="small"
      as={Form}
      dimmer={theme === "inverted" ? true : "inverted"}
      trigger={<triggerView.type {...triggerView.props} onClick={() => setOpen(true)} />}
      open={open}
      onActionClick={(event, data) => { if (data.key === "cancel") cleanup(); }}
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
              value={name}
              onChange={(e, { value }) => setName(value)}
            />
            <Form.Select
              name="type"
              label="Type"
              placeholder="Select type"
              required
              options={[
                { key: "l", text: "LightGroup", value: "LightGroup" },
                { 
                  key: "r",
                  text: "Room",
                  value: "Room",
                  disabled: version < 111 
                },
                { 
                  key: "z",
                  text: "Zone",
                  value: "Zone",
                  disabled: version < 130
                },
                {
                  key: "e",
                  text: "Entertainment",
                  value: "Entertainment",
                  disabled: true || version < 122
                }
              ]}
              value={type}
              onChange={(e, { value }) => setType(value)}
            />
            <Form.Select
              name="class"
              label="Class"
              search
              disabled={type !== "Room"}
              required={type === "Room"}
              placeholder="Select class"
              options={[
                { key: 1, text: "Living room", value: "Living room" },
                { key: 2, text: "Kitchen", value: "Kitchen" },
                { key: 3, text: "Dining", value: "Dining" },
                { key: 4, text: "Bedroom", value: "Bedroom" },
                { key: 5, text: "Kids bedroom", value: "Kids bedroom" },
                { key: 6, text: "Bathroom", value: "Bathroom" },
                { key: 7, text: "Nursery", value: "Nursery" },
                { key: 8, text: "Recreation", value: "Recreation" },
                { key: 9, text: "Office", value: "Office" },
                { key: 10, text: "Gym", value: "Gym" },
                { key: 11, text: "Hallway", value: "Hallway" },
                { key: 12, text: "Toilet", value: "Toilet" },
                { key: 13, text: "Front door", value: "Front door" },
                { key: 14, text: "Garage", value: "Garage" },
                { key: 15, text: "Terrace", value: "Terrace" },
                { key: 16, text: "Garden", value: "Garden" },
                { key: 17, text: "Driveway", value: "Driveway" },
                { key: 18, text: "Carport", value: "Carport" },
                { key: 19, text: "Other", value: "Other" }
              ]}
              value={clazz}
              onChange={(e, { value }) => setClazz(value)}
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
              .filter(it => type === "Room" ? !assigned.includes(it.id) : true)
              .map(light => {
                return { text: light.name, value: light.id };
              })}
            onChange={(e, { value }) => setSelected(value)}
          />
          <Message size="tiny" negative hidden={error == null} content={error} />
        </Modal.Content>
      }
      actions={[
        {
          key: "cancel",
          content: "Cancel",
          onClick: cleanup
        },
        {
          key: "done",
          content: "Save",
          positive: true,
          disabled:
            name.length === 0 ||
            !type ||
            (type !== "Zone" && selected.length === 0),
          onClick: handleCreate
        }
      ]}
    />
  );
};

const mapStateToProps = state => {
  return {
    version: state.settings.config
      ? state.settings.config.apiversion.split(".").slice(0, 2).join("")
      : "0",
    groups: state.groups
  };
};

export default connect(mapStateToProps, { createGroup })(CreateGroupModal);
