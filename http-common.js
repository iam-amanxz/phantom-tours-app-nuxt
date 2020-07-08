import axios from "axios";

export default axios.create({
  baseURL: process.env.baseUrl,
  headers: {
    "content-type": "application/json"
  }
});
