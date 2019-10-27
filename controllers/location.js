const Location = require('../models/Location');

module.exports = {
  getAll: async (req, res, next) => {
    const locations = await Location.query();
    res.status(statusCodes.SUCCESS_WITH_DATA); res.send(locations.map(el => {return {id: el.id, name: el.name, address: (el.address1 ? el.address1 : '') + (el.address2 ? el.address2 : '') }}));
  }
};
