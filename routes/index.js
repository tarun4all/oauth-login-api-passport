const express = require('express');
const router = express.Router();

const loginController = require('../controllers/login');
const locationController = require('../controllers/location');
const shipmentController = require('../controllers/shipment');
const userController = require('../controllers/client_users');
const OAuth = require('../middleware/auth');
const firstTimeValidation = require('../middleware/firstTime');

  router.group('/v1/:aaa', (app) => {
    app.get('/test', (req, res) => {
      console.log(req.baseUrl);
      res.send('oh');
    });
  });
  router.get('/login', [OAuth.loginValidate]);
  router.post('/forgetPassword', OAuth.resetPassword);
  router.post('/refreshToken', [OAuth.validateUser]);
  router.post('/account/request-account', loginController.request_account);
  router.get('/users/me', [OAuth.validateUser], userController.getProfile);
  router.put('/users/me', [OAuth.validateUser], userController.updateProfile);
  router.get('/locations', [OAuth.validateUser], locationController.getAll);
  router.get('/shipmentSlots', [OAuth.validateUser], shipmentController.getAllFreeSlots);
  router.post('/changePassword', [OAuth.validateUser], loginController.resetPassword);

module.exports = router;
