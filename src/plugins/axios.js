/* eslint-disable no-prototype-builtins */
import axios from "axios";
import store from "../store/index";

const http = axios.create({
  baseURL: `https://dvapi.tempest.app/api/v1/`,
});

const isHandlerEnabled = (config = {}) =>
  !(config.hasOwnProperty("handlerEnabled") && !config.handlerEnabled);

const requestHandler = (request) => {
  if (isHandlerEnabled(request)) {
    const data = store.getters.getToken;

    // Modify request here
    if (!request.url.includes("login")) {
      request.headers.Authorization = `Bearer ${data}`;
    }
  }
  return request;
};

const errorHandler = async (error) => {
  if (
    error.config &&
    !error.config.url.includes("login") &&
    isHandlerEnabled(error.config)
  ) {
    // Redirect to login if unauthorized
    if (error.response.status === 401 && !error.config.__isRetryRequest) {
      store
        .dispatch("logout")
        .then(() => {})
        .catch((err) => console.log(err));
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
