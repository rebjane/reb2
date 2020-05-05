import Vue from "vue";
import VueRouter from "vue-router";

// Because Vue is not global we tie Vue
// and VueRouter together manually
Vue.use(VueRouter);

// Initialize router
const router = new VueRouter({
  base: "/",
  mode: "history",
  routes: [
    {
      path: "",
      name: "app",
      component: () => import("./App.vue"),
    },

    {
      path: "/work",
      name: "work",
      component: () => import("./WorkPage.vue"),
    },
    {
      path: "/project*",
      name: "project",
      component: () => import("./ProjectPage.vue"),
    },
  ],
});

export default router;
