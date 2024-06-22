import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const routes = [
  {
    path: "/",
    component: () => import("@/views/admin/HomeView.vue"),
    meta: { requiresAuth: true }, // 需要认证才能访问
    children: [
      {
        path: "/category",
        component: () => import("@/views/admin/CategoryView.vue"),
      },
      {
        path: "/add/category",
        component: () => import("@/views/admin/AddCategoryView.vue"),
      },
      {
        path: "/textkbook",
        component: () => import("@/views/admin/TextBookView.vue"),
      },
      {
        path: "/add/textkbook",
        component: () => import("@/views/admin/AddTextBookView.vue"),
      },
      {
        path: "/order",
        component: () => import("@/views/admin/AdminOrderView.vue"),
      },
      {
        path: "/add/order",
        component: () => import("@/views/admin/AddAdminOrderView.vue"),
      },
      {
        path: "/admin/user",
        component: () => import("@/views/admin/UserManageView.vue"),
      },
      {
        path: "/add/user",
        component: () => import("@/views/admin/AddUserView.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/admin/LoginView.vue"),
    meta: { requiresGuest: true }, // 未认证才能访问
  },
  {
    path: "/register",
    component: () => import("@/views/admin/RegisterView.vue"),
    meta: { requiresGuest: true }, // 未认证才能访问
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isAuthenticated = !!authStore.userinfo.token;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login"); // 需要认证但未登录，重定向到登录页
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next("/"); // 已认证但访问登录或注册页，重定向到主页
  } else {
    next(); // 其他情况正常放行
  }
});

export default router;
