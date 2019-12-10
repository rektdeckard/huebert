import React from "react";
import {Grid } from 'semantic-ui-react'

const FullPanel = ({ onClick, children }) => {
  return (
    <Grid.Column 
      width={12}
      style={{ overflowY: "auto", height: "100%" }}
      children={children}
      onClick={onClick}
    />
  );
};

export default FullPanel;
