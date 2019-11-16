import axios from "axios";
import React, { useState } from "react";
// import { connect } from "react-redux";

const deviceAddress = localStorage.getItem("ip");
const username = localStorage.getItem("username");

export default axios.create({
  baseURL: `http://${deviceAddress}/api/${username}`
});
