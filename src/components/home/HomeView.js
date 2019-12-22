import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Menu, Sticky, Ref, Transition, List } from "semantic-ui-react";

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

const HomeView = ({
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
  const contextRef = useRef();

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

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
        <Menu.Menu position="right">
          <CreateGroupModal
            trigger={<Menu.Item link title="Create Group" icon="plus" />}
          />
          <DeleteItemModal
            header={`Delete ${active.group ? "Group" : "Light"}`}
            itemName={active.light?.name ?? active.group?.name}
            groupName={active.light?.group.name}
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
        // <List.Item key={group.id}>
        <LightsTable
          group={group}
          lights={lights.filter(light => group.lights.includes(light.id))}
          expanded={settings.expanded.includes(group.id)}
          key={group.id}
        />
        // </List.Item>
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
      <Ref innerRef={contextRef}>
        <CenterPanel onClick={() => setActiveGroup(null)}>
          <Sticky context={contextRef} offset={16}>
            {renderToolbar()}
          </Sticky>
          {/* <Transition.Group animation="fade right" duration={500} as={List}> */}
          {settings.view === CARD ? renderCards() : renderTables()}
          {/* </Transition.Group> */}
        </CenterPanel>
      </Ref>
      <ToolPanel>
        <ColorPicker />
        <ScenesList />
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
})(HomeView);
