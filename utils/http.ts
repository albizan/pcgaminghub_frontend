import axios from "axios";

const baseUrls = {
  development: "http://localhost:80/api",
  production: "https://067cc9c1e1e7.ngrok.io/api",
};

export const http = axios.create({
  baseURL: baseUrls[process.env.NODE_ENV || "development"],
  timeout: 2500,
});
