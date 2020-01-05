import React from "react";
import { Segment, Label, Table, Tab } from "semantic-ui-react";

const SchedulesList = ({ schedules, theme }) => {
  return (
    <Segment inverted={theme === "inverted"}>
      <Label
        attached="top"
        color={theme === "inverted" ? "black" : null}
        content="SCHEDULES"
      />
      <Table inverted={theme === "inverted"}>
        <Table.Body>
          {schedules.map(sched => <Table.Row cells={[sched.name, sched.localtime]} key={sched.id}/>)}
        </Table.Body>
      </Table>
    </Segment>
  );
};

export default SchedulesList;
