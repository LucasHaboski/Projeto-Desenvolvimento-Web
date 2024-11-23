const btnLogin = document.getElementById('btnLogin')
const btnFechar = document.getElementById('btnFechar')
const dialog = document.getElementById('login')
const frmLogin = document.querySelector('#login form')
const roles = {
    ADMIN: "admin",
    DEFAULT: "default"
}

btnLogin.onclick = function(){
    dialog.showModal()
    let msgErro = document.querySelector('.erro')
    if(msgErro) {
        dialog.removeChild(msgErro)
    }
}

btnFechar.onclick = function(){
    dialog.close()
}

frmLogin.addEventListener("submit", (evt) => {
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
                role: user.role
            }
            logged = true;
            sessionStorage.setItem("user", JSON.stringify(userLogged));
            sessionStorage.setItem("logged", true);
            alert("Login realizado com sucesso!");
            return window.location.href = "./index.html";
        }
    });
    if (!logged) {
        alert("Login ruim pai")
        let erro = document.createElement('p')
        erro.classList.add('erro')
        erro.innerText = 'Login ou senha invalida'
        dialog.insertBefore(erro, dialog.firstChild)
        document.querySelector()
    }
});


