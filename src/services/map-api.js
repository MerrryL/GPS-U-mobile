import axios from "axios";
//const key = process.env.GOOGLE_API_KEY;

const apiClient = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api/",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  },
  withCredentials: true
});

export default apiClient;
