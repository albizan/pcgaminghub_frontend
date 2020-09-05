import axios from "axios";

const baseUrls = {
  development: "http://localhost:80/api",
  production: "https://8d649e6ca716.ngrok.io/api",
};

export const http = axios.create({
  baseURL: baseUrls[process.env.NODE_ENV || "development"],
  timeout: 2500,
});
