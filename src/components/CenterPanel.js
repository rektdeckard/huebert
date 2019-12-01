import React from "react";

const CenterPanel = ({ onClick, children }) => {
  return (
    <>
      <div
        className="eight wide column"
        style={{ overflowY: "auto", height: "100%" }}
        onClick={onClick}
      >
        {children}
      </div>
    </>
  );
};

export default CenterPanel;
