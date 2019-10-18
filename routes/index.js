const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login');
const locationController = require('../controllers/location');
const OAuth = require('../middleware/auth');
const firstTimeValidation = require('../middleware/firstTime');

  router.get('/login', [OAuth.loginValidate, firstTimeValidation], loginController.loginUser);
  router.get('/location', [OAuth.validateUser, firstTimeValidation], locationController.getAll);

module.exports = router;
