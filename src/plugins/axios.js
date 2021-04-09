/* eslint-disable no-prototype-builtins */
import axios from "axios";
import { getLocalStorage } from "./authContext";

const http = axios.create({
  baseURL: `https://dvapi.tempest.app/api/v1/`,
});

const isHandlerEnabled = (config = {}) =>
  !(config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled);

const requestHandler = (request) => {
  if (isHandlerEnabled(request)) {
    const data = getLocalStorage("auth");

    // Modify request here
    if (!request.url.includes("login")) {
      request.headers.Authorization = `Bearer ${data.token}`;
    }
  }
  return request;
};

const errorHandler = async (error) => {
  if (
    error.config &&
    !(error.config.url === "login") &&
    isHandlerEnabled(error.config)
  ) {
    // Redirect to login if unauthorized
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = "/login";
      return Promise.reject(error);
    }
  }
  return Promise.reject({ ...error });
};

const successHandler = (response) => response;

http.interceptors.request.use((request) => requestHandler(request));

http.interceptors.response.use(
  (response) => successHandler(response),
  (error) => errorHandler(error)
);

export default http;
