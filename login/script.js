const roles = {
    ADMIN: "admin",
    DEFAULT: "default"
}

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    sessionStorage.removeItem("user");
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const users = JSON.parse(sessionStorage.getItem("users"));
    let logged = false;
    users.forEach(user => {

        if (user.username == username.value
            && user.password == password.value) {
            const userLogged = {
                username: user.username,
                password: user.password,
                role: roles.DEFAULT
            }
            logged = true;
            sessionStorage.setItem("user", JSON.stringify(userLogged));
            alert("Login realizado com sucesso!");
            window.location.href = "../";
        }
    });
    if(!logged) alert("Login incorreto!");
});