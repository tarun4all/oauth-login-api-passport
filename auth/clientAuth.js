const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const knex = require('../knex/knex');
const hashing = require('../api/common/hashing');
const users = require('../models/Client_users');
const generateToken = require('../api/common/generateToken');

const errorMessage = {
    loginError: 'Unable to authenticate with the provided email and password.',
    tokenAuthError: 'Unable to authenticate with the provided token.'
};

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (username, password, done) => {
    const q = users.query();
        q.where('email', '=', username);
        q.eager('company(onlyName)')
        .then((data) => {
            if(data && Array.isArray(data) && data.length > 0) {
                let user = data[0];
                if(hashing.decrypt(user.password) === password) return done(null, ({...generateToken(user)}));
                else return done(responseBuilder(errorMessage.loginError, statusCodes.FAILED_AUTH));
            } else {
                return done(responseBuilder(errorMessage.loginError, statusCodes.FAILED_AUTH));
            }
        })
        .catch(err => {return done(responseBuilder((process.env.ENVIRONMENT == 'development' ? err : 'Unable to fetch your info'), statusCodes.FAILED_AUTH))});
    }
));

passport.use(new BearerStrategy((token, done) => {
    try {
        const { id, expire, type } = JSON.parse(hashing.decrypt(token));
        if(new Date(expire) > (new Date().getTime()/1000)) {
            const q = users.query();
                    q.where('id', '=', id);
                    q.eager('company(onlyName)')
                    .then((data) => {
                        if(data && Array.isArray(data) && data.length > 0) {
                            let user = data[0];
                            if(type === 'refresh_token') return done(null, {new_token: generateToken(user)});
                            return done(null, {...user});
                        } else {
                            return done(responseBuilder(errorMessage.tokenAuthError, statusCodes.FAILED_AUTH));
                        }
                    })
                    .catch(err => {return done(responseBuilder((process.env.ENVIRONMENT == 'development' ? err : 'Unable to fetch your info'), statusCodes.FAILED_AUTH))});
        } else {
            done(responseBuilder(type && type === 'refresh_token' ? 'Unable to renew authentication' : errorMessage.tokenAuthError, statusCodes.FAILED_AUTH));
        }
        
    } catch (error) {
        done(responseBuilder(errorMessage.tokenAuthError, statusCodes.FAILED_AUTH));
    }
}));