const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser')

require('./expressGroup');
const indexRouter = require('./routes/index');

const app = express();
const errorResponseBuilder = require('./api/common/responseBuilder');
const statusCodes = require('./api/common/statusCode');
const globalConfig = require('./api/common/global');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

//intialise global variables
globalConfig.globalButNotConfig('statusCodes', statusCodes);
globalConfig.globalButNotConfig('responseBuilder', errorResponseBuilder);

//initialise passport auth
require('./auth/clientAuth');

//intialise env file
require('dotenv').config();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);

//cors options
app.use(cors({
  origin: function(origin, callback) {
    const msg = 'The CORS policy for this site does not ' +
              'allow access from the specified Origin.';
    if(!origin) return callback(msg, false);
    if(process.env.VALID_DOMAIN !== origin) return callback(msg, false);
    return callback(null, true);
  }
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404);
  res.send({ error: 'URL Not found' });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500)
  res.send({error: err.message || ''});
});

module.exports = app;
