import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  fetchGroups,
  deleteGroup,
  addLight,
  removeLight,
  setActiveGroup,
  setView,
  setTheme,
  toggleExpanded
} from "../../actions";
import LightsTable from "./LightsTable";
import LightsList from "./LightsList";
import ScenesList from "../ScenesList";
import ColorPicker from "../ColorPicker";
import CenterPanel from "../CenterPanel";
import ToolPanel from "../ToolPanel";

const CARD = "card";
const LIST = "list";

const GroupsView = ({
  lights,
  groups,
  active,
  settings,
  fetchGroups,
  deleteGroup,
  addLight,
  removeLight,
  setActiveGroup,
  setView,
  toggleExpanded
}) => {
  useEffect(() => {
    fetchGroups();
  }, []);

  const handleCreate = () => {
    console.log("create group");
  };

  const handleDelete = () => {
    if (active.group) {
      const confirm = window.confirm(`Delete Group ${active.group.name}?`);
      if (!confirm) return;
      deleteGroup(active.group.id, active.group.name);
      setActiveGroup(null);
    };
  };

  const renderToolbar = () => {
    return (
      <div
        className={`ui ${settings.theme} mini icon menu`}
        onClick={e => e.stopPropagation()}
      >
        <div
          className={`${settings.view !== CARD ? "active" : null} link item`}
          title="List View"
          onClick={() => setView(LIST)}
        >
          <i className="list icon"></i>
        </div>
        <div
          className={`${settings.view === CARD ? "active" : null} link item`}
          title="Card View"
          onClick={() => setView(CARD)}
        >
          <i className="th icon"></i>
        </div>
        <div
          className={`link item`}
          title={`${settings.expandAll ? "Collapse" : "Expand"} All`}
          onClick={toggleExpanded}
        >
          <i
            className={`angle double ${
              settings.expandAll ? "up" : "down"
            } icon`}
          ></i>
        </div>
        {/* <div className="item" style={{ width: 48 }} />
        <div className="menu">
          
          <div className={`disabled link item`} title="Filter Groups">
            <i className="filter icon"></i>
          </div>
          <div className={`disabled link item`} title="Edit Groups">
            <i className="edit icon"></i>
          </div>
          
        </div> */}
        <div className="right menu">
          <div
            className="link item"
            title="Create Group"
            onClick={handleCreate}
          >
            <i className="plus icon"></i>
          </div>
          <div
            className={`${
              active.light || active.group ? null : "disabled"
            } link item`}
            title="Delete"
            onClick={handleDelete}
          >
            <i className="trash icon"></i>
          </div>
        </div>
      </div>
    );
  };

  const renderTables = () => {
    return groups.map(group => {
      return (
        <LightsTable
          group={group}
          lights={lights.filter(light => group.lights.includes(light.id))}
          expanded={settings.expanded.includes(group.id)}
          key={group.id}
        />
      );
    });
  };

  const renderCards = () => {
    return (
      <LightsList groups={groups} lights={settings.expandAll ? lights : []} />
    );
  };

  const renderControls = () => {
    return (
      <ToolPanel>
        {active.light || active.group ? <ColorPicker /> : null}
        {active.group ? <ScenesList /> : null}
      </ToolPanel>
    );
  };

  return (
    <>
      <CenterPanel onClick={() => setActiveGroup(null)}>
        {renderToolbar()}
        {settings.view === CARD ? renderCards() : renderTables()}
      </CenterPanel>
      {renderControls()}
    </>
  );
};

const mapStateToProps = state => {
  return {
    lights: state.lights,
    groups: state.groups,
    active: state.active,
    settings: state.settings
  };
};

export default connect(mapStateToProps, {
  fetchGroups,
  deleteGroup,
  addLight,
  removeLight,
  setActiveGroup,
  setView,
  setTheme,
  toggleExpanded
})(GroupsView);
