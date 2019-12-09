import React, { useRef } from "react";
import { convertHSBToColor, compatibleText } from "../../utils";

const LightRow = ({
  light,
  group,
  active,
  setLight,
  setActiveLight,
  alertLight,
  toggleLight,
  theme
}) => {
  const color = convertHSBToColor(light.state);
  const textColor = compatibleText(color);

  const throttle = useRef(null);
  const onChangeBrightness = bri => {
    if (throttle.current !== null) {
      return;
    }

    throttle.current = bri;
    setLight({ ...light, state: { bri } });
    setTimeout(() => {
      throttle.current = null;
    }, 100);
  };

  const handleClick = event => {
    event.ctrlKey ? alertLight(light) : setActiveLight(light, group);
    event.stopPropagation();
  };

  const renderCheckbox = () => (
    <td className="collapsing">
      <div className="ui middle aligned fitted checkbox">
        <input type="checkbox" />
        <label></label>
      </div>
    </td>
  );

  return (
    <tr
      style={active ? { backgroundColor: "#AAAAAA24" } : null}
      // className={active ? "left marked secondary" : null}
      onClick={handleClick}
    >
      {false ? renderCheckbox() : null}
      <td>
        <span
          className="ui label"
          style={{
            color: textColor,
            backgroundColor: `${convertHSBToColor(light.state)}`
          }}
        >
          {light.name}
        </span>
      </td>
      <td>
        <div className="slidecontainer">
          <input
            className="middle aligned slide"
            type="range"
            min={1}
            max={254}
            value={light.state.bri}
            onChange={event => onChangeBrightness(Number(event.target.value))}
          />
        </div>
      </td>
      <td>
        <span className="ui fitted middle aligned toggle checkbox">
          <input
            type="checkbox"
            checked={light.state.on}
            onChange={() => toggleLight(light)}
            disabled={!light.state.reachable}
          />
          <label></label>
        </span>
      </td>
    </tr>
  );
};

export default LightRow;
