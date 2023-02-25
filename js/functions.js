const url = 'http://localhost:4000/graphql';

// Obtener Productos
const btnGetProducts = document.querySelector('#btn-get-products');
const productsDiv = document.querySelector('#products');

btnGetProducts.addEventListener('click', showProducts);

function showProducts() {
    const query = `
  query {
    getProducts {
      id
      name
      price
    }
  }
`;

    axios.post(url, { query })
        .then(response => {
            const products = response.data.data.getProducts;
            if (products.length === 0) {
                productsDiv.innerHTML = 'No hay productos';
                return;
            }
            let html = '';
            products.forEach(product => {
                html += `
        <div>
          <strong>${product.name}</strong>
          <span>${product.price} €</span>
          <button onclick="eliminarProducto(this.value)" value="${product.id}">Eliminar</button>
        </div>
      `;
            });
            productsDiv.innerHTML = html;
        })
        .catch(error => console.log(error));
};

// Añadir Producto
document.querySelector("#addProduct").addEventListener("click", function (event) {
    event.preventDefault();

    let name = document.querySelector("#name").value;
    let description = document.querySelector("#description").value;
    let price = parseFloat(document.querySelector("#price").value);
    let stock = parseInt(document.querySelector("#stock").value);

    axios.post("http://localhost:4000/graphql", {
        query: `mutation {
            addProduct(name: "${name}", description: "${description}", price: ${price}, stock: ${stock}) {
              id
              name
              description
              price
              stock
            }
          }`
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            showProducts();
        })
        .catch(error => {
            console.error(error);
        });

});

// Eliminar Producto
function eliminarProducto(id) {

    axios.post("http://localhost:4000/graphql", {
        query: `mutation {
            deleteProduct(id: ${id}) 
          }`
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            showProducts();
        })
        .catch(error => {
            console.error(error);
        });
};