'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserWebsite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserWebsite.belongsTo(models.User, { foreignKey: 'UserId' }); // Added association
      UserWebsite.hasMany(models.WebsiteLink, { foreignKey: 'UserWebsiteId' }); // Added association
    }
  }
  UserWebsite.init({
    url: DataTypes.STRING,
    name: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserWebsite',
  });
  return UserWebsite;
};