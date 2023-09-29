'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserWebsite extends Model {
    static associate(models) {
      UserWebsite.belongsTo(models.User, { foreignKey: 'UserId' }); // Added association
      UserWebsite.hasMany(models.WebsiteLink, { foreignKey: 'UserWebsiteId' }); // Added association
    }
  }
  UserWebsite.init({
    url: DataTypes.STRING,
    UserId: DataTypes.INTEGER // Added UserId attribute
  }, {
    sequelize,
    modelName: 'UserWebsite',
  });
  return UserWebsite;
};