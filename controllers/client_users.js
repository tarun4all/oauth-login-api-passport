const Joi = require('@hapi/joi');
const responseBuilder = require('../api/common/responseBuilder');
const users = require('../models/Client_users');
const hashing = require('../api/common/hashing');

module.exports = {
  getProfile : async (req, res, next) => {
    const {name, email, contact} = await users.query().findById(req.user.id);
    res.status(statusCodes.SUCCESS_WITH_DATA);
    res.send({name, email, phone: contact, companyName: req.user.company.companyName});
  },
  updateProfile : async (req, res, next) => {
    const schema = Joi.object().keys({
        email: Joi.string().email(),
        phone: Joi.string(),
        name: Joi.string()
      });

    const { error, value } = schema.validate(req.body);
    if (error) return next(responseBuilder(error.message, statusCodes.NOT_VALIDATE));
    else {
        await users.query().patch({...value});
        res.status(statusCodes.SUCCESS_WITHOUT_DATA); res.send();  
    }
  }
};
