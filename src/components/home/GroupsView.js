import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Modal, Form, Menu } from "semantic-ui-react";

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
          <Modal
            size="small"
            as={Form}
            dimmer={settings.theme === "inverted" ? true : "inverted"}
            trigger={<Menu.Item link title="Create Group" icon="plus" />}
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
                onClick: handleCreate
              }
            ]}
          />
          <Modal
            size="small"
            dimmer={settings.theme === "inverted" ? true : "inverted"}
            trigger={
              <Menu.Item
                link
                disabled={!(active.light || active.group)}
                title="Delete"
                icon="trash"
              />
            }
            header={`Delete ${active.group ? "Group" : "Light"}`}
            content={`Are you sure you want to delete ${
              active.group
                ? active.group.name
                : active.light
                ? active.light.name + " from " + active.light.group.name
                : null
            }? This action cannot be undone.`}
            actions={[
              "Cancel",
              {
                key: "done",
                content: "Delete",
                negative: true,
                onClick: handleDelete
              }
            ]}
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
