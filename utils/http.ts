import axios from "axios";
import { getAccessToken } from "./auth";

const baseUrls = {
  development: "http://localhost:80/api",
  production: "https://8d649e6ca716.ngrok.io/api",
};

const instance = axios.create({
  baseURL: baseUrls[process.env.NODE_ENV || "development"],
  timeout: 2500,
});

export const baseInstance = axios.create({
  baseURL: baseUrls[process.env.NODE_ENV || "development"],
  timeout: 2500,
});

instance.interceptors.request.use((reqConfig) => {
  if (localStorage) {
    const accessToken: string = getAccessToken() || "";
    reqConfig.headers.authorization = "Bearer " + accessToken;
  }

  return reqConfig;
});

export const http = instance;
