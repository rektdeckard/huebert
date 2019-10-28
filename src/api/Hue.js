import axios from "axios";
import React, { useState } from "react";
// import { connect } from "react-redux";

const deviceAddress = localStorage.getItem("ip");
const username = localStorage.getItem("username");

export default axios.create({
  baseURL: `http://${deviceAddress}/api/${username}`
});

// const Hue = ({ init }) => {
//   return axios.create({
//     baseURL: `http://${init.ip}/api/${init.username}`
//   });
// };

// const mapStateToProps = state => {
//   return { init: state.init };
// };

// export default connect(
//   mapStateToProps,
//   {}
// )(Hue);
