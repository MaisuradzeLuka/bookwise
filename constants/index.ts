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
    route: "/admin/borrowrequests",
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
