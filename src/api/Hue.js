import axios from "axios";

const deviceAddress = localStorage.getItem("ip");
const username = localStorage.getItem("username");

export default axios.create({
  baseURL: `https://${deviceAddress}/api/${username}`
});
