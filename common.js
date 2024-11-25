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
function createLoginDialog(path) {
  // Cria o elemento <dialog>
  const dialog = document.createElement("dialog");
  dialog.id = "login";

  // Cria o conteúdo do formulário
  const form = document.createElement("form");

  const heading = document.createElement("h2");
  heading.textContent = "Login";
  form.appendChild(heading);

  const userLabel = document.createElement("label");
  userLabel.setAttribute("for", "username");
  userLabel.textContent = "Usuário:";
  form.appendChild(userLabel);

  const usernameInput = document.createElement("input");
  usernameInput.type = "text";
  usernameInput.name = "username";
  usernameInput.id = "username";
  form.appendChild(usernameInput);

  form.appendChild(document.createElement("br")); // Adiciona a quebra de linha

  const passwordLabel = document.createElement("label");
  passwordLabel.setAttribute("for", "password");
  passwordLabel.textContent = "Senha:";
  form.appendChild(passwordLabel);

  const passwordInput = document.createElement("input");
  passwordInput.type = "password";
  passwordInput.name = "password";
  passwordInput.id = "password";
  form.appendChild(passwordInput);

  form.appendChild(document.createElement("br")); // Adiciona a quebra de linha

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Entrar";
  form.appendChild(submitButton);

  const btnFechar = document.createElement("button");
  btnFechar.type = "button";
  btnFechar.id = "btnFechar";
  btnFechar.textContent = "Sair";
  form.appendChild(btnFechar);
  dialog.appendChild(form);

  // Adiciona o <dialog> ao body
  document.body.appendChild(dialog);

  // Função para abrir e fechar o diálogo
  btnFechar.addEventListener("click", () => {
    dialog.close();
    sessionStorage.removeItem("user");
    window.location.href = `${path}index.html`;
  });

  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    form.disabled = true;
    sessionStorage.removeItem("user");
    const formData = new FormData(form);
    const login = Object.fromEntries(formData.entries());
    const users = JSON.parse(sessionStorage.getItem("users"));
    let logged = false;
    console.log(users);
    console.log(login);
    users.forEach((user) => {
      if (user.username == login.username && user.password == login.password) {
        const userLogged = {
          username: user.username,
          password: user.password,
          role: user.role,
        };
        logged = true;
        sessionStorage.setItem("user", JSON.stringify(userLogged));
        const ok = document.createElement("p");
        ok.classList.add("ok");
        ok.innerText = "Login realizado com sucesso!";
        dialog.insertBefore(ok, dialog.firstChild);
        return (window.location.href = "./index.html");
      }
    });
    if (!logged) {
  const existingErrors = dialog.querySelectorAll(".erro");
  existingErrors.forEach(error => error.remove());
  const erro = document.createElement("p");
  erro.classList.add("erro");
  erro.innerText = "Login ou senha inválida";
  dialog.insertBefore(erro, dialog.firstChild);
    }
  });
  return dialog;
}

function insertHeader(path, title) {
  const header = document.querySelector("header");

  // Logo
  const logo = document.createElement("div");
  logo.classList.add("logo");
  const img = document.createElement("img");
  img.src = `${path}imagens/logo.png`;
  img.alt = "Logo";
  logo.appendChild(img);
  header.appendChild(logo);

  const container = document.createElement("div");
  container.classList.add("container-infos");

  // Título
  const titleElement = document.createElement("h1");
  titleElement.textContent = title;
  container.appendChild(titleElement);
  // Navegação
  const nav = document.createElement("nav");
  nav.classList.add("nav-header");

  const homeLink = document.createElement("a");
  homeLink.href = `${path}index.html`;
  homeLink.innerText = "Home";
  nav.appendChild(homeLink);

  const menuLink = document.createElement("a");
  menuLink.href = `${path}cardapio/index.html`;
  menuLink.innerText = "Cardápio";
  nav.appendChild(menuLink);

  const loginLink = document.createElement("a");
  loginLink.href = `#`;
  loginLink.innerText = !user ? "Login" : "Logout";
  loginLink.id = "btnLogin";
  nav.appendChild(loginLink);

  const dialog = createLoginDialog(path);
  loginLink.onclick = function () {
    if (!user) {
      dialog.showModal();
      let msgErro = document.querySelector(".erro");
      let msgOk = document.querySelector(".ok");
      if (msgErro) {
        dialog.removeChild(msgErro);
      }
      if (msgOk) {
        dialog.removeChild(msgOk);
      }
    } else {
      sessionStorage.removeItem("user");
      window.location.href = `${path}index.html`;
    }
  };
  if(title != "Portal do Administrador"){
    const aboutLink = document.createElement("a");
    aboutLink.href = "#about";
    aboutLink.innerText = "Sobre Nós";
    nav.appendChild(aboutLink);
  
    const contactLink = document.createElement("a");
    contactLink.href = "#contact";
    contactLink.innerText = "Contato";
    nav.appendChild(contactLink);
  }
  
  container.appendChild(nav);
  header.appendChild(container);

  if(user && user.role === roles.ADMIN){
    const adminLink = document.createElement("a");
    adminLink.href = `${path}admin/index.html`;
    adminLink.innerText = "Admin";
    nav.appendChild(adminLink);
  }

}

function createFooterContent() {
  const footer = document.querySelector("footer");

  function createSection(title, content, id) {
    const section = document.createElement("section");
    section.id = id;
    const heading = document.createElement("h2");
    heading.textContent = title;

    const paragraph = document.createElement("p");
    if (typeof content === "string") {
      paragraph.textContent = content;
    } else {
      paragraph.appendChild(content);
    }

    section.appendChild(heading);
    section.appendChild(paragraph);
    return section;
  }

  const aboutUsSection = createSection(
    "Sobre Nós",
    "Nosso compromisso? Sabor, qualidade e aquele atendimento que faz você voltar sempre.",
    "about"
  );

  const contactSection = document.createElement("section");
  contactSection.id = "contact";
  const contactHeading = document.createElement("h2");
  contactHeading.textContent = "Contato";
  contactSection.appendChild(contactHeading);

  const phoneParagraph = document.createElement("p");
  phoneParagraph.innerHTML = `Telefone: <a href="TEL:(41) 9 9999-9999" class="phone-link">(41) 9 9999-9999</a>`;
  contactSection.appendChild(phoneParagraph);

  const addressParagraph = document.createElement("p");
  addressParagraph.innerHTML = `Endereço: <a href="https://www.google.com/search?q=universidade+positivo">R. Prof. Pedro Viriato Parigot de Souza, 5300 - Cidade Industrial, Curitiba - PR</a>`;
  contactSection.appendChild(addressParagraph);

  const hoursParagraph = document.createElement("p");
  hoursParagraph.textContent = "Horário: Seg-Sex, 10h - 22h";
  contactSection.appendChild(hoursParagraph);

  const socialParagraph = document.createElement("p");
  const strongText = document.createElement("strong");
  strongText.textContent = "Siga-nos nas redes sociais!";
  socialParagraph.appendChild(strongText);

  footer.appendChild(aboutUsSection);
  footer.appendChild(contactSection);
  footer.appendChild(socialParagraph);
}
