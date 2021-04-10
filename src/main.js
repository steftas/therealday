import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// Plugins
import vuetify from "@/plugins/vuetify";
import filters from "@/plugins/filters";

// Custom css
import "@/assets/scss/style.scss";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  filters,
  render: (h) => h(App),
}).$mount("#app");
