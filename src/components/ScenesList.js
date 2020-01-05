import React, { useState } from "react";
import { connect } from "react-redux";
import { Segment, Label, List, Menu, Dimmer, Confirm } from "semantic-ui-react";
import {
  fetchScenes,
  fetchGroups,
  setGroup,
  createScene,
  deleteScene,
  modifyScene,
  setActiveScene
} from "../actions";
import CreateSceneModal from "./modals/CreateSceneModal";
import DeleteItemModal from "./modals/DeleteItemModal";

const ScenesList = ({
  scenes,
  lights,
  active,
  setGroup,
  theme,
  deleteScene,
  modifyScene,
  setActiveScene
}) => {
  const [confirmState, setConfirmState] = useState(false);

  const availableScenes = scenes.filter(scene =>
    active.group
      ? // ? active.group.type === "Room"
        scene.group === active.group.id
      : scene.type === "LightScene"
  );

  const handleApplyScene = scene => {
    if (active.group) {
      setGroup({ id: active.group.id, action: { scene: scene.id } }, false);
      setActiveScene(scene);
    }
  };

  const handleModifyScene = async () => {
    const lightStates = lights
      .filter(light => active.scene.lights.includes(light.id))
      .reduce((acc, curr) => {
        const state = getModifiableKeys(curr);
        removeEmptyKeys(state);
        acc[curr.id] = state;
        return acc;
      }, {});

    const response = await modifyScene({
      id: active.scene.id,
      lightstates: lightStates
    });
    if (response.error) {
      // TODO: reflect error in UI not alert
      window.alert(response.error);
    } else {
      setConfirmState(false);
    }
  };

  const getModifiableKeys = light => {
    const { on, bri, hue, sat, effect, xy, ct } = light.state;
    return { on, bri, hue, sat, effect, xy, ct };
  };

  const removeEmptyKeys = obj => {
    Object.keys(obj).forEach(key => obj[key] == null && delete obj[key]);
  };

  const handleDeleteScene = () => {
    if (active.scene) deleteScene(active.scene.id);
  };

  const renderToolbar = () => (
    <Menu
      inverted={theme === "inverted"}
      size="mini"
      icon
      onClick={e => e.stopPropagation()}
    >
      {active.group ? (
        <CreateSceneModal
          group={active.group}
          theme={theme}
          trigger={
            <Menu.Item link title="Save Current as New Scene" icon="plus" />
          }
        />
      ) : (
        <Menu.Item
          disabled
          link
          title="Save Current as New Scene"
          icon="plus"
        />
      )}

      <Menu.Item
        link
        title="Update Active Scene"
        disabled={!active.scene || active.scene?.group !== active.group?.id}
        icon="save"
        onClick={() => setConfirmState(true)}
      />
      <Confirm
        open={confirmState}
        header="Overwrite Scene"
        content={`Are you sure you want to overwrite ${active.scene?.name ??
          ""} with current settings?`}
        onConfirm={handleModifyScene}
        onCancel={() => setConfirmState(false)}
        closeOnDimmerClick
        closeOnEscape
      />
      <Menu.Menu position="right">
        <DeleteItemModal
          header="Delete Scene"
          itemName={active.scene?.name ?? ""}
          groupName={active.group?.name ?? ""}
          theme={theme}
          onSubmit={handleDeleteScene}
          trigger={
            <Menu.Item
              link
              disabled={!active.scene || active.scene.locked}
              title="Delete Scene"
              icon="trash"
            />
          }
        />
      </Menu.Menu>
    </Menu>
  );

  const renderScenes = () => {
    return availableScenes.map(scene => {
      return (
        <List.Item
          key={scene.id}
          content={scene.name}
          // TODO: Implement active scene
          active={active.scene && active.scene.id === scene.id}
          onClick={() => handleApplyScene(scene)}
        />
      );
    });
  };

  // if (!active.group) return null;

  return (
    <>
      {renderToolbar()}
      {/* <Segment */}
      <Dimmer.Dimmable
        as={Segment}
        dimmed={true}
        inverted={theme === "inverted"}
        style={{ overflowY: "hidden", height: "48vh" }}
      >
        <Label
          attached="top"
          color={theme === "inverted" ? "black" : null}
          content="SCENES"
        />
        <List
          className="middle aligned"
          selection
          inverted={theme === "inverted"}
          style={{ overflowY: "auto", height: "90%" }}
          items={renderScenes()}
        />
        <Dimmer
          active={!active?.group ?? true}
          inverted={theme !== "inverted"}
        />
      </Dimmer.Dimmable>
      {/* </Segment> */}
    </>
  );
};

const mapStateToProps = state => {
  return {
    scenes: state.scenes,
    lights: state.lights,
    active: state.active,
    theme: state.settings.theme
  };
};

export default connect(mapStateToProps, {
  fetchScenes,
  fetchGroups,
  setGroup,
  createScene,
  deleteScene,
  modifyScene,
  setActiveScene
})(ScenesList);
