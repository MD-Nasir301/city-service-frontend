const prefix = "/admin-dashboard";

export const adminRoutes = [
  {
    title: "Main",
    items: [
      { title: "Overview", url: `${prefix}` },
      { title: "Service Requests", url: `${prefix}/service-requests` },
      { title: "Categories", url: `${prefix}/categories` },
    ],
  },
  {
    title: "User Management",
    items: [
      { title: "Users", url: `${prefix}/users` },
      { title: "Create Staff", url: `${prefix}/staff` },
    ],
  },
  {
    title: "Finance & Logs",
    items: [
      { title: "Payments", url: `${prefix}/payments` },
      { title: "Audit Logs", url: `${prefix}/audit-logs` },
    ],
  },
];