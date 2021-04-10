import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Jobs from "../views/Jobs.vue";
import NotFound from "../views/NotFound.vue";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  { path: "*", name: "404", component: NotFound },
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/jobs",
    name: "Jobs",
    component: Jobs,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

export default router;
