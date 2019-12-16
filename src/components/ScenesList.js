import React from "react";
import { connect } from "react-redux";
import { Segment, Label, List, Menu, Dimmer } from "semantic-ui-react";
import {
  fetchScenes,
  fetchGroups,
  setGroup,
  createScene,
  deleteScene,
  setActiveScene
} from "../actions";
import CreateSceneModal from "./modals/CreateSceneModal";
import DeleteItemModal from './modals/DeleteItemModal';

const ScenesList = ({
  scenes,
  active,
  setGroup,
  theme,
  deleteScene,
  setActiveScene
}) => {
  const availableScenes = scenes.filter(scene =>
    active.group
      ? // ? active.group.type === "Room"
        scene.group === active.group.id
      : // : scene.type === "LightScene"
        false
  );

  const handleApplyScene = scene => {
    if (active.group) {
      setGroup({ id: active.group.id, action: { scene: scene.id } }, false);
      setActiveScene(scene);
    }
  };

  const handleOverwriteScene = () => {};

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
      <CreateSceneModal
        group={active.group}
        theme={theme}
        trigger={
          <Menu.Item
            link
            title="Save Current as New Scene"
            disabled={!active.group}
            icon="plus"
          />
        }
      />
      <Menu.Item
        link
        title="Update Active Scene"
        disabled={
          !(active.group && active.scene) ||
          active.scene.group !== active.group.id
        }
        icon="save"
        onClick={handleOverwriteScene}
      />
      <Menu.Menu position="right">
        <DeleteItemModal
          header="Delete Scene"
          itemName={active.scene ? active.scene.name : ""}
          groupName={active.group ? active.group.name : ""}
          theme={theme}
          onSubmit={handleDeleteScene}
          trigger={
            <Menu.Item
              link
              disabled={!active.group || !active.scene}
              title="Delete Scene"
              icon="trash"
            />
          }
        />
        {/* <Menu.Item
          link
          title="Delete Scene"
          disabled={!active.group || !active.scene}
          icon="trash"
          onClick={handleDeleteScene}
        /> */}
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

  return (
    <>
      {renderToolbar()}
      {/* <Segment */}
      <Dimmer.Dimmable as={Segment} dimmed={true}
        inverted={theme === "inverted"}
        style={{ overflowY: "hidden", height: "48vh" }}
      > 
        {/* <Dimmer active={availableScenes.length === 0} inverted={theme !== "inverted"} /> */}
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
      </Dimmer.Dimmable>
      {/* </Segment> */}
    </>
  );
};

const mapStateToProps = state => {
  return {
    scenes: state.scenes,
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
  setActiveScene
})(ScenesList);
