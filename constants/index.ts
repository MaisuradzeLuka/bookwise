export const formFields = {
  fullname: "Full name",
  email: "Email",
  universityId: "University ID Number",
  password: "Password",
  universityCard: "Upload University ID Card (file upload)",
};

export const formFieldTypes = {
  fullname: "text",
  email: "email",
  universityId: "text",
  password: "Password",
  universityCard: "file",
};

export const adminSidebarLinks = [
  {
    route: "/admin",
    id: "home",
    image: "/icons/admin/home.svg",
    label: "Home",
  },
  {
    route: "/admin/allusers",
    id: "allUsers",
    image: "/icons/admin/users.svg",
    label: "All Users",
  },
  {
    route: "/admin/allbooks",
    id: "allBooks",
    image: "/icons/admin/book.svg",
    label: "All Books",
  },
  {
    route: "/admin/borrow-requests",
    id: "borrowRequests",
    image: "/icons/admin/bookmark.svg",
    label: "Borrow Requests",
  },
  {
    route: "/admin/accountrequests",
    id: "accountRequests",
    image: "/icons/admin/user.svg",
    label: "Account Requests",
  },
];

export const usersRoles = [
  { label: "Admin", color: "#027A48", id: "admin" },
  { label: "User", color: "#C11574", id: "user" },
];
