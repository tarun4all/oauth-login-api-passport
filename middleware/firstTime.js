const responseBuilder = require('../api/common/responseBuilder');

module.exports = (req, res, next) => {
    if(req.user.first) res.send(responseBuilder('', {first: true}))
    else next();
};