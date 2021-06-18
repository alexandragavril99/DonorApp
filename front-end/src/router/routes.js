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
    component: () => import("pages/Login.vue"),
    name: "login"
  },

  {
    path: "/register",
    component: () => import("pages/Register.vue"),
    name: "register"
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
  },
  {
    path: "/viewAppointments",
    component: () => import("layouts/MenuLayout.vue"),
    children: [
      { path: "", component: () => import("pages/ViewAppointments.vue") }
    ]
  },
  {
    path: "/doctorAppointment",
    component: () => import("layouts/MenuLayout.vue"),
    children: [
      { path: "", component: () => import("pages/DoctorAppointment.vue") }
    ]
  },
  {
    path: "/ranking",
    component: () => import("layouts/MenuLayout.vue"),
    children: [{ path: "", component: () => import("pages/Ranking.vue") }]
  },
  {
    path: "/statistics",
    component: () => import("layouts/MenuLayout.vue"),
    children: [{ path: "", component: () => import("pages/Statistics.vue") }]
  },
  {
    path: "/emergencies",
    component: () => import("layouts/MenuLayout.vue"),
    children: [{ path: "", component: () => import("pages/Emergencies.vue") }]
  }
];

export default routes;
