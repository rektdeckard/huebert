import React from "react";
import { connect } from "react-redux";
import { Segment, Label, List } from "semantic-ui-react";
import { fetchScenes, fetchGroups, setGroup } from "../actions";

const ScenesList = ({ scenes, active, setGroup, theme }) => {
  const availableScenes = scenes.filter(scene =>
    active.group ? scene.group === active.group.id : false
  );

  const applyScene = id => {
    if (active.group) {
      setGroup({ id: active.group.id, action: { scene: id } });
    }
  };

  const renderScenes = () => {
    return availableScenes.map(scene => {
      return (
        <List.Item
          key={scene.id}
          content={scene.name}
          onClick={() => applyScene(scene.id)}
        />
      );
    });
  };

  return (
    <Segment
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
        style={{ overflowY: "auto", height: "102%" }}
        items={renderScenes()}
      />
    </Segment>
  );
};

const mapStateToProps = state => {
  return {
    scenes: state.scenes,
    active: state.active,
    theme: state.settings.theme
  };
};

export default connect(mapStateToProps, { fetchScenes, fetchGroups, setGroup })(
  ScenesList
);
