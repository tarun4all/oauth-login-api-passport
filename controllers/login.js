// const Joi = require('@hapi/joi');
const createError = require('http-errors');
const responseBuilder = require('../api/common/responseBuilder');

module.exports = {
  loginUser: (req, res, next) => {
      res.send(responseBuilder('', {token: req.user.token}));
  }
};
