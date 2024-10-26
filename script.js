const roles = {
  ADMIN: "admin",
  DEFAULT: "default",
};

const usersData = [
  { username: "admin", password: "pass", role: roles.ADMIN },
  { username: "user 1", password: "pass", role: roles.DEFAULT },
  { username: "user 2", password: "pass", role: roles.DEFAULT },
];

sessionStorage.setItem("users", JSON.stringify(usersData));

const user = JSON.parse(sessionStorage.getItem("user"));

console.log("User logged: ");
console.log(user);
