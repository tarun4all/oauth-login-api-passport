// const Joi = require('@hapi/joi');
const createError = require('http-errors');

module.exports = {
  getAll: (req, res, next) => {
      res.send({locations: ['Delhi', 'Mumbai']});
  }
};
