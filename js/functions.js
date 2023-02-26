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
      stock
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
        <div class="card" style="width: 15rem; min-height: 15rem; margin: 1rem;">
            <div class="card-body text-center">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text"><strong>Precio</strong>: ${product.price} €</p>
                <p class="card-text"><strong>Stock</strong>: ${product.stock}</p>

                <div class="d-flex justify-content-center mt-2">
                    <button class="btn btn-danger button-delete" onclick="eliminarProducto(this.value)" value="${product.id}"><i class="fa-sharp fa-solid fa-trash"></i></button>
                    <button class="btn btn-primary" value="${product.id}" data-bs-toggle="modal" data-bs-target="#update${product.id}"><i class="fa-solid fa-pen"></i></button>
                </div> 
            </div>
        </div>
        
      <!-- Modal Update -->
      <div class="modal fade" id="update${product.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">Actualizar Producto</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
  
                      <form id="updateForm">

                        <div class="mb-3">
                            <label for="name" class="form-label">Nombre</label>
                            <input type="text" class="form-control" name="update-name-${product.id}" value="${product.name}">
                        </div>

                        <div class="mb-3">
                            <label for="description" class="form-label">Descripción</label>
                            <input type="text" class="form-control" name="update-description-${product.id}" value="${product.description}">
                        </div>

                        <div class="mb-3">
                            <label for="price" class="form-label">Precio</label>
                            <input type="number" class="form-control" name="update-price-${product.id}" value="${product.price}">
                        </div>

                        <div class="mb-3">
                            <label for="stock" class="form-label">Stock</label>
                            <input type="number" class="form-control" name="update-stock-${product.id}" value="${product.stock}">
                        </div>
  
                      </form>
  
                  </div>
                  <div class="modal-footer d-flex justify-content-center">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button type="button" class="btn btn-primary" id="addProduct" data-bs-dismiss="modal" onclick="actualizarProducto(this.value)" value="${product.id}">Actualizar</button>
                  </div>
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

// Actualizar Producto
function actualizarProducto(id) {

    let name = document.querySelector(`input[name="update-name-${id}"]`).value;
    let description = document.querySelector(`input[name="update-description-${id}"]`).value;
    let price = parseFloat(document.querySelector(`input[name="update-price-${id}"]`).value);
    let stock = parseInt(document.querySelector(`input[name="update-stock-${id}"]`).value);

    axios.post("http://localhost:4000/graphql", {
        query: `mutation {
            updateProduct(id: ${id}, name: "${name}", description: "${description}", price: ${price}, stock: ${stock}) {
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
};




/* Show Products */
showProducts();