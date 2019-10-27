const Model = require('./Model');

class Client_users extends Model {
  static get tableName() {
    return 'client_users';
  }

  static get relationMappings() {
    return {
      company: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Company`,
        join: {
          from: 'client_users.company_id',
          to: 'companies.id',
        },
      },
    };
  }

  static async createUser(data, trx = null) {
    const { count } = await OauthUser.query(trx).where('email', data.email)
      .count()
      .first();
    if (+count) throw new Error('This phone or email is already in use.');
    const user = await OauthUser.query(trx)
      .insert(data);
    if (!user) throw new Error('User registration failed.');
    return user;
  }
}

module.exports = Client_users;
