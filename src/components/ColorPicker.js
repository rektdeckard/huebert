import React from "react";
import { SketchPicker } from "react-color";
import reactCSS from "reactcss";

const ColorPicker = ({ color }) => {
  const handleChange = (color, event) => {
    // color = {
    //   hex: '#333',
    //   rgb: {
    //     r: 51,
    //     g: 51,
    //     b: 51,
    //     a: 1,
    //   },
    //   hsl: {
    //     h: 0,
    //     s: 0,
    //     l: .20,
    //     a: 1,
    //   },
    // }
  };

  const styles = reactCSS({
    "default": {
      sketchPicker: {
        width: null,
        boxShadow: '0px 0px 0px 1px rgba(0, 0, 0, 0.15) '
      }
    }
  });

  return (
    // <div style={styles.sketchPicker}>
      <SketchPicker
        width={null}
        color={{ background: "#fff" }}
        onChange={handleChange}
        disableAlpha
        styles={styles.sketchPicker}
      />
    // </div>
  );
};

export default ColorPicker;
