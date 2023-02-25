const { request } = require('graphql-request');

const url = 'http://localhost:4000/graphql';

const addProduct = (name, description, price, stock) => {
  const query = `
    mutation {
      addProduct(name: "${name}", description: "${description}", price: ${price}, stock: ${stock}) {
        id
        name
        description
        price
        stock
      }
    }  
  `;
  
  request(url, query).then(data => {
    console.log(data);
  });
}

// Llamada a la función addProduct con los parámetros correspondientes
addProduct('Test', 'Descripción test', 10, 100);
