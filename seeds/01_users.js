const user = require('../config/users.json')[process.env.ENVIRONMENT || 'development'];
const company = require('../config/companies.json')[process.env.ENVIRONMENT || 'development'];
const hashing = require('../api/common/hashing');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('client_users').del()
    .then(() => {
      return knex('companies').del();
    })
    .then(function () {
      // Inserts seed entries
      return knex('companies').insert({
          createdAt: new Date(),
          email : company.email,
          name : company.name,
          password : company.password,
          contact: company.contact,
          id: knex.raw('uuid_generate_v4()')
      }).returning('*').then((data) => {
        return knex('client_users').insert({
          createdAt: new Date(),
          email : user.email,
          name : user.name,
          password : hashing.encrypt(user.password),
          contact: user.contact,
          company_id: data[0].id
        }).then((res) => {
          console.log(data[0].id);
          let locations = [{name: 'Shute Creek', address: 'abc street'}, {name: 'Hawkins', address: 'xyz street'}]
            return knex('locations').insert({
              name : locations[0].name,
              address1: locations[0].address,
              company_id: data[0].id,
              id: knex.raw('uuid_generate_v4()')
            }).then(res => {
              return knex('locations').insert({
                name : locations[1].name,
                address1: locations[1].address,
                company_id: data[0].id,
                id: knex.raw('uuid_generate_v4()')
              });
            });
        });
      });
    });
};
