insertHeader("../", "Portal do Administrador");
function generateCards() {
    const cardContainer = document.getElementById('cardContainer');
    const carts = [];

    
    if (JSON.parse(sessionStorage.getItem("carts")) != null) {
        carts.push(...JSON.parse(sessionStorage.getItem("carts")));
    }

    
    const uniqueUsers = new Set();

    carts.forEach((cart) => {
        if (cart.user && cart.user.username) {
            uniqueUsers.add(cart.user.username);
        }
    });

    let i = 1;
    uniqueUsers.forEach((username) => {
        
        const card = document.createElement('div');
        card.classList.add('card');
        const title = document.createElement('h3');
        title.textContent = `Pedido ${i}`; 
        card.appendChild(title);
        const description = document.createElement('p');
        description.textContent = `Cliente: ${username}.`; 
        card.appendChild(description);
        card.addEventListener('click', () => generateCart(username, carts));
        cardContainer.appendChild(card);
        i++;
    });

}
function generateCart(username, carts){
    const cartItens = document.getElementById("cartItens");
    const cartContainer = document.getElementById("cart");
    cartItens.textContent = "";
    let valorTotal = 0;
    let quantidadeTotal = 0;
    carts.forEach((cart) => {
      if (cart.user.username == username) {
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
generateCards();