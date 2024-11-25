insertHeader("../", "Explore Sabores Únicos no Nosso Cardápio!");
createFooterContent();

const currentUser = JSON.parse(sessionStorage.getItem("user"));

if (!currentUser) {
  const loginLink = document.getElementById("btnLogin");
  loginLink.click();
}

if (currentUser && currentUser.role === roles.ADMIN) {
  const dialog = document.getElementById("adminCardapioDialog");
  const dialogMsg = document.getElementById("dialogMsg");
  const fecharDialogButton = document.getElementById("fecharDialog");

  dialogMsg.textContent = "Apenas um usuário padrão pode usar essa área!";

  dialog.showModal();

  fecharDialogButton.addEventListener("click", () => {
    dialog.close();
    window.location.href = "../index.html";
  });
}

const cartItems = JSON.parse(sessionStorage.getItem("carts")) || [];

function renderCart() {
  const userCart = cartItems.filter(
    (item) => item.user.username === currentUser.username
  );

  if (userCart.length > 0) {
    document.getElementById("cart-button").style.display = "none";
    const cartContainer = document.getElementById("cart");
    const cartContent = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartContent.textContent = "";
    cartTotal.textContent = "";

    let totalValue = 0;
    let totalQuantity = 0;

    userCart.forEach((item) => {
      const itemContainer = document.createElement("div");
      itemContainer.innerHTML = `
        <p>Item: ${item.item}</p>
        <p>Preço: R$${item.valor.toFixed(2).replace(".", ",")}</p>
        ${item.tamanho ? `<p>Tamanho: ${item.tamanho}</p>` : ""}
        <p>Quantidade: ${item.quantidade}</p>
        <hr>
      `;

      totalValue += item.valor;
      totalQuantity += item.quantidade;

      cartContent.appendChild(itemContainer);
    });

    cartTotal.innerHTML = `
      <p>Total: R$${totalValue.toFixed(2).replace(".", ",")}</p>
      <p>Quantidade: ${totalQuantity}</p>
    `;

    cartContainer.style.display = "flex";
    cartContent.scrollTop = cartContent.scrollHeight;

    const closeCart = document.getElementById("close-cart");
    closeCart.addEventListener("click", () => {
      cartContainer.style.display = "none";
      document.getElementById("cart-button").style.display = "flex";
    });
  }
}

const menuItems = [
  {
    categoria: "Bebidas",
    itens: [
      {
        nome: "Suco",
        preco: 8,
        detalhes: [
          {
            label: "Escolha o item:",
            name: "item",
            options: [
              "Suco de Laranja",
              "Suco de Maçã",
              "Suco de Uva",
              "Suco de Abacaxi",
              "Suco de Morango",
              "Suco de Maracujá",
              "Suco de Limão",
              "Suco de Pêssego",
            ],
          },
          {
            label: "Escolha o tamanho:",
            name: "tamanho",
            options: ["Pequeno", "Médio", "Grande"],
          },
        ],
      },
      {
        nome: "Refrigerante",
        preco: 5,
        detalhes: [
          {
            label: "Escolha o item:",
            name: "item",
            options: [
              "Coca-Cola",
              "Pepsi",
              "Guaraná Antarctica",
              "Sprite",
              "Fanta Laranja",
            ],
          },
          {
            label: "Escolha o tamanho:",
            name: "tamanho",
            options: ["Pequeno", "Médio", "Grande"],
          },
        ],
      },
      {
        nome: "Água",
        preco: 5,
        detalhes: [
          {
            label: "Escolha o item:",
            name: "item",
            options: ["Água com gás", "Água sem gás"],
          },
          {
            label: "Escolha o tamanho:",
            name: "tamanho",
            options: ["Pequeno", "Médio", "Grande"],
          },
        ],
      },
    ],
  },
  {
    categoria: "Lanches",
    itens: [
      {
        nome: "X-Bacon",
        preco: 45,
        descricao:
          "Pão, carne, queijo, salada, cebola, bacon e cebola caramelizada.",
      },
      {
        nome: "Hot Dog",
        preco: 28,
        descricao: "Salsicha, pão, batata e molhos.",
      },
      {
        nome: "X-egg",
        preco: 25,
        descricao: "Pão, carne, queijo, alface, tomate, ovo e molho especial.",
      },
      {
        nome: "X-Salada",
        preco: 35,
        descricao:
          "Pão, carne, queijo, alface, tomate, cebola e molho especial.",
      },
      {
        nome: "X-chicken",
        preco: 30,
        descricao: "Pão, frango, maionese, queijo, alface e cebola.",
      },
    ],
  },
  {
    categoria: "Kids",
    itens: [
      {
        nome: "Combo Kids",
        preco: 40,
        descricao: "Hamburguer, hot-dog, batatas smile, milk shake e suco.",
      },
    ],
  },
  {
    categoria: "Sobremesas",
    itens: [
      { nome: "Pudim", preco: 15, descricao: "Pudim tradicional de leite." },
      {
        nome: "Sorvete",
        preco: 10,
        detalhes: [
          {
            label: "Escolha o sabor:",
            name: "item",
            options: ["Chocolate", "Morango", "Baunilha", "Flocos"],
          },
        ],
      },
    ],
  },
];

function renderMenu() {
  const menuContainer = document.querySelector("#menu-container");

  menuItems.forEach((category) => {
    const categoryTitle = document.createElement("h2");
    categoryTitle.textContent = category.categoria;
    menuContainer.appendChild(categoryTitle);

    menuContainer.appendChild(document.createElement("hr"));

    category.itens.forEach((item) => {
      const form = document.createElement("form");
      form.className = "item";
      form.innerHTML = `
        <h3>${item.nome}</h3>
        ${item.descricao ? `<p>${item.descricao}</p>` : ""}
        <p>R$ ${item.preco.toFixed(2)}</p>
        <input type="hidden" name="valor" value="${item.preco}">
        ${
          item.detalhes
            ? item.detalhes
                .map(
                  (detail) => `
          <label>${detail.label}</label>
          <select name="${detail.name}">
            ${detail.options
              .map((option) => `<option value="${option}">${option}</option>`)
              .join("")}
          </select>`
                )
                .join("")
            : `<input type="hidden" name="item" value="${item.nome}">`
        }
        <label>Quantidade:</label>
        <input type="number" name="quantidade" min="1" value="1">
        <button type="submit" class="add-cart">Adicionar ao Carrinho</button>
      `;
      menuContainer.appendChild(form);
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderMenu();
  document.getElementById("cart-button").addEventListener("click", () => {
    renderCart();
  });

  const formCart = document.getElementById("form-cart");
  formCart.addEventListener("submit", (event) => {
    event.preventDefault();
    const userCart = cartItems.filter(
      (item) => item.user.username === currentUser.username
    );

    // Pega as ordens como objeto aqui
    const orders = JSON.parse(sessionStorage.getItem("orders")) || [];
    const formData = new FormData(formCart);
    const order = Object.fromEntries(formData.entries());
    const finalOrder = {
      cart: userCart,
      obs: order.obs,
    };
    orders.push(finalOrder);
    sessionStorage.setItem("orders", JSON.stringify(orders));
    formCart.reset();
  });

  formCart.addEventListener("reset", () => {
    sessionStorage.setItem("carts", JSON.stringify(cartItems.filter((item) => item.user.username !== currentUser.username)));
    window.location.reload();
  });

  document.querySelectorAll(".item").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const order = Object.fromEntries(formData.entries());
      order.valor = parseFloat(order.valor) * parseInt(order.quantidade);
      order.quantidade = parseInt(order.quantidade);

      cartItems.push({ user: currentUser, ...order });
      sessionStorage.setItem("carts", JSON.stringify(cartItems));
      renderCart();
    });
  });
});
