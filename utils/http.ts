import axios from "axios";

const baseUrls = {
  development: "http://localhost:80/api",
  production: "http://localhost:80/api",
};

export const http = axios.create({
  baseURL: "http://localhost:80/api",
  timeout: 2500,
});
