const prefix = "/citizen-dashboard";

export const citizenRoutes = [
  {
    title: "Dashboard",
    items: [
      { title: "Overview", url: `${prefix}` },
      { title: "My Requests", url: `${prefix}/my-requests` },
      { title: "Payment & Tracking", url: `${prefix}/payment&tracking` },
      { title: "Create Request", url: `${prefix}/create-request` },
      { title: "MY Payments", url: `${prefix}/payments` },
    ],
  },
  {
    title: "Account",
    items: [{ title: "My Profile", url: `${prefix}/profile` }],
  },

];
