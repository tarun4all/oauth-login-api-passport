const passport = require('passport');

module.exports = {
    loginValidate: function(req, res, next) {
        passport.authenticate('local', function(err, user, info) {
          if (err) return next(err);
          else if(info && info.message) return next(info.message);
          else if(user) {
            req.user = user;
            return next();
          }
        })(req, res, next);
    },
    validateUser:  function(req, res, next) {
        passport.authenticate('bearer', { session: false }, function(err, user, info) {
            console.log(err, user, info)
          if (err) return next(err);
          else if(info) return next(info.message ? info.message : info);
          else if(user)  {
            req.user = user;
            return next();
          }
        })(req, res, next);
    }
};