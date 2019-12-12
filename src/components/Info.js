import React from "react";
import { connect } from "react-redux";
import { Segment, Table, Label } from "semantic-ui-react";

const Info = ({ config, theme }) => {
  const tableData = config
    ? [
        { name: "Name", value: config.name },
        { name: "Bridge ID", value: config.bridgeid },
        { name: "Model ID", value: config.modelid },
        { name: "DHCP", value: config.dhcp.toString() },
        { name: "MAC", value: config.mac },
        { name: "IP", value: config.ipaddress },
        { name: "Netmask", value: config.netmask },
        { name: "Gateway", value: config.gateway },
        { name: "Proxy Address", value: config.proxyaddress },
        { name: "Proxy Port", value: config.proxyport },
        { name: "Zigbee Channel", value: config.zigbeechannel },
        { name: "Software Version", value: config.swversion },
        { name: "Portal Services", value: config.portalservices.toString() },
        { name: "Portal Connection", value: config.portalconnection }
      ]
    : [];

  const renderBodyRow = ({ name, value }, i) => ({
    key: i,
    cells: [name, value]
  });

  if (config && config.name) {
    return (
      <Segment inverted={theme === "inverted"}>
        <Label
          attached="top"
          color={theme === "inverted" ? "black" : null}
          content="DEVICE INFO"
        />
        <Table
          size="small"
          basic="very"
          compact
          fixed
          singleLine
          inverted={theme === "inverted"}
          renderBodyRow={renderBodyRow}
          tableData={tableData}
        />
      </Segment>
    );
  } else return null;
};

const mapStateToProps = state => {
  return { config: state.settings.config, theme: state.settings.theme };
};

export default connect(mapStateToProps, {})(Info);
