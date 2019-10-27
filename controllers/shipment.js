// const Joi = require('@hapi/joi');
const createError = require('http-errors');

module.exports = {
  getAllFreeSlots: (req, res, next) => {
      res.send({slots: {sep: {'1/9/2019' : ['10am-12pm', '2pm-4pm'], '2/9/2019' : ['10am-12pm', '2pm-4pm'], '3/9/2019' : ['12am-2pm', '2pm-4pm', '4pm-6pm']}, oct: {'1/10/2019' : ['10am-12pm', '2pm-4pm']}}});
  }
};
