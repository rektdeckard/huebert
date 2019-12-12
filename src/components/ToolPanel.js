import React from "react";
import { Grid } from "semantic-ui-react";

const ToolPanel = ({ onClick, children }) => {
  return (
    <Grid.Column
      width={4}
      style={{ overflowY: "auto", height: "100%" }}
      onClick={onClick}
      children={children}
    />
  );
};

export default ToolPanel;
