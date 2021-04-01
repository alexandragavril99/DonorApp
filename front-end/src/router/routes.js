const routes = [
  {
    path: "/",
    component: () => import("layouts/MenuLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  },

  {
    path: "/login",
    component: () => import("pages/Login.vue")
  },

  {
    path: "/register",
    component: () => import("pages/Register.vue")
  },
  {
    path: "/profile",
    component: () => import("layouts/MenuLayout.vue"),
    children: [{ path: "", component: () => import("pages/Profile.vue") }]
  },
  {
    path: "/appointment",
    component: () => import("layouts/MenuLayout.vue"),
    children: [{ path: "", component: () => import("pages/Appointment.vue") }]
  }
];

export default routes;
