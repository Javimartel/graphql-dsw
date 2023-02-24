const { request } = require('graphql-request');

const url = 'http://localhost:4000/graphql';

const query = `
  query {
    getProducts {
      id
      name
      price
    }
  }
`;

request(url, query).then(data => {
  console.log(data);
});
