const url = 'http://localhost:4000/graphql';

// Obtener Productos
const btnGetProducts = document.querySelector('#btn-get-products');
const productsDiv = document.querySelector('#products');

// btnGetProducts.addEventListener('click', showProducts);


function showProducts() {
    const query = `
  query {
    getProducts {
      id
      description
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
        <div class="card" style="width: 15rem; height: 12rem; margin: 1rem;">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>

                <a href="#" class="card-link" style="text-decoration: none; color: black">${product.price} €</a>
                <div class="d-flex justify-content-center mt-2">
                    <button class="btn btn-danger button-delete" onclick="eliminarProducto(this.value)" value="${product.id}"><i class="fa-sharp fa-solid fa-trash"></i></button>
                    <button class="btn btn-primary" value="${product.id}" data-bs-toggle="modal" data-bs-target="#update"><i class="fa-solid fa-pen"></i></button>
                </div>
            </div>
        </div>
      `;
            });
            productsDiv.innerHTML = html;
        })
        .catch(error => console.log(error));
};


// Añadir Producto
document.querySelector("#addProduct").addEventListener("click", function (event) {

    let name = document.querySelector("#name").value;
    let description = document.querySelector("#description").value;
    let price = parseFloat(document.querySelector("#price").value);
    let stock = parseInt(document.querySelector("#stock").value);
    let updateForm = document.querySelector("#updateForm");

    updateForm.reset();



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

// Update Product
function updateProduct(id) {

    axios.post("http://localhost:4000/graphql", {
        query: `mutation {
            updateProduct(id: ${id})
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




/* Show Products */
showProducts();