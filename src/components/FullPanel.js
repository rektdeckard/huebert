import React from "react";

const FullPanel = ({ onClick, children }) => {
  return (
    <>
      <div
        className="twelve wide column"
        style={{ overflowY: "auto", height: "100%" }}
        onClick={onClick}
      >
        {children}
      </div>
    </>
  );
};

export default FullPanel;
