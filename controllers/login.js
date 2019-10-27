const createError = require('http-errors');
const responseBuilder = require('../api/common/responseBuilder');
const users = require('../models/Client_users');
const hashing = require('../api/common/hashing');
const Joi = require('@hapi/joi');

module.exports = {
  resetPassword : async (req, res, next) => {
    if(req.body.password) {
      const numUpdated = await users.query()
      .findById(req.user.id)
      .patch({
        password: hashing.encrypt(req.body.password)
      });
      if(numUpdated) {res.status(statusCodes.SUCCESS_WITHOUT_DATA); res.send();} else next(responseBuilder("Please try again later", statusCodes.FAILED_AUTH));
    } else {
      next(responseBuilder("Please enter email", statusCodes.FAILED_AUTH));
    }
  },
  request_account : async (req, res, next) => {
    const schema = Joi.object().keys({
      email: Joi.string().required(),
      phone: Joi.string().required(),
      companyName: Joi.string().required(),
      contactName: Joi.string().required(),
      location: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);
    if (error) return next(responseBuilder(error.message, statusCodes.NOT_VALIDATE));
    else res.status(statusCodes.SUCCESS_WITHOUT_DATA); res.send();
  }
};
