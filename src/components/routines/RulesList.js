import React from "react";
import { Segment, Label, Table, Tab } from "semantic-ui-react";

const RulesList = ({ rules, theme }) => {
  return (
    <Segment inverted={theme === "inverted"}>
      <Label
        attached="top"
        color={theme === "inverted" ? "black" : null}
        content="RULES"
      />
      <Table inverted={theme === "inverted"}>
        <Table.Body>
          {rules.map(rule => <Table.Row cells={[rule.name, `Status: ${rule.status}`]} key={rule.id}/>)}
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default RulesList;
