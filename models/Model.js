const { Model } = require('objection');
const knex = require('../knex/knex');

Model.knex(knex);

module.exports = Model;