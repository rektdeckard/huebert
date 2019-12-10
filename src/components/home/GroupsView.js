import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Menu } from "semantic-ui-react";

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
import CreateGroupModal from "../modals/CreateGroupModal";
import DeleteItemModal from "../modals/DeleteItemModal";

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
      deleteGroup(active.group.id, active.group.name);
      setActiveGroup(null);
    } else if (active.light) {
      removeLight(active.light);
    }
  };

  const renderToolbar = () => {
    return (
      <Menu
        inverted={settings.theme === "inverted"}
        size="mini"
        icon
        onClick={e => e.stopPropagation()}
      >
        <Menu.Item
          link
          active={settings.view !== CARD}
          title="List View"
          icon="list"
          onClick={() => setView(LIST)}
        />
        <Menu.Item
          link
          active={settings.view === CARD}
          icon="th"
          title="Card View"
          onClick={() => setView(CARD)}
        />
        <Menu.Item
          link
          title={`${settings.expandAll ? "Collapse" : "Expand"} All`}
          icon={`angle double ${settings.expandAll ? "up" : "down"}`}
          onClick={toggleExpanded}
        />
        {/* <div className="item" style={{ width: 48 }} />
        <div className="menu">
          
          <div className={`disabled link item`} title="Filter Groups">
            <i className="filter icon"></i>
          </div>
          <div className={`disabled link item`} title="Edit Groups">
            <i className="edit icon"></i>
          </div>
          
        </div> */}
        <Menu.Menu position="right">
          <CreateGroupModal
            lights={lights}
            theme={settings.theme}
            onSubmit={handleCreate}
            trigger={<Menu.Item link title="Create Group" icon="plus" />}
          />
          <DeleteItemModal
            active={active}
            theme={settings.theme}
            onSubmit={handleDelete}
            trigger={
              <Menu.Item
                link
                disabled={!(active.light || active.group)}
                title="Delete"
                icon="trash"
              />
            }
          />
        </Menu.Menu>
      </Menu>
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

  return (
    <>
      <CenterPanel onClick={() => setActiveGroup(null)}>
        {renderToolbar()}
        {settings.view === CARD ? renderCards() : renderTables()}
      </CenterPanel>
      <ToolPanel>
        {active.light || active.group ? <ColorPicker /> : null}
        {active.group ? <ScenesList /> : null}
      </ToolPanel>
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
