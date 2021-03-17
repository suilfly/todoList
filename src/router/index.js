import Vue from "vue";
import VueRouter from "vue-router";
import Board from "../views/Board";
import Task from "../views/Task";
import Column from "../views/Column";
Vue.use(VueRouter);

const routes = [
  {
    name: "board",
    path: "/",
    component: Board,
    /* nest router:嵌套路由 */
    children: [
      {
        path: "task/:id",
        component: Task,
        name: "task"
      },
      {
        path: "addColumn",
        component: Column,
        name: "column"
      }
    ]
  }
];

const router = new VueRouter({
  /* mode:'history',
  base:process */
  routes
});

export default router;
