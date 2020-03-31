import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  Segment,
  Accordion,
  Label,
  Header,
  Icon,
  Form,
  Divider,
  List,
  Input,
  Button
} from "semantic-ui-react";

import { initializeApp, resetApp, createUser } from "../actions";
import FullPanel from "./FullPanel";

const SettingsView = ({ settings, createUser }) => {
  const [deviceAddress, setDeviceAddress] = useState("");

  useEffect(() => {
    const discoverDevices = async () => {
      if (settings.ip) {
        setDeviceAddress(settings.ip);
      } else {
        const response = await axios.get("https://discovery.meethue.com");
        if (response.data[0]) {
          setDeviceAddress(response.data[0].internalipaddress || "");
        }
      }
    };

    discoverDevices();
  }, [settings]);

  const handleSubmit = () => {
    createUser(deviceAddress);
  };

  const renderMessage = () => {
    if (settings.error) {
      return (
        <div
          className={`ui tiny ${
            settings.theme === "inverted" ? "inverted red" : "error"
          } message`}
        >
          <div className="header">{`Error: Hue Bridge ${settings.error}`}</div>
        </div>
      );
    }
    if (settings.ip && settings.username && settings.config) {
      return (
        <div
          className={`ui tiny ${
            settings.theme === "inverted" ? "inverted green" : "success"
          } message`}
        >
          <div className="header">Device connected</div>
        </div>
      );
    }
    return (
      <div
        className={`ui tiny ${
          settings.theme === "inverted" ? "inverted" : null
        } message`}
      >
        <div className="header">Device not connected</div>
      </div>
    );
  };

  const helpPanels = [
    {
      key: "finding-ip",
      title: "Finding your Device IP",
      content: {
        content: (
          <div>
            <div>
              If your device is not automatically discovered, you must manually
              enter the device IP address above.
            </div>
            <div>
              Your IP address can be found by using one of the following
              methods:
            </div>
            <Divider />
            <div>
              Use the{" "}
              <a
                href="https://discovery.meethue.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hue Discovery Tool
              </a>
              <List
                ordered
                inverted={settings.theme === "inverted"}
                items={[
                  "In a browser, visit the Discovery Tool, making sure you are on the same network as your device",
                  {
                    key: "ip-2",
                    content: (
                      <>
                        If a device is found, the IP address will appear next to{" "}
                        <code>"internalipaddress":</code>
                      </>
                    )
                  }
                ]}
              ></List>
            </div>
            <Divider />
            <div>
              Log into your wireless router and look Philips Hue up in the DHCP
              table
            </div>
            <Divider />
            <div>
              Use the official{" "}
              <a
                href="https://www2.meethue.com/en-us/app/bridge#download-hue-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Hue App
              </a>
              <List
                ordered
                inverted={settings.theme === "inverted"}
                items={[
                  "Download the official Philips Hue app",
                  "Connect your phone to the network the hue bridge is on",
                  "Start the hue app",
                  "Push link connect to the bridge",
                  {
                    key: "setup-5",
                    content: (
                      <>
                        Go to <b> Settings > My Bridge > Network </b> and switch
                        off the DHCP toggle
                      </>
                    )
                  },
                  "Note the IP address, then switch DHCP back on"
                ]}
              />
            </div>
            <Divider />
            <div>
              Use a UPnP discovery app to find Philips Hue in your network
            </div>
          </div>
        )
      }
    },
    {
      key: "connecting-to-bridge",
      title: "Connecting to your Philips Hue Bridge",
      content: {
        content: (
          <div>
            Your device should be automatically detected if it is on the same
            network as your computer. If you are on the same network and still
            do not see a Device IP, try obtaining it using one of the methods
            above.
            <Divider />
            <List
              ordered
              inverted={settings.theme === "inverted"}
              items={[
                "Enter your Device IP into the field above",
                {
                  key: 2,
                  content: (
                    <>
                      Press the <b> Pair </b> button on your Hue Bridge device
                    </>
                  )
                },
                {
                  key: 3,
                  content: (
                    <>
                      Press the <b> Connect </b> button
                    </>
                  )
                }
              ]}
            />
          </div>
        )
      }
    },
    {
      key: "connection-error",
      title: "Clicking the Connect button does nothing",
      content: {
        content: (
          <div>
            If clicking the <b> Connect </b> button has no apparent effect and
            no errors are present, you may have to allow your browser to make
            CORS requests:
            <Divider />
            <List
              ordered
              inverted={settings.theme === "inverted"}
              items={[
                "Make sure your Device was discovered and your computer is on the same network",
                {
                  key: 2,
                  content: (
                    <>
                      Follow{" "}
                      <u>
                        <a
                          href={`https://${deviceAddress}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          this link
                        </a>
                      </u>{" "}
                      to attempt to communicate with your Hue Bridge
                    </>
                  )
                },
                {
                  key: 3,
                  content: (
                    <>
                      You may see a warning message about continuing to the next
                      page. Accept and proceed by clicking
                      <b> Details </b> or <b> Advanced </b>, depending on your
                      browser, and clicking the link to continue to the
                      requested page.
                    </>
                  )
                },
                "If you see a webpage with the Philips Hue logo and information about software licensing, CORS is now enabled",
                "Close the window and refresh the Huebert app",
                "Proceed with normal setup"
              ]}
            />
          </div>
        )
      }
    }
  ];

  const renderHelp = () => {
    return (
      <Segment inverted={settings.theme === "inverted"}>
        <Label
          attached="top"
          color={settings.theme === "inverted" ? "black" : null}
          content="HELP"
        />
        <Accordion
          fluid
          inverted={settings.theme === "inverted"}
          panels={helpPanels}
        />
      </Segment>
    );
  };

  return (
    <FullPanel>
      {renderMessage()}
      <Segment placeholder inverted={settings.theme === "inverted"}>
        <Label
          attached="top"
          color={settings.theme === "inverted" ? "black" : null}
          content="DEVICE SETUP"
        />
        <Header icon>
          <Icon name={deviceAddress ? "wifi" : "exclamation"} />
          Connect to Philips Hue
        </Header>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <Input
              action={<Button type="submit" color="blue" content="Connect" />}
              label="http://"
              placeholder={deviceAddress || "Device IP Address"}
              value={deviceAddress}
              onChange={event => setDeviceAddress(event.target.value)}
            />
          </Form.Field>
        </Form>
      </Segment>
      {renderHelp()}
    </FullPanel>
  );
};

const mapStateToProps = state => {
  return { settings: state.settings };
};

export default connect(mapStateToProps, { createUser, resetApp })(SettingsView);
