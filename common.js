function insertHeader(path, title) {
  const header = document.querySelector("header");

  const imagem = document.createElement("div");
  imagem.classList.add("imagem");
  const img = document.createElement("img");
  img.src = `${path}imagens/NovoLogo.png`;
  img.alt = "Logo da Alegria no Ponto";
  imagem.appendChild(img);
  header.appendChild(imagem);

  const cima = document.createElement("div");
  cima.classList.add("cima");
  const p = document.createElement("p");
  p.textContent = title;
  cima.appendChild(p);


  const nav = document.createElement("nav");
  nav.classList.add("nav-cabecalho");
  nav.id = "menuCabecalho";
  const home = document.createElement("a");
  home.href = `${path}index.html`;
  home.innerText = "Home";
  nav.appendChild(home);
  const cardapio = document.createElement("a");
  cardapio.href = `${path}cardapio/index.html`;
  cardapio.innerText = "Cardápio";
  nav.appendChild(cardapio);
  const sobre = document.createElement("a");
  sobre.href = "#sobre";
  sobre.innerText = "Sobre Nós";
  nav.appendChild(sobre);
  const contato = document.createElement("a");
  contato.href = "#contato";
  contato.innerText = "Contato";
  nav.appendChild(contato);
  const btnLogin = document.createElement("a");
  btnLogin.href = `${path}login/index.html`;
  btnLogin.id = "btnLogin";
  btnLogin.innerText = "Login";
  nav.appendChild(btnLogin);
  cima.appendChild(nav);
  header.appendChild(cima);
}

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
