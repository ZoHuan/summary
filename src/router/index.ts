import { createRouter, createWebHistory } from "vue-router";
import { constantRouterMap } from "@/config/router.config";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRouterMap,
});

export default router;
