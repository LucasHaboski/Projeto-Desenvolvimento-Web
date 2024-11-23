insertHeader("./", "Bem-vindo á Alegria no Ponto!");

const user = JSON.parse(sessionStorage.getItem("user"));

console.log("User logged: ");
console.log(user);

function addAdminMenu() {
  const menuCabecalho = document.getElementById("menuCabecalho");
  const adminMenuItem = document.createElement("a");
  adminMenuItem.href = "./admin/index.html"; 
  adminMenuItem.textContent = "Admin";
  menuCabecalho.appendChild(adminMenuItem);
}

if(user !== null && user.role == roles.ADMIN){
  console.log("createAdminMenu");
 addAdminMenu();
}
