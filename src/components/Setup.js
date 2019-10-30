import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { initializeApp, createUser } from "../actions";

const Setup = ({ init, createUser }) => {
  const [deviceAddress, setDeviceAddress] = useState("");

  // console.log(init);

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

  const renderContent = () => {};

  const renderMessage = () => {
    if (init.error) {
      return (
        <div className="ui error message">
          {/* <i className="close icon" onClick={initializeApp}></i> */}
          <div className="header">Error: {init.error}</div>
          {/* <p>{init.error}</p> */}
        </div>
      );
    }
    if (init.ip && init.username) {
      return (
        <div className="ui success message">
          <div className="header">Device connected</div>
          {/* <p>Device connected</p> */}
        </div>
      );
    }
    return (
      <div className="ui secondary message">
        <div className="header">Device not conneted</div>
      </div>
    )
  };

  const renderHelp = () => {
    return (
      <div className="ui fluid styled accordion">
        <div className="title">
          <i className="dropdown icon"></i>
          Finding your Device IP
        </div>
        <div className="content">
          <div className="transition hidden">
            <div>
              If your device is not automatically discovered, you must manually
              enter the device IP address above.
            </div>
            <div>
              Your IP address can be found by using one of the following
              methods:
            </div>
            <div className="ui ordered list">
              <div className="item">
                Use the{" "}
                <a href="https://discovery.meethue.com">Hue Discovery Tool</a>
                <div className="list">
                  <div className="item">
                    In a browser, visit the Discovery Tool, making sure you are
                    on the same network as your device
                  </div>
                  <div className="item">
                    If a device is found, the IP address will appear next to{" "}
                    <b>"internalipaddress":</b>
                  </div>
                </div>
              </div>
              <div className="item">
                Log into your wireless router and look Philips Hue up in the
                DHCP table
              </div>
              <div className="item">
                Use the official <a href="">Hue App</a>
                <div className="list">
                  <div className="item">
                    Download the official Philips Hue app
                  </div>
                  <div className="item">
                    Connect your phone to the network the hue bridge is on
                  </div>
                  <div className="item">Start the hue app</div>
                  <div className="item">Push link connect to the bridge</div>
                  <div className="item">
                    Go to <b>Settings > My Bridge > Network</b> and switch off
                    the DHCP toggle
                  </div>
                  <div className="item">
                    Note the IP address, then switch DHCP back on
                  </div>
                </div>
              </div>
              <div className="item">
                Use a UPnP discovery app to find Philips Hue in your network
              </div>
            </div>
          </div>
        </div>
        <div className="title">
          <i className="dropdown icon"></i>
          Connecting to your Philips Hue Bridge
        </div>
        <div className="content">
          <p>
            There are many breeds of dogs. Each breed varies in size and
            temperament. Owners often select a breed of dog that they find to be
            compatible with their own lifestyle and desires from a companion.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div style={{ height: "100%" }}>
      {renderMessage()}
      <div className="ui placeholder segment">
        <div className="ui icon header">
          <i className={deviceAddress ? "wifi icon" : "exclamation icon"} />
          Connect to Philips Hue
        </div>
        <form className="inline form" onSubmit={handleSubmit}>
          <div className="field">
            <div className="ui labeled action input">
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
      <div className="ui segment">
        <h3 className="header">Finding your Device IP</h3>
        <div>
          If your device is not automatically discovered, you must manually
          enter the device IP address above.
        </div>
        <div>
          Your IP address can be found by using one of the following methods:
        </div>
        <div className="ui ordered list">
          <div className="item">
            Use the{" "}
            <a href="https://discovery.meethue.com">Hue Discovery Tool</a>
            <div className="list">
              <div className="item">
                In a browser, visit the Discovery Tool, making sure you are on
                the same network as your device
              </div>
              <div className="item">
                If a device is found, the IP address will appear next to{" "}
                <b>"internalipaddress":</b>
              </div>
            </div>
          </div>
          <div className="item">
            Log into your wireless router and look Philips Hue up in the DHCP
            table
          </div>
          <div className="item">
            Use the official <a href="">Hue App</a>
            <div className="list">
              <div className="item">Download the official Philips Hue app</div>
              <div className="item">
                Connect your phone to the network the hue bridge is on
              </div>
              <div className="item">Start the hue app</div>
              <div className="item">Push link connect to the bridge</div>
              <div className="item">
                Go to <b>Settings > My Bridge > Network</b> and switch off the
                DHCP toggle
              </div>
              <div className="item">
                Note the IP address, then switch DHCP back on
              </div>
            </div>
          </div>
          <div className="item">
            Use a UPnP discovery app to find Philips Hue in your network
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return { init: state.init };
};

export default connect(
  mapStateToProps,
  { createUser }
)(Setup);
