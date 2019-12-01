import React from "react";

const ToolPanel = ({ onClick, children }) => {
  return (
    <>
      <div
        className="four wide column"
        style={{ overflowY: "auto", height: "100%" }}
        onClick={onClick}
      >
        {children}
      </div>
    </>
  );
};

export default ToolPanel;
