insertHeader("../", "Explore Sabores Únicos no Nosso Cardápio!");

const user = JSON.parse(sessionStorage.getItem("user"));

if (user == null) window.location.href = "../login/index.html";

if (user !== null) {
  if (user.role != roles.DEFAULT) {
    alert("Apenas um usuário padrão pode usar essa área!");
    window.location.href = "../index.html";
  } else {
    // addAdminMenu();
  }
}

const carts = [];

if (JSON.parse(sessionStorage.getItem("carts")) != null)
  carts.push(...JSON.parse(sessionStorage.getItem("carts")));

function buildCart() {
  //   console.log(carts);

  if (carts.findIndex((order) => order.user.username === user.username) > -1) {
    // console.log(user.username);

    const cartItens = document.getElementById("cartItens");
    const cartContainer = document.getElementById("cart");
    cartItens.textContent = "";
    let valorTotal = 0;
    let quantidadeTotal = 0;
    carts.forEach((cart) => {
      if (cart.user.username == user.username) {
        const cartDiv = document.createElement("div");
        const cartItem = document.createElement("p");
        cartItem.textContent = `Item: ${cart.item}`;
        cartDiv.appendChild(cartItem);
        const cartValor = document.createElement("p");
        cartValor.textContent = `Preço: R$${cart.valor},00`;
        valorTotal += cart.valor;
        cartDiv.appendChild(cartValor);
        const cartQuantidade = document.createElement("p");
        cartQuantidade.textContent = `Quantidade: ${cart.quantidade}`;
        quantidadeTotal += cart.quantidade;
        cartDiv.appendChild(cartQuantidade);
        const hr = document.createElement("hr");
        cartItens.appendChild(cartDiv);
        cartItens.appendChild(hr);
      }
    });
    const cartTotal = document.getElementById("cartTotal");
    cartTotal.textContent = "";
    const total = document.createElement("p");
    total.textContent = `Total: R$${valorTotal},00`;
    const quantidade = document.createElement("p");
    quantidade.textContent = `Quantidade: ${quantidadeTotal}`;

    cartTotal.appendChild(total);
    cartTotal.appendChild(quantidade);

    cartContainer.style.display = "flex";
    cartItens.scrollTop = cartItens.scrollHeight;
  }
}
document.querySelectorAll(".item").forEach((form) => {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(form);
    const order = Object.fromEntries(formData.entries());
    order.valor = parseFloat(order.valor) * parseInt(order.quantidade);
    order.quantidade = parseInt(order.quantidade);
    const cartItem = { user: user, ...order };
    carts.push(cartItem);
    sessionStorage.setItem("carts", JSON.stringify(carts));
    buildCart();
  });
});

buildCart();

const obs = document.getElementById("obs");

const observacoes = [];
if (JSON.parse(sessionStorage.getItem("observacoes")) != null) {
  observacoes.push(...JSON.parse(sessionStorage.getItem("observacoes")));

  const index = observacoes.findIndex(
    (ob) => ob.user.username === user.username
  );

  if (index > -1) obs.value = observacoes[index].obs;
}

obs.addEventListener("keydown", (evt) => {
  if (observacoes.length > 0) {
    const index = observacoes.findIndex(
      (ob) => ob.user.username === user.username
    );
    if (index > -1) {
      observacoes[index].obs = obs.value;
      sessionStorage.removeItem("observacoes");
      sessionStorage.setItem("observacoes", JSON.stringify(observacoes));
    } else {
      const newObs = {
        user: user,
        obs: obs.value,
      };

      observacoes.push(newObs);
      sessionStorage.removeItem("observacoes");
      sessionStorage.setItem("observacoes", JSON.stringify(observacoes));
    }
  } else {
    const newObs = {
      user: user,
      obs: obs.value,
    };

    observacoes.push(newObs);
    sessionStorage.removeItem("observacoes");
    sessionStorage.setItem("observacoes", JSON.stringify(observacoes));
  }
});

function addAdminMenu() {
  const menuCabecalho = document.getElementById("menuCabecalho");
  const adminMenuItem = document.createElement("a");
  adminMenuItem.href = "./admin/index.html";
  adminMenuItem.textContent = "Admin";
  menuCabecalho.appendChild(adminMenuItem);
}
