const Model = require('./Model');

class Company extends Model {
  static get tableName() {
    return 'companies';
  }

  static get relationMappings() {
    return {
      client_users: {
        relation: Model.HasManyRelation,
        modelClass: `${__dirname}/Client_users`,
        join: {
          from: 'companies.id',
          to: 'client_users.company_id',
        },
      },
    };
  }

  static get modifiers() {
    return {
      onlyName(builder) {
        builder.select('companies.id as company', 'companies.domain as domain', 'companies.appKey as apiKey', 'companies.name as companyName');
      },
    };
  }
}

module.exports = Company;
