// const Joi = require('@hapi/joi');
const createError = require('http-errors');

module.exports = {
  getAllFreeSlots: (req, res, next) => {
      res.send({slots: {sep: {'1/9/2019' : ['10am-12pm']}, oct: {'1/10/2019' : ['10am-12pm']}}});
  }
};
