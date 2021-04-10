import Vue from "vue";
import Vuex from "vuex";
import jwtDecode from "jwt-decode";
import http from "../plugins/axios";
import { setLocalStorage, getLocalStorage } from "@/plugins/authContext";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    status: "",
    token: getLocalStorage("auth") ? getLocalStorage("auth")["token"] : "",
    user: getLocalStorage("auth")
      ? jwtDecode(getLocalStorage("auth")["token"])
      : null,
    error: "",
  },

  mutations: {
    auth_request(state) {
      state.status = "loading";
    },
    auth_success(state, data) {
      state.status = "success";
      state.token = data.token;
      state.user = data.user;
    },
    auth_error(state) {
      state.status = "error";
    },
    logout(state) {
      state.status = "";
      state.token = "";
      state.user = null;
    },
    showError(state, msg) {
      state.error = msg;
    },
  },

  actions: {
    login({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit("auth_request");
        http
          .post("auth/login", data)
          .then((response) => {
            const data = {
              token: response.data.token,
              user: jwtDecode(response.data.token),
            };

            setLocalStorage("auth", response.data);

            commit("auth_success", data);
            resolve(response);
          })
          .catch((err) => {
            commit("auth_error");
            localStorage.clear();
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit("logout");
        localStorage.clear();
        window.location.href = "/login";
        resolve();
      });
    },
    showError({ commit }, error) {
      const msg = error?.response?.data?.message || "Error!";
      commit("showError", msg);

      setTimeout(() => {
        commit("showError", "");
      }, 5000);
    },
  },

  getters: {
    isLoggedIn: (state) => !!state.token,
    getUser: (state) => state.user,
    getToken: (state) => state.token,
    authStatus: (state) => state.status,
    getError: (state) => state.error,
  },
});
