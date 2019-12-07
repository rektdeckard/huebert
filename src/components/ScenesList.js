import React from "react";
import { connect } from "react-redux";
import { fetchScenes, fetchGroups, setGroup } from "../actions";

const ScenesList = ({ scenes, active, setGroup, theme }) => {
  const availableScenes = scenes.filter(scene => active.group ? scene.group === active.group.id : false)
  
  const applyScene = id => {
    if (active.group) {
      setGroup({ id: active.group.id, action: { scene: id }})
    }
  }

  const renderScenes = () => {
    return availableScenes.map(scene => {
        return (
          <div 
            className="item" 
            key={scene.id}
            onClick={() => applyScene(scene.id)}
          >
            <div className="content">
              {scene.name}
            </div>
          </div>
        );
      });
  };

  return (
      <div className={`ui ${theme} segment`} style={{ overflowY: "hidden", height: "48vh" }}>
        {/* <div className="ui top attached blue label"> */}
        <div className={`ui top attached ${theme === "inverted" ? "black" : null} label`}>
          SCENES
          {/* <div className="ui horizontal right label blue">{availableScenes.length}</div> */}
        </div>
        <div
          className={`ui middle aligned ${theme} selection list`}
          style={{ overflowY: "auto", height: "102%" }}
        >
          {renderScenes()}
        </div>
      </div>
  );
};

const mapStateToProps = state => {
  return { scenes: state.scenes, active: state.active, theme: state.settings.theme };
};

export default connect(mapStateToProps, { fetchScenes, fetchGroups, setGroup })(ScenesList);
