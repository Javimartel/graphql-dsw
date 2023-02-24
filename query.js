const { request } = require('graphql-request');

const url = 'http://localhost:4000/graphql';

const query = `
  query {
    getProduct(id: 2) {
      name
    }
  }
`;

request(url, query).then(data => {
  console.log(data);
});
