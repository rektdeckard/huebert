import React from "react";
import { Modal, Menu } from "semantic-ui-react";

const DeleteItemModal = ({ trigger, active, theme, onSubmit }) => {
  return (
    <Modal
      size="small"
      dimmer={theme === "inverted" ? true : "inverted"}
      trigger={trigger}
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
          onClick: onSubmit
        }
      ]}
    />
  );
};

export default DeleteItemModal;
