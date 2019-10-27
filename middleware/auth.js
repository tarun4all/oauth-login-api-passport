const passport = require('passport');
const users = require('../models/Client_users');
const generateToken = require('../api/common/generateToken');

module.exports = {
    loginValidate: function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
          if (err) return next(err);
          else if(info && info.message) return next(responseBuilder(info.message, statusCodes.FAILED_AUTH));
          else if(user) {
            res.status(statusCodes.SUCCESS_WITH_DATA);
            res.send(user);
          }
        })(req, res, next);
    },
    validateUser:  function(req, res, next) {
        passport.authenticate('bearer', { session: false }, function(err, user, info) {
          console.log(user);
          if (err) return next(err);
          else if(info) return next(info.message ? info.message : info);
          else if(user)  {
            if(user.new_token) {
              res.status(statusCodes.SUCCESS_WITH_DATA);
              res.send(user.new_token);
            } else {
              req.user = user;
              return next();
            }
          }
        })(req, res, next);
    },
    resetPassword : function(req, res, next) {
      if(req.body.email) {
          const q = users.query();
          q.where('email', '=', req.body.email);
          q.eager('company(onlyName)')
          .then((data) => {
              if(data && Array.isArray(data) && data.length > 0) {
                  let user = data[0];
                  console.log(generateToken(user).access_token);
                  res.status(statusCodes.SUCCESS_WITHOUT_DATA);
                  res.send();
              } else {
                  next(responseBuilder("Provided email doesn't seems to be an account", statusCodes.FAILED_AUTH));
              }
          })
          .catch(err => {next(responseBuilder((process.env.ENVIRONMENT == 'development' ? err : 'Unable to fetch your info'), statusCodes.FAILED_AUTH))});
      } else {
        next(responseBuilder("Please enter email", statusCodes.FAILED_AUTH));
      }
    }
};