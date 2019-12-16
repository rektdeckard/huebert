import React, { useState } from "react";
import { connect } from "react-redux";
import { Modal, Form, Divider, Message } from "semantic-ui-react";
import { createScene } from "../../actions";

const CreateSceneModal = ({ trigger, lights, group, theme, createScene }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [type, setType] = useState(null);
  const [recycle, setRecycle] = useState(true);
  const [selected, setSelected] = useState([]);
  const [transition, setTransition] = useState(false);
  const [tenths, setTenths] = useState(4);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);

  const handleCreateScene = async () => {
    const newScene = { name, recycle, type };

    if (type === "GroupScene") newScene["group"] = group.id;
    if (type === "LightScene") newScene["lights"] = selected;

    if (transition)
      newScene["transitiontime"] = tenths + seconds * 10 + minutes * 600;

    const response = await createScene(newScene);
    if (response.success) {
      cleanup();
    } else {
      setError(response.error);
    }
  };

  const cleanup = () => {
    setName("");
    setType(null);
    setRecycle(true);
    setSelected([]);
    setTransition(false);
    setTenths(4);
    setSeconds(0);
    setMinutes(0);
    setError(null);
    setOpen(false);
  };

  return (
    <Modal
      size="small"
      as={Form}
      dimmer={theme === "inverted" ? true : "inverted"}
      trigger={
        <trigger.type {...trigger.props} onClick={() => setOpen(true)} />
      }
      open={open}
      header={`Create Scene for ${group.name}`}
      content={
        <Modal.Content>
          <Modal.Description>
            <b>Note</b>: The scene will be created using the current light
            states.{" "}
            <i>
              <code>GroupScenes</code>
            </i>{" "}
            are only available to the group in which they are created. A{" "}
            <i>
              <code>LightScene</code>
            </i>{" "}
            can contain any non-zero number of lights from any group.
          </Modal.Description>
          <Divider />
          <Form.Group>
            <Form.Input
              name="scene"
              label="Scene Name"
              placeholder="Enter name"
              width="7"
              required
              value={name}
              onChange={(e, { value }) => setName(value)}
            />
            <Form.Select
              name="type"
              label="Type"
              placeholder="Select type"
              width="7"
              required
              options={[
                {
                  key: "g",
                  text: "GroupScene",
                  value: "GroupScene"
                  // disabled: version < 111
                },
                {
                  key: "l",
                  text: "LightScene",
                  value: "LightScene"
                  // disabled: version < 130
                }
              ]}
              value={type}
              onChange={(e, { value }) => setType(value)}
            />
            <Form.Checkbox
              name="recycle"
              label="Recycle"
              width="2"
              checked={recycle}
              onChange={(e, { checked }) => setRecycle(checked)}
            />
          </Form.Group>
          <Form.Dropdown
            name="lights"
            label="Lights"
            placeholder="Select lights"
            search
            multiple
            selection
            required={type === "LightScene"}
            disabled={type === "GroupScene"}
            options={lights.map(light => {
              return { text: light.name, value: light.id };
            })}
            onChange={(e, { value }) => setSelected(value)}
          />
          {/* <Divider /> */}
          <Form.Field inline label="Transition Time" width="10" />
          <Form.Checkbox
            name="transition"
            label="Transition"
            width="2"
            checked={transition}
            onChange={(e, { checked }) => setTransition(checked)}
          />
          <Form.Group widths="equal">
            <Form.Field inline disabled={!transition}>
              <label>Milliseconds:</label> {tenths * 100}
              <div className="slidecontainer">
                <input
                  className="middle aligned slide"
                  type="range"
                  min={0}
                  max={10}
                  value={tenths}
                  onChange={event => setTenths(Number(event.target.value))}
                />
              </div>
            </Form.Field>
            <Form.Field inline disabled={!transition}>
              <label>Seconds:</label> {seconds}
              <div className="slidecontainer">
                <input
                  className="middle aligned slide"
                  type="range"
                  min={0}
                  max={60}
                  value={seconds}
                  onChange={event => setSeconds(Number(event.target.value))}
                />
              </div>
            </Form.Field>
            <Form.Field inline disabled={!transition}>
              <label>Minutes:</label> {minutes}
              <div className="slidecontainer">
                <input
                  className="middle aligned slide"
                  type="range"
                  min={0}
                  max={60}
                  value={minutes}
                  onChange={event => setMinutes(Number(event.target.value))}
                />
              </div>
            </Form.Field>
          </Form.Group>
          <Message
            size="tiny"
            negative
            hidden={error == null}
            content={error}
          />
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
          content: "Create",
          positive: true,
          disabled:
            !name || !type || (type === "LightScene" && selected.length === 0),
          onClick: handleCreateScene
        }
      ]}
    />
  );
};

const mapStateToProps = state => {
  return { lights: state.lights };
};

export default connect(mapStateToProps, { createScene })(CreateSceneModal);
