const prefix = "/citizen-dashboard";

export const citizenRoutes = [
  {
    title: "Dashboard",
    items: [
      { title: "Overview", url: `${prefix}` },
      { title: "My Requests", url: "/my-requests" },
      { title: "Create Request", url: `/create-request` },
    ],
  },
  {
    title: "Account",
    items: [
      { title: "My Profile", url: `${prefix}/profile` },
    ],
  },
];