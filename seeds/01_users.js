const user = require('../config/users.json')[process.env.ENVIRONMENT || 'development'];
const company = require('../config/companies.json')[process.env.ENVIRONMENT || 'development'];
const hashing = require('../api/common/hashing');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('companies').del()
    .then(() => {
      return knex('client_users').del();
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
        console.log(data);
        return knex('client_users').insert({
          createdAt: new Date(),
          email : user.email,
          name : user.name,
          password : hashing.encrypt(user.password),
          contact: user.contact,
          company_id: data[0].id
        });
      });
    });
};
