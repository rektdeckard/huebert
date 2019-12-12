import React from "react";
import { connect } from "react-redux";
import { fetchRules } from "../actions";

const RulesView = ({ rules }) => {
  return <div>RulesList</div>;
};

const mapStateToProps = state => {
  return { rules: state.rules };
};

export default connect(mapStateToProps, { fetchRules })(RulesView);
