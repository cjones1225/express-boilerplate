// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'youdirtydog',
      user:     'dunder_mifflin',
      password: 'pw'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'youdirtydog',
      user:     'dunder_mifflin',
      password: 'pw'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
