const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const responseBuilder = require('../api/common/responseBuilder');
const knex = require('../knex/knex');
const hashing = require('../api/common/hashing');

const generateToken = (user) => {
    let {id, company} = user;
        return hashing.encrypt(JSON.stringify({id, company, expire: (new Date((new Date).getTime() + 24*60*60*1000))}));
}

passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (username, password, done) => {
    knex.select(['client_users.id as id', 'client_users.password as password', 'client_users.first as first', 'companies.id as company', 'companies.domain as domain', 'companies.appKey as apiKey'])
        .from('client_users')
        .leftJoin('companies', 'client_users.company_id', 'companies.id')
        .where('client_users.email', '=', username)
        .then(function(user) {
            if(user && Array.isArray(user) && user.length > 0) {
                if(hashing.decrypt(user[0].password) === password) return done(null, ({...user[0], token: generateToken(user[0])}));
                else return done(responseBuilder('Invalid credentials'))
            } else {
                return done(responseBuilder('Invalid credentials'));
            }
        }).catch((err) => { return done(responseBuilder(err)); });
    }
));

passport.use(new BearerStrategy((token, done) => {
    try {
        const { id, expire } = JSON.parse(hashing.decrypt(token));
        console.log(id, expire);
        if(new Date(expire) > (new Date().getTime()/1000)) {
            knex.select(['client_users.id as id', 'client_users.first as first', 'companies.name as company', 'companies.domain as domain', 'companies.appKey as apiKey'])
            .from('client_users')
            .leftJoin('companies', 'client_users.company_id', 'companies.id')
            .where('client_users.id', '=', id)
            .then(function(user) {
                console.log(user);
                if(user && Array.isArray(user) && user.length > 0) {
                    return done(null, {...user[0]});
                } else {
                    return done(responseBuilder('Unauthorized access'));
                }
            }).catch((err) => { return done(responseBuilder('Some error occures')); });
        } else {
            return done(responseBuilder('Unauthorized access'));
        }
        
    } catch (error) {
        done(null, false);
    }
}));