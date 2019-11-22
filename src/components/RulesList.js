import React from "react";
import { connect } from "react-redux";
import { fetchRules } from "../actions";

const RulesList = ({ rules }) => {
  return <div>RulesList</div>;
};

const mapStateToProps = state => {
  return { rules: state.rules };
};

export default connect(mapStateToProps, { fetchRules })(RulesList);
