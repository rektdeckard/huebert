import React from "react";
import { Modal } from "semantic-ui-react";

const DeleteItemModal = ({ header, trigger, itemName, groupName, theme, onSubmit }) => {
  return (
    <Modal
      size="small"
      dimmer={theme === "inverted" ? true : "inverted"}
      trigger={trigger}
      header={header}
      content={`Are you sure you want to delete ${itemName}${
        groupName ? " from " + groupName : ""
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
