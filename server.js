const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Definir los datos de ejemplo
const products = [
  {
    id: 1,
    name: 'Producto 1',
    description: 'Descripción del producto 1',
    price: 10.0,
    stock: 5
  },
  {
    id: 2,
    name: 'Producto 2',
    description: 'Descripción del producto 2',
    price: 15.0,
    stock: 3
  },
  {
    id: 3,
    name: 'Producto 3',
    description: 'Descripción del producto 3',
    price: 20.0,
    stock: 7
  }
];

// Definir el esquema de GraphQL
const schema = buildSchema(`
  type Product {
    id: Int
    name: String
    description: String
    price: Float
    stock: Int
  }

  type Query {
    getProduct(id: Int!): Product
    getProducts: [Product]
  }

  type Mutation {
    addProduct(name: String!, description: String!, price: Float!, stock: Int!): Product
    updateProduct(id: Int!, name: String, description: String, price: Float, stock: Int): Product
    deleteProduct(id: Int!): Boolean
  }
`);

// Definir los resolvers de GraphQL
const root = {
  getProduct: ({ id }) => {
    return products.find(product => product.id === id);
  },
  getProducts: () => {
    return products;
  },
  addProduct: ({ name, description, price, stock }) => {
    const newProduct = {
      id: products.length + 1,
      name,
      description,
      price,
      stock
    };
    products.push(newProduct);
    return newProduct;
  },
  updateProduct: ({ id, name, description, price, stock }) => {
    const index = products.findIndex(product => product.id === id);
    if (index === -1) {
      return null;
    }
    const updatedProduct = {
      id,
      name: name || products[index].name,
      description: description || products[index].description,
      price: price || products[index].price,
      stock: stock || products[index].stock
    };
    products[index] = updatedProduct;
    return updatedProduct;
  },
  deleteProduct: ({ id }) => {
    const index = products.findIndex(product => product.id === id);
    if (index === -1) {
      return false;
    }
    products.splice(index, 1);
    return true;
  }
};

// Crear el servidor GraphQL
const app = express();
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true
}));

// Iniciar el servidor
app.listen(4000, () => {
  console.log('Servidor GraphQL iniciado en http://localhost:4000/graphql');
});
