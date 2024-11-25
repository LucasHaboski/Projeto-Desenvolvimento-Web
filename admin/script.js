insertHeader("../", "Portal do Administrador"); 

const orders = JSON.parse(sessionStorage.getItem("orders")) || []

const ordersTable = document.getElementById("tabelaPedidos")

function preencherTabela(orders) {

    orders.forEach((order, i) => {
        order.cart.forEach((item, itemIndex) => {
            const linha = document.createElement("tr")

            linha.innerHTML = `
                <td>${i + 1}</td> 
                <td>${item.item || "Item Desconhecido"}</td> 
                <td>R$ ${item.valor?.toFixed(2) || "0.00"}</td> 
                <td>${item.tamanho || "Padrão"}</td>
                <td>${item.quantidade || 1}</td> 
                <td>${order.obs || "Sem observações"}</td> 
            `

            ordersTable.appendChild(linha)
        })
    })
}

preencherTabela(orders)