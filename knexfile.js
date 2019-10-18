// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'velosticsclient',
      user: 'developer',
      password: 'developer'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/knex/migrations'
    }
  },

  staging: {
  },

  production: {
  }

};
