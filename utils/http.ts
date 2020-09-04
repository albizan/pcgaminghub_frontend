import axios from "axios";

const baseUrls = {
  development: "http://localhost:80/api",
  production: "https://d7992fc2a2ea.ngrok.io/api",
};

export const http = axios.create({
  baseURL: baseUrls[process.env.NODE_ENV || "development"],
  timeout: 2500,
});
