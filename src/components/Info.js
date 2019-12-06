import React from "react";
import { connect } from "react-redux";

const Info = ({ config, theme }) => {
  if (config && config.name) {
    return (
      <div className={`ui ${theme} segment`}>
        <div className={`ui top attached ${theme === "inverted" ? "black" : null} label`}>DEVICE INFO</div>
        <table className={`ui very basic compact fixed single line small ${theme} table`}>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{config.name}</td>
            </tr>
            <tr>
              <td>Bridge ID</td>
              <td>{config.bridgeid}</td>
            </tr>
            <tr>
              <td>Model ID</td>
              <td>{config.modelid}</td>
            </tr>
            <tr>
              <td>DHCP</td>
              <td>{config.dhcp.toString()}</td>
            </tr>
            <tr>
              <td>MAC</td>
              <td>{config.mac}</td>
            </tr>
            <tr>
              <td>IP</td>
              <td>{config.ipaddress}</td>
            </tr>
            <tr>
              <td>Netmask</td>
              <td>{config.netmask}</td>
            </tr>
            <tr>
              <td>Gateway</td>
              <td>{config.gateway}</td>
            </tr>
            <tr>
              <td>Proxy Address</td>
              <td>{config.proxyaddress}</td>
            </tr>
            <tr>
              <td>Proxy Port</td>
              <td>{config.proxyport}</td>
            </tr>
            <tr>
              <td>Zigbee Channel</td>
              <td>{config.zigbeechannel}</td>
            </tr>
            <tr>
              <td>Software Version</td>
              <td>{config.swversion}</td>
            </tr>
            <tr>
              <td>Portal Services</td>
              <td>{config.portalservices.toString()}</td>
            </tr>
            <tr>
              <td>Portal Connection</td>
              <td>{config.portalconnection}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  } else return null;
};

const mapStateToProps = state => {
  return { config: state.settings.config, theme: state.settings.theme };
};

export default connect(mapStateToProps, {})(Info);
