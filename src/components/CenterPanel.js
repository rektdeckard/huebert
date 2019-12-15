import React from "react";
import {Grid } from 'semantic-ui-react'

const CenterPanel = ({ onClick, children }) => {
  return (
    <Grid.Column 
      width={8}
      style={{ overflowY: "auto", height: "100%", paddingLeft: 0, paddingRight: 0 }}
      children={children}
      onClick={onClick}
    />
  );
};

export default CenterPanel;
