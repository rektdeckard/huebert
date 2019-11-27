import axios from "axios";

const deviceAddress = localStorage.getItem("ip");
const username = localStorage.getItem("username");

export default axios.create({
  baseURL: `http://${deviceAddress}/api/${username}`
});
