const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: {
    id: 'sample:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyRhYzM5Yzg2N2QzZGU0MmVjYjFkNDIyZjkzYzVmNDEwMiQ5YWEwMjc4NGQ5MDU0YzZhYjk2MDNkZGY4Y2Y1Yzk4Yg=='},
  auth: {
    username: 'elastic',
    password: 'fnwZrhu7kKA75uoAKlKEZrI4'
  }
})


client.info()
  .then(response => console.log(response))
  .catch(error => console.error(error))


  const createIndex = async (indexName) => {
    await client.indices.create({ index: indexName });
    console.log("Index created");
  };
  
  createIndex("posts");
