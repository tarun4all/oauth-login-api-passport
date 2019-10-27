const Model = require('./Model');

class Location extends Model {
  static get tableName() {
    return 'locations';
  }

  static get relationMappings() {
    return {
      company: {
        relation: Model.BelongsToOneRelation,
        modelClass: `${__dirname}/Company`,
        join: {
          from: 'companies.id',
          to: 'locations.company_id',
        },
      }
    };
  }
}

module.exports = Location;
