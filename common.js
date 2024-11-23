function insertHeader() {
    const header = document.querySelector("header");
    
    const imagem = document.createElement("div");
    imagem.classList.add("imagem");
    const img = document.createElement("img");
    img.src = "/imagens/NovoLogo.png";
    img.alt = "Logo da Alegria no Ponto";
    imagem.appendChild(img);
    header.appendChild(imagem);
    
    const cima = document.createElement("div");
    cima.classList.add("cima");
    const p = document.createElement("p");
    p.innerText = "Bem-vindo á Alegria no Ponto!";
    cima.appendChild(p);
    header.appendChild(cima);
    
    const nav = document.createElement("nav");
    nav.classList.add("nav-cabecalho");
    nav.id = "menuCabecalho";
    const home = document.createElement("a");
    home.href = "/index.html";
    home.innerText = "Home";
    nav.appendChild(home);
    const cardapio = document.createElement("a");
    cardapio.href = "/cardapio/index.html";
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
    btnLogin.href = "/login/index.html";
    btnLogin.id = "btnLogin";
    btnLogin.innerText = "Login";
    nav.appendChild(btnLogin);
    header.appendChild(nav);
  }
  