const prefix = "/staff-dashboard";

export const staffRoutes = [
  {
    title: "Workstation",
    items: [
      { title: "Overview", url: `${prefix}` },
      { title: "Assigned Requests", url: `${prefix}/assigned-requests` },
    ],
  },
  {
    title: "Account",
    items: [
      { title: "My Profile", url: `${prefix}/profile` },
    ],
  },
];