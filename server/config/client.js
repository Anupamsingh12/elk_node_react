const { Client } = require('@elastic/elasticsearch');

const client = new Client({
    cloud: {
      id: 'sample:dXMtY2VudHJhbDEuZ2NwLmNsb3VkLmVzLmlvOjQ0MyRhYzM5Yzg2N2QzZGU0MmVjYjFkNDIyZjkzYzVmNDEwMiQ5YWEwMjc4NGQ5MDU0YzZhYjk2MDNkZGY4Y2Y1Yzk4Yg=='},
    auth: {
      username: 'elastic',
      password: 'fnwZrhu7kKA75uoAKlKEZrI4'
    }
  });

  module.exports=client