import { colorTemperature2rgb } from "color-temperature";
import { miredToKelvin } from "mired";

export const convertHSLToColor = state => {
  // Lamp supports HSL
  if (state.hue) {
    const hue = Math.round(state.hue / 182.041667);
    const sat = Math.round(state.sat / 2.54);
    const val = Math.round(state.bri / 2.54);

    return `hsl(${hue}, ${sat}%, ${val}%)`;
  }

  // Lamp supports CT
  if (state.ct) {
    const rgb = colorTemperature2rgb(miredToKelvin(state.ct));
    return `rgb(${rgb.red},${rgb.green},${rgb.blue})`;
  }
};
