import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { initializeApp, resetApp, createUser } from "../actions";

const Setup = ({ init, createUser }) => {
  const [deviceAddress, setDeviceAddress] = useState("");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    discoverDevices();
  }, []);

  const discoverDevices = async () => {
    if (init.ip) {
      setDeviceAddress(init.ip);
    } else {
      const response = await axios.get("https://discovery.meethue.com");
      setDeviceAddress(response.data[0].internalipaddress);
    }
  };

  const handleSubmit = () => {
    createUser(deviceAddress);
  };

  const expand = index => {
    if (index === expanded) {
      setExpanded(null);
    } else {
      setExpanded(index);
    }
  };

  const renderMessage = () => {
    if (init.error && !init.config) {
      return (
        <div className={`ui tiny ${init.theme === "inverted" ? "inverted red" : "error"} message`}>
          {/* <i className="close icon" onClick={initializeApp}></i> */}
          <div className="header">Error: {init.error}</div>
          {/* <p>{init.error}</p> */}
        </div>
      );
    }
    if (init.ip && init.username && init.config) {
      return (
        <div className={`ui tiny ${init.theme === "inverted" ? "inverted green" : "success"} message`}>
          <div className="header">Device connected</div>
          {/* <p>Device connected</p> */}
        </div>
      );
    }
    return (
      <div className={`ui tiny ${init.theme === "inverted" ? "inverted" : null} message`}>
        <div className="header">Device not connected</div>
      </div>
    );
  };

  const renderHelp = () => {
    return (
      <div className={`ui fluid ${init.theme || "styled"} accordion`}>
        {/* <div className="ui top attached label">Help</div> */}
        <div
          className={`${expanded === 0 ? "active" : null} title`}
          onClick={() => expand(0)}
        >
          <i className="dropdown icon"></i>
          Finding your Device IP
        </div>
        <div className={`${expanded === 0 ? "active" : null} content`}>
          <div>
            If your device is not automatically discovered, you must manually
            enter the device IP address above.
          </div>
          <div>
            Your IP address can be found by using one of the following methods:
          </div>
          <div className="ui divider" />
          <div>
            Use the{" "}
            <a href="https://discovery.meethue.com" target="_blank" rel="noopener noreferrer">
              Hue Discovery Tool
            </a>
            <div className="ui ordered list">
              <div className="item">
                In a browser, visit the Discovery Tool, making sure you are on
                the same network as your device
              </div>
              <div className="item">
                If a device is found, the IP address will appear next to{" "}
                <code>"internalipaddress":</code>
              </div>
            </div>
          </div>
          <div className="ui divider" />
          <div>
            Log into your wireless router and look Philips Hue up in the DHCP
            table
          </div>
          <div className="ui divider" />
          <div>
            Use the official{" "}
            <a
              href="https://www2.meethue.com/en-us/app/bridge#download-hue-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Hue App
            </a>
            <div className="ui ordered list">
              <div className="item">Download the official Philips Hue app</div>
              <div className="item">
                Connect your phone to the network the hue bridge is on
              </div>
              <div className="item">Start the hue app</div>
              <div className="item">Push link connect to the bridge</div>
              <div className="item">
                Go to <b> Settings > My Bridge > Network </b> and switch off the
                DHCP toggle
              </div>
              <div className="item">
                Note the IP address, then switch DHCP back on
              </div>
            </div>
          </div>
          <div className="ui divider" />
          <div>
            Use a UPnP discovery app to find Philips Hue in your network
          </div>
        </div>
        <div
          className={`${expanded === 1 ? "active" : null} title`}
          onClick={() => expand(1)}
        >
          <i className="dropdown icon"></i>
          Connecting to your Philips Hue Bridge
        </div>
        <div className={`${expanded === 1 ? "active" : null} content`}>
          Your device should be automatically detected if it is on the same
          network as your computer. If you are on the same network and still do
          not see a Device IP, try obtaining it using one of the methods above.
          <div className="ui divider" />
          <div className="ui ordered list">
            <div className="item">
              Enter your Device IP into the field above
            </div>
            <div className="item">
              Press the <b> Pair </b> button on your Hue Bridge device
            </div>
            <div className="item">
              Press the <b> Connect </b> button
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ height: "100%" }}>
      {renderMessage()}
      <div className={`ui ${init.theme} placeholder segment`}>
      <div className={`ui top attached ${init.theme === "inverted" ? "black" : null} label`}>DEVICE SETUP</div>
        <div className="ui icon header">
          <i className={deviceAddress ? "wifi icon" : "exclamation icon"} />
          Connect to Philips Hue
        </div>
        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <div className="ui inline labeled action input">
              <div className="ui label">http://</div>
              <input
                type="text"
                placeholder={deviceAddress || "Device IP Address"}
                value={deviceAddress}
                onChange={event => setDeviceAddress(event.target.value)}
              />
              <button type="submit" value="Submit" className="ui button blue">
                Connect
              </button>
            </div>
          </div>
        </form>
      </div>
      {renderHelp()}
    </div>
  );
};

const mapStateToProps = state => {
  return { init: state.init };
};

export default connect(mapStateToProps, { createUser, resetApp })(Setup);
